import React,{useState} from "react";
import {  EditArticle } from "../services/ArticleService";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import  backImage  from "../img/3893666_81805.jpg";
import * as ReactDOMClient from 'react-dom/client';
import MainPage from "./MainPage";

export default function EditArticleFunction(props){

    const [naziv,setNaziv]=useState(props.article.name);
    const [cena,setCena]=useState(props.article.price);
    const [kolicina,setKolicina]=useState(props.article.qunatity);
    const [opis,setOpis]=useState(props.article.description);
    const [slika,setSlika]=useState(props.article.image);
    const [data,setData]=useState('');
    const [openDialog, handleDisplay] = React.useState(false);

    const handleClose = () => {
        handleDisplay(false);
    };

    const openDialogBox = () => {
        handleDisplay(true);
    };


    const handleInputChanges = e=>{
        const{name,value}=e.target
        if(name=="naziv"){
            setNaziv(value);
        }
        if(name=="cena"){
            setCena(value);
        }
        if(name=="kolicina")
        {
            setKolicina(value);
        }
        if(name=="opis"){
            setOpis(value);
        }
    }
    const validate=()=>{
        var valid=true;
        if (naziv=='') {
            setData("You have to type name of article!");
            openDialogBox();
            valid=false;
        }
        
        else if (opis=='') {
            setData("You have to type description of article!");
            openDialogBox();
            valid=false;
        }

        else if (kolicina==0) {
            setData("Can not have 0 articles");
            openDialogBox();
            valid=false;
        }
        if (cena<0) {
            setData("Price is positiv number");
            openDialogBox();
            valid=false;
        }
        return valid;
    }
    
    const edit =async e=>{
        e.preventDefault();
        if(validate()){
            const config = {
                headers: {  Authorization: 'Bearer ' +  localStorage.getItem('token'),}
            };
            const Article={name:naziv,description:opis,qunatity:kolicina,price:cena,userId:props.user.id,id:props.article.id};
            const resp=await EditArticle(Article,config);
            console.log(resp);
            if(resp.data!=""){
                setData("successfully edit article!")
                openDialogBox();
            }
            else{
                setData("Something is wrong, you can not edit article!")
                openDialogBox();
            }
        }

    }
    const back =e=>{
        e.preventDefault();
        const container = document.getElementById('root');
            const root = ReactDOMClient.createRoot(container);
            root.render(<MainPage user={props.user}></MainPage>)
    }


    return(
        <div class="container text-center">
            <div class="alert alert-warning"><strong><h1>NEW ARTICLE</h1></strong></div>
            <form onSubmit={edit}>
               Name : <input  type={"text"} name="naziv" value={naziv} onChange={handleInputChanges}></input><br/><br/>
               Price : <input  type={"number"} name="cena" value={cena} onChange={handleInputChanges}></input><br/><br/>
               Quantity : <input  type={"number"} name="kolicina" value={kolicina} onChange={handleInputChanges}></input><br/><br/>
               Description : <input  type={"text"} name="opis" value={opis} onChange={handleInputChanges}></input><br/><br/>
               Image : <input  type={"text"} name="slika" value={slika} onChange={handleInputChanges}></input><br/><br/>
               <input type={"submit"} name='edit' value={"Edit"} onChange={handleInputChanges} class="btn btn-info"></input><br/>
            </form><br/>
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
         <input type={"submit"} name='back' value={"Back"} onClick={back}></input><br/>
        </div>
    )
}