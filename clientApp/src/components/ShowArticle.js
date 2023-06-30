import React,{useState,useEffect} from "react";
import {  getImage2 } from "../services/ArticleService";
import * as ReactDOMClient from 'react-dom/client';
import { GetAllCommentsForArticle } from "../services/CommentService";
import MainPage from '../components/MainPage'
import Star from "../img/star";
import { GetRate } from "../services/CommentService";

export default function ShowArticle(props){

    const [naziv,setNaziv]=useState(props.article.name);
    const [cena,setCena]=useState(props.article.price);
    const [kolicina,setKolicina]=useState(props.article.qunatity);
    const [opis,setOpis]=useState(props.article.description);
    const [comments,setComments]=useState([]);
    const [imageUrl,setImageUrl]=useState("");
    const [rate,setRate]=useState(0);

    const config = {
        headers: {  Authorization: 'Bearer ' +  localStorage.getItem('token'+props.user.id),}
    };


    const GetAllComm=async (e)=>{
        const respForComments= await GetAllCommentsForArticle(props.article.id,config);
       console.log(respForComments.data);
       if(respForComments.data!=undefined){
       setComments(respForComments.data);
       }    
    }

    const GetStars=async (e)=>{
        const respRate=await GetRate(props.article.id,config);
       setRate(respRate.data.stars)
       console.log("resp:"+respRate.data)   
    }


    useEffect (()=>{

        const resp=getImage2(props.article.id,config);
       setImageUrl(localStorage.getItem('url-article'+props.article.id));
        console.log(resp);
       GetAllComm();
       GetStars();
    },[]);

   
    const back =e=>{
        e.preventDefault();
        const container = document.getElementById('root');
        const root = ReactDOMClient.createRoot(container);
        root.render(<MainPage user={props.user}></MainPage>)
    }

   const elementi=comments.map(element => <tr><td>
    {element.description}</td>
    </tr>);
const maxCircuits = 5; // The maximum number of circuits

    return(
        <div class="container text-center">
            <div class="alert alert-warning"><strong><h1>ARTICLE</h1></strong></div>
               Name : <label><b>{naziv}</b></label><br/><br/>
               Price : <label><b>{cena}</b></label><br/><br/>
               Quantity : <label><b>{kolicina}</b></label><br/><br/>
               Description : <label><b>{opis}</b></label><br/><br/>
            
            <img src={imageUrl} height={300} width={300} alt="Image"/><br/><br/>
            <br/> {Array(maxCircuits)
        .fill()
        .map((_, index) => (
            <Star size={80} color="gold" filled={index<rate} />
        ))}<br/>
            <h3>Comments:</h3>
            <table class="table table-bordered">
                {elementi}
            </table>
           
           <br/><br/>
         <input type={"submit"} name='back' value={"Back"} onClick={back} class="btn btn-warning"/><br/>
            
        </div>
    )
}