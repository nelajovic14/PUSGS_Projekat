import React,{useState,useRef,useEffect} from "react";
import { GetAllArticles ,getImage2} from "../services/ArticleService";
import { AddOrder } from "../services/OrderService";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import * as ReactDOMClient from 'react-dom/client';
import ShowArticle from "./ShowArticle";

export default function NewOrder(props){
    const [elements,setElements]=useState([]);
    const [listOfArticles,setList]=useState([]);
    const [quantity,setQ]=useState(0);
    const [data,setData]=useState('');
    const [openDialog, handleDisplay] = React.useState(false);
    const [address,setAddress]=useState('');
    const [comment,setComment]=useState('');
    const kol=useRef(0);
    const config = {
        headers: {  Authorization: 'Bearer ' +  localStorage.getItem('token'+props.user.id),}
    };

    const tableArticles=async (e)=>{
        const resp=await GetAllArticles(config);
        setElements(resp.data)
        resp.data.forEach(element => {
            getImage2(element.id,config);
        });
    }
        
    useEffect(() =>{
        tableArticles();
    },[])

    const handleClose = () => {
        handleDisplay(false);
    };

    const openDialogBox = () => {
        handleDisplay(true);
    };

    const handleInputChanges = e=>{
        const{name,value}=e.target
        if(name=="address"){
            setAddress(value);
        }
        if(name=="comment"){
            setComment(value);
        }

    }

    const valid=()=>{
        var valid=true;
        if(address==''){
            setData("Adresu je obavezno uneti pre poručivanja!");
            openDialogBox();
            valid=false;
        }
        else if(listOfArticles.length==0){
            setData("Ne možete poručiti praznu listu!");
            openDialogBox();
            valid=false;
        }
        return valid;
    }

    const poruci=async (event,element)=>{      
        event.preventDefault();
        const config = {
            headers: {  Authorization: 'Bearer ' +  localStorage.getItem('token'),}
        };
        const Order={ address:address, comment:comment, userId:props.user.id, articles: listOfArticles}
        if(valid()){
            const resp =await AddOrder(Order,config);
            if(resp.data.id==-1 || resp.data==''){
                setData("Ove proizvode nije moguće poručiti!");
                openDialogBox();
            }
            else{
                setData("Uspešno poručeno! "+"Konačna cena : "+resp.data.result.finalyPrice+
                "\nVreme i datum isporuke : "+resp.data.result.deliveryTime.split('T')[0] + " u "+ 
                resp.data.result.deliveryTime.split('T')[1].split('.')[0]);
                openDialogBox();
                setList([]);
                tableArticles();
            }
        }
    }

    const addQuantity=(event,element)=>{
        event.preventDefault();
        console.log(kol.current.value);
        setQ(kol.current.value);
        var list=listOfArticles;
       if(kol.current.value<=0){
            setData("Lista sa proizvodima mora imati bar jednu stavku!")
            openDialogBox();
        }
        else if(element.qunatity>=kol.current.value){
            const ArticleNew={id:element.id,name:element.name,price:element.price,qunatity:kol.current.value,description:element.description,image:element.image,userId:element.userId}
            list.push(ArticleNew);
            setList(list);
        }
        else{
            setData("Nema dovoljno ovog proizvoda na stanju!")
            openDialogBox();
        }
    }

    const addOnList=(event,element)=>{
        
        event.preventDefault();
        setData(<div>Količina : <input type={"number"} ref={kol} ></input><input type="submit" name="order" value={"poruči"} onClick={(event)=>addQuantity(event,element)} /></div>)
        openDialogBox();
       
    }



    const deletefromList=(event,element)=>{
        event.preventDefault();
        var list=listOfArticles;
        var newList=[];
        (list).forEach(elementA => {
            if(elementA!=element){
                newList.push(elementA)
            }
        });
        setList(newList);
        tableArticles();
    }

    const showArticle=(event,element)=>{
        event.preventDefault();
        const container = document.getElementById('root');
        const root = ReactDOMClient.createRoot(container);
        root.render(<ShowArticle article={element} user={props.user}/>);
    }

    const elementi=elements.map(element => <tr><td>
        {element.name}</td><td >{element.price}</td><td >
        {element.qunatity}</td><td>{element.description}</td>
        <td><img src={localStorage.getItem('url-article'+element.id)} height={100} width={100} alt="slika"/></td>
        <td><input type={"button"} class="btn btn-link" onClick={(event)=>addOnList(event,element)}  value={"poruči"}></input></td>
        <td><input type={"button"} class="btn btn-link" onClick={(event)=>showArticle(event,element)}  value={"prikaži"}></input></td>
        </tr>);

    const articles=listOfArticles.map(element => <tr><td>
    {element.name}</td><td>{element.qunatity}</td><td >{element.price}</td><td>{element.description}</td>
    <td><img src={localStorage.getItem('url-article'+element.id)} height={100} width={100} alt="slika"/></td><td><input type={"button"} class="btn btn-link" onClick={(event)=>deletefromList(event,element)}  value={"obriši"}/></td>
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
                        <td><b>Poruči</b></td>
                        <td><b>Prikaži proizvod</b></td>
                        </tr>
                        {elementi}
            </table>
            <br/><br/>
            <div class="alert alert-info"><strong><h1>Poruči Proizvode</h1></strong></div>
            <table class="table table-bordered">
                    <tr>
                        <td ><b>Naziv</b></td>
                        <td ><b>Količina</b></td>
                        <td><b>Cena</b></td>
                        <td><b>Opis</b></td>
                        <td><b>Slika</b></td>
                        </tr>
                        {articles}
            </table><br/>
            <div>Adresa :  <input type={"text"} name='address' value={address} onChange={handleInputChanges}  ></input></div><br/>
                <div>Komentar :  <input type={"text"} name='comment' value={comment} onChange={handleInputChanges}  ></input></div><br/>
                <input type={"submit"} name='poruci' value={"poruči"} class="btn btn-primary" onClick={poruci}></input><br/>
            </div>

            <Dialog onClose = {handleClose} open = {openDialog}>
            <DialogTitle> Poručivanje proizvoda </DialogTitle>
            <div class="p-5 text-center bg-image rounded-3" style={{ backgroundColor: "tomato"}}>
            <div class="mask">
                <div class="d-flex justify-content-center align-items-center h-100">
                <div class="text-black">
                    <h4 class="mb-3">{data}</h4>
                </div>
                </div>
            </div>
            </div>
         </Dialog><br/><br/>
            </div>

        )

}