import React,{useState,useEffect} from "react";
import { GetAllArticles } from "../services/ArticleService";
import OrderArticle from "../components/OrderArticle"
import * as ReactDOMClient from 'react-dom/client';

export default function NewOrder(props){
    //console.log("props:"+props.user.typeOfUser);
    const [elements,setElements]=useState([]);
    const config = {
        headers: {  Authorization: 'Bearer ' +  localStorage.getItem('token'),}
    };

    const tableArticles=async (e)=>{
        const resp=await GetAllArticles(config);
        console.log(resp);
        setElements(resp.data)
        console.log(elements);

    }
        
    useEffect(() =>{
        tableArticles();
    },[])

    const poruci=(event,element)=>{
       
        event.preventDefault();
        const container = document.getElementById('root');
        const root = ReactDOMClient.createRoot(container);
        root.render(<OrderArticle user={props.user} article={element}></OrderArticle>);

    }

    const elementi=elements.map(element => <tr><td>
        {element.name}</td><td >{element.price}</td><td >
        {element.qunatity}</td><td>{element.description}</td>
        <td>{element.image}</td>
        <td><input type={"button"} class="btn btn-link" onClick={(event)=>poruci(event,element)}  value={"Poruči"}></input></td>
        </tr>);
    return(
            <div>
            <div class="container text-center">
                <div class="alert alert-warning"><strong><h1>Artikli</h1></strong></div>
                <table class="table table-bordered">
                    <tr>
                        <td ><b>Naziv</b></td>
                        <td><b>Cena</b></td>
                        <td ><b>Količina</b></td>
                        <td><b>Opis</b></td>
                        <td><b>Slika</b></td>
                        <td><b>Poruči</b></td>
                        </tr>
                        {elementi}
            </table></div></div>
        )

}