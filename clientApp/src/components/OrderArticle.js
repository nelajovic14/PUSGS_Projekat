import React,{useState,useEffect} from "react";
import { AddOrder } from "../services/OrderService";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import  backImage  from "../img/3893666_81805.jpg";
import MainPage from "../components/MainPage"
import * as ReactDOMClient from 'react-dom/client';
import NewOrder from "./NewOrders";

export default function OrderArticle(props){
    const [article,setArticle]=useState(props.article);
    const [quantity,setQuantity]=useState(0);
    const [address,setAddress]=useState('');
    const [comment,setComment]=useState('');
    const [data,setData]=useState('');
    const [openDialog, handleDisplay] = React.useState(false);
    const [orderArt,setOrder]=useState(props.articles);

    const handleClose = () => {
        handleDisplay(false);
    };

    const openDialogBox = () => {
        handleDisplay(true);
    };

    const handleInputChanges = e=>{
        const{name,value}=e.target
        if(name=="quantity"){
            setQuantity(value);
        }
        if(name=="address"){
            setAddress(value);
        }
        if(name=="comment"){
            setComment(value);
        }
    }

    const order=async e=>{
        e.preventDefault();
        if(validate()){
            const config = {
                headers: {  Authorization: 'Bearer ' +  localStorage.getItem('token'),}
            };
            const Order={quantity:quantity, articleId:article.id, address:address, comment:comment, userId:props.user.id}
            const resp =await AddOrder(Order,config);
            console.log(resp);
            if(resp.data!=""){
                
                setData("Final price : "+resp.data.finalyPrice+"\nDelivery date and time : "+resp.data.deliveryTime.split('T')[0]+" at "+resp.data.deliveryTime.split('T')[1].split('.')[0]);
                openDialogBox();
                //setOrder(Order);
                const container = document.getElementById('root');
                const root = ReactDOMClient.createRoot(container);
                root.render(<NewOrder user={props.user} order={Order}></NewOrder>)
            }
            else{
                setData("I am sorry, you can not order this!");
                openDialogBox();
            }
        }
    }

    const validate=()=>{
        var validate=true;
        if(quantity==0 && address==''){
            setData("You can not order less than 1 article and you have to type address!");
            openDialogBox();
            validate=false;
        }
        if(quantity==0){
            setData("You can not order less than 1 article!");
            openDialogBox();
            validate=false;
        }
        if(address==''){
            setData("You have to type address!");
            openDialogBox();
            validate=false;
        }
        return validate;
    }

    const back =e=>{
        e.preventDefault();
        const container = document.getElementById('root');
            const root = ReactDOMClient.createRoot(container);
            root.render(<MainPage user={props.user}></MainPage>)
    }



    
    return(
        <div class="container text-center">
            <div class="alert alert-warning"><strong><h1>Order this article:</h1></strong></div>
            <div>
                <div>Name : {article.name}</div><br/>
                <div>Price : {article.price}</div><br/>
                <div>Qunatity : {article.qunatity}</div><br/>
                <div>Description : {article.description}</div><br/>
            </div>
            <form onSubmit={order}> 
            <div>
                <div>Order : </div><br/>
                <div>Qunatity :  <input type={"text"} name='quantity' value={quantity} onChange={handleInputChanges}  ></input></div><br/>
                <div>Address :  <input type={"text"} name='address' value={address} onChange={handleInputChanges}  ></input></div><br/>
                <div>Comment :  <input type={"text"} name='comment' value={comment} onChange={handleInputChanges}  ></input></div><br/>
                <input type={"submit"} name='order' value={"Order"} ></input><br/>
            </div>
            </form>
            <Dialog onClose = {handleClose} open = {openDialog}>
            <DialogTitle> Your order </DialogTitle>
            <div class="p-5 text-center bg-image rounded-3" style={{ backgroundImage: `url(${backImage})`}}>
            <div class="mask">
                <div class="d-flex justify-content-center align-items-center h-100">
                <div class="text-black">
                    <h4 class="mb-3">{data}</h4>
                </div>
                </div>
            </div>
            </div>
         </Dialog><br/><br/>
         <input type={"submit"} name='back' value={"Back"} onClick={back}></input><br/>
        </div>
    )

}
