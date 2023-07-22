import React,{useState,useEffect} from "react";
import {  EditArticle,AddImage,getImage2 } from "../services/ArticleService";
import Dialog from "@mui/material/Dialog";
import  backImage  from "../img/3893666_81805.jpg";
import * as ReactDOMClient from 'react-dom/client';
import MainPage from "./MainPage";

export default function EditArticleFunction(props){

    const [naziv,setNaziv]=useState(props.article.name);
    const [cena,setCena]=useState(props.article.price);
    const [kolicina,setKolicina]=useState(props.article.qunatity);
    const [opis,setOpis]=useState(props.article.description);
    const [data,setData]=useState('');
    const [openDialog, handleDisplay] = React.useState(false);
    const [imageUrl,setImageUrl]=useState("");
    const [file,setFile]=useState(null);

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
            setData("Obavezno unesi naziv proizvoda!");
            openDialogBox();
            valid=false;
        }
        
        else if (opis=='') {
            setData("Opis ptoizvoda je obavezan!");
            openDialogBox();
            valid=false;
        }

        else if (kolicina==0) {
            setData("Ne možeš prodavati proizvod kojeg nemaš na stanju!");
            openDialogBox();
            valid=false;
        }
        if (cena<0) {
            setData("Cena mora biti pozitivan broj!");
            openDialogBox();
            valid=false;
        }
        else if(!imageUrl){
            let imageError = "Slika je obavezna!";
            setData(imageError);
            openDialogBox();
            valid=false;
        }
        return valid;
    }
    
    const edit =async e=>{
        e.preventDefault();
        if(validate()){
            
            const Article={name:naziv,description:opis,qunatity:kolicina,price:cena,userId:props.user.id,id:props.article.id};
            const resp=await EditArticle(Article,config);
            console.log(resp);
            if(resp.data!=""){
                setData("Proizvod je uspešno izmenjen!")
                openDialogBox();
            }
            else{
                setData("Nije moguće izmeniti proizvod!")
                openDialogBox();
            }
            if(file!=null){
                const response=AddImage(file,props.article.id,config);
                console.log(response);
                    if((await response).status==200){
                        getImage2(props.article.id,config);
                        setData("Uspešno ste izmenili proizvod!")
                        openDialogBox();
                    }
            }
        }

    }
    const back =e=>{
        e.preventDefault();
        const container = document.getElementById('root');
        const root = ReactDOMClient.createRoot(container);
        root.render(<MainPage user={props.user}></MainPage>)
    }

    function handleFileSelect(event) {
        const file = event.target.files[0];
        console.log(file);
        setImageUrl(file);
        const formData = new FormData();
        formData.append("image", file);
        setFile(formData);
        setImageUrl(URL.createObjectURL(file));
      }


    return(
        <div class="container text-center">
            <div class="alert alert-warning"><strong><h1>IZMENI PROIZVOD</h1></strong></div>
            <form onSubmit={edit}>
               Naziv : <input  type={"text"} name="naziv" value={naziv} onChange={handleInputChanges}/><br/><br/>
               Cena : <input  type={"number"} name="cena" value={cena} onChange={handleInputChanges}/><br/><br/>
               Količina : <input  type={"number"} name="kolicina" value={kolicina} onChange={handleInputChanges}/><br/><br/>
               Opis : <input  type={"text"} name="opis" value={opis} onChange={handleInputChanges}/><br/><br/>
               Slika : <div><input type={"file"} onChange={handleFileSelect}  /></div><br/>
            
            <img src={imageUrl} height={300} width={300} alt="Image"/><br/><br/>
               <input type={"submit"} name='edit' value={"Edit"} onChange={handleInputChanges} class="btn btn-warning"/><br/>
            </form><br/>
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