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
            let commentError = "You can not leave empty comment!";
            setData(commentError);
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
            setData("You sent a comment!");
            openDialogBox();
           }
        }
    }

    return(
        <div class="container text-center">
            <div class="alert alert-warning"><strong><h1>ARTICLE</h1></strong></div>
               Name : <label><b>{naziv}</b></label><br/><br/>
               Price : <label><b>{cena}</b></label><br/><br/>
               Quantity : <label><b>{kolicina}</b></label><br/><br/>
               Description : <label><b>{opis}</b></label><br/><br/>
            
            <img src={imageUrl} height={300} width={300} alt="Image"/><br/><br/>
            <br/>
            <form onSubmit={LeaveComment}>
            Comment : <input  type={"text"} name="commentFromUser" value={comment} onChange={handleInputChanges}/><br/><br/>
            <input type={"submit"} name='comm' value={"Leave comment"} class="btn btn-danger"/><br/><br/><br/>
            </form>
            <Dialog onClose = {handleClose} open = {openDialog}>
            <div class="p-5 text-center bg-image rounded-3" style={{ backgroundImage: `url(${backImage})`}}>
            <div class="mask">
                <div class="d-flex justify-content-center align-items-center h-100">
                <div class="text-black">
                    <h4 class="mb-3">{data}</h4>
                </div>
                </div>
            </div>
            </div>
         </Dialog>
         <input type={"submit"} name='back' value={"Back"} onClick={back} class="btn btn-warning"/><br/>
        </div>
    )
}