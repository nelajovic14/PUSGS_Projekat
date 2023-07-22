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
       if(respForComments.data!=undefined){
       setComments(respForComments.data);
       }    
    }

    const GetStars=async (e)=>{
        const respRate=await GetRate(props.article.id,config);
       setRate(respRate.data.stars)
    }


    useEffect (()=>{

        const resp=getImage2(props.article.id,config);
       setImageUrl(localStorage.getItem('url-article'+props.article.id));
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
const maxCircuits = 5; 

    return(
        <div class="container text-center">
            <div class="alert alert-warning"><strong><h1>PROIZVOD</h1></strong> </div>
            <div >
               Naziv : <label><b>{naziv}</b></label><br/>
               Cena : <label><b>{cena}</b></label><br/>
               Količina : <label><b>{kolicina}</b></label><br/>
               Opis : <label><b>{opis}</b></label>
               </div>
            <img src={imageUrl} height={300} width={300} alt="slika"/> {Array(maxCircuits)
            .fill().map((_, index) => (
                <Star size={80} color="gold" filled={index<rate} />
            ))}
            <h3>Komentari:</h3>
            <table class="table table-bordered">
                {elementi}
            </table>
            
            <input type={"submit"} name='back' value={"Nazad"} onClick={back} class="btn btn-warning"/><br/>               
        </div>
    )
}