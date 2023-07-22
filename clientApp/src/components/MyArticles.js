import React,{useState,useEffect} from "react";
import { DeleteArticle, GetAllUserArticles,getImage2 } from "../services/ArticleService";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import  backImage  from "../img/3893666_81805.jpg";
import * as ReactDOMClient from 'react-dom/client';
import EditArticleFunction from "./EditArticle";

export default function NewOrder(props){
    //console.log("props:"+props.user.typeOfUser);
    const [elements,setElements]=useState([]);
    const [data,setData]=useState('');
    const [openDialog, handleDisplay] = React.useState(false);

    const handleClose = () => {
        handleDisplay(false);
    };

    const openDialogBox = () => {
        handleDisplay(true);
    };



    const config = {
        headers: {  Authorization: 'Bearer ' +  localStorage.getItem('token'+props.user.id),}
    };

    const tableArticles=async (e)=>{
        const resp=await GetAllUserArticles(props.user.id,config);
        setElements(resp.data)
        resp.data.forEach(element => {
            getImage2(element.id);
        });

    }
        
    useEffect(() =>{
        tableArticles();
    },[])

    const obrisi=async (event,element)=>{
       
        event.preventDefault();
        const respDelete=await DeleteArticle(element.id,config);
        setData("Proizvod je obrisan!");
        openDialogBox();
        tableArticles();
    }

    const edit=async (event,element)=>{
       
        event.preventDefault();
        const container = document.getElementById('root');
        const root = ReactDOMClient.createRoot(container);
        root.render(<EditArticleFunction user={props.user} article={element}></EditArticleFunction>);
    }

    const elementi=elements.map(element => <tr><td>
        {element.name}</td><td >{element.price}</td><td >
        {element.qunatity}</td><td>{element.description}</td>
        <td><img src={localStorage.getItem('url-article'+element.id)} height={100} width={100} alt="slika"/></td>
        <td><input type={"button"} class="btn btn-link" onClick={(event)=>obrisi(event,element)}  value={"Obriši"}></input></td>
        <td><input type={"button"} class="btn btn-link" onClick={(event)=>edit(event,element)}  value={"Izmeni"}></input></td>
        </tr>);
    return(
            <div>
            <div class="container text-center">
                <div class="alert alert-warning"><strong><h1>Proizvodi</h1></strong></div>
                <table class="table table-bordered">
                    <tr>
                        <td ><b>Naziv</b></td>
                        <td><b>Cena</b></td>
                        <td ><b>Količina</b></td>
                        <td><b>Opis</b></td>
                        <td><b>Slika</b></td>
                        <td><b>Obriši</b></td>
                        <td><b>Izmeni</b></td>
                        </tr>
                        {elementi}
            </table></div>
            <Dialog onClose = {handleClose} open = {openDialog}>
    <DialogTitle> Proizvod </DialogTitle>
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
            </div>
        )

}