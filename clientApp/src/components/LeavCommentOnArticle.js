import React,{useState,useEffect} from "react";
import {  getImage2 } from "../services/ArticleService";
import { AddComment } from "../services/CommentService";
import Dialog from "@mui/material/Dialog";
import  backImage  from "../img/3893666_81805.jpg";
import * as ReactDOMClient from 'react-dom/client';
import ShowOrder from "./ShowOrder";

export default function ArticleReview(props){

    const [naziv,setNaziv]=useState(props.article.name);
    const [cena,setCena]=useState(props.article.price);
    const [kolicina,setKolicina]=useState(props.article.qunatity);
    const [opis,setOpis]=useState(props.article.description);
    const [data,setData]=useState('');
    const [openDialog, handleDisplay] = React.useState(false);
    const [imageUrl,setImageUrl]=useState("");
    const [file,setFile]=useState(null);
    const [comment,setComment]=useState('');

    const config = {
        headers: {  Authorization: 'Bearer ' +  localStorage.getItem('token'+props.user.id),}
    };

    useEffect (()=>{

        const resp=getImage2(props.article.id,config);
       setImageUrl(localStorage.getItem('url-article'+props.article.id));
       
    },[]);

    const handleClose = () => {
        handleDisplay(false);
    };

    const openDialogBox = () => {
        handleDisplay(true);
    };
   
   
    const back =e=>{
        e.preventDefault();
        const container = document.getElementById('root');
        const root = ReactDOMClient.createRoot(container);
        root.render(<ShowOrder order={props.order} user={props.user}></ShowOrder>)
    }

    const handleInputChanges = e=>{
        var{name,value}=e.target
        if(name=="commentFromUser"){
            setComment(value);
        }
    }

    const validate=()=>{
        if(comment==''){
            let commentError = "Morate uneti komentar ukoliko želite da ga pošaljete!";
            setData(commentError);
            openDialogBox();
            return false;
        }
        const date1 = new Date(); 
        console.log(date1);
        var dateOrder=props.order.toString();
        console.log(dateOrder);
        const date2 = new Date(dateOrder.split('-')[0],dateOrder.split('-')[1]-1,dateOrder.split('-')[2].split(' ')[0],dateOrder.split(':')[0].split(' ')[2],dateOrder.split(':')[1],dateOrder.split(':')[2]);
        console.log(date2);

        if(date1<=date2){
            setData("Ne možeš komentarisati proizvod pre vremena isporuke!");
            openDialogBox();
            return false;
        }
        return true;
    }

    const LeaveComment=async e=>{
        e.preventDefault();
        if(validate()){
            
            const config = {
                headers: {  Authorization: 'Bearer ' +  localStorage.getItem('token'+props.user.id),}
            };
            const commentObj={description:comment,articleId:props.article.id};
            const resp=await AddComment(commentObj,config); 
           if(resp.status==200){
            setData("Komentar je uspešno objavljen!");
            openDialogBox();
           }
        }
    }

    return(
        <div class="container text-center">
            <div class="alert alert-warning"><strong><h1>PREGLED PROIZVODA</h1></strong></div>
               Naziv : <label><b>{naziv}</b></label> &nbsp; &nbsp; &nbsp; &nbsp;
               Cena : <label><b>{cena}</b></label>&nbsp; &nbsp; &nbsp; &nbsp;
               Količina : <label><b>{kolicina}</b></label>&nbsp;&nbsp; &nbsp; &nbsp;
               Opis : <label><b>{opis}</b></label><br/>
            
            <img src={imageUrl} height={300} width={300} alt="Image"/><br/><br/>

            <form onSubmit={LeaveComment}>
            Komentar : <input  type={"text"} name="commentFromUser" value={comment} onChange={handleInputChanges}/><br/><br/>
            <input type={"submit"} name='comm' value={"ostavite komentar"} class="btn btn-danger"/><br/><br/>
            </form>
            <Dialog onClose = {handleClose} open = {openDialog}>
            <div class="p-5 text-center bg-image rounded-3" style={{ backgroundColor: "tomato"}}>
            <div class="mask">
                <div class="d-flex justify-content-center align-items-center h-100">
                <div class="text-black">
                    <h4 class="mb-3">{data}</h4>
                </div>
                </div>
            </div>
            </div>
         </Dialog>
         <input type={"submit"} name='back' value={"Nazad"} onClick={back} class="btn btn-warning"/><br/>
        </div>
    )
}