import React,{useState,useEffect} from "react";
import { GetOrders, DeclineOrder } from "../services/OrderService";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import  backImage  from "../img/3893666_81805.jpg";

export default function OldOrder(props){

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
        headers: {  Authorization: 'Bearer ' +  localStorage.getItem('token'),}
    };

    const OrdersTableFill=async (e)=>{
        const resp=await GetOrders(props.user.id,config);
        console.log("resp:"+resp);
        setElements(resp.data)
        console.log(elements);
    }

   // useEffect(() =>{
        OrdersTableFill();
    //},[])

    const otkazi=async (event,element)=>{
       
        event.preventDefault();
        const resp=await DeclineOrder(element,config);
        console.log(resp);
        if(resp.data==false){
            setData("Can not decline order");
            openDialogBox();
        }
        else{
            setData("Decline succesfully!");
            openDialogBox();
        }
    }


    const elementi=elements.map(element => <tr><td>
        {element.article.name}</td><td >{element.quantity}</td><td >
        {element.price}</td><td>{element.finalPrice}</td>
        <td>{element.orderTime.split('T')[0]+" at "+element.orderTime.split('T')[1]}</td><td>{element.deliveryTime.split('T')[0]+" at "+element.deliveryTime.split('T')[1]}</td>
        <td>{element.comment}</td><td>{element.address}</td>
        <td><input type={"button"} class="btn btn-link" onClick={(event)=>otkazi(event,element)}  value={"Decline"}></input></td>
        </tr>);
    return(
            <div>
            <div class="container text-center">
                <div class="alert alert-warning"><strong><h1>Orders</h1></strong></div>
                <table class="table table-bordered">
                    <tr>
                        <td ><b>Name</b></td>
                        <td ><b>Quantity</b></td>
                        <td><b>Price</b></td>
                        <td><b>Final price</b></td>
                        <td><b>Order time</b></td>
                        <td><b>Delivery time</b></td>
                        <td><b>Comment</b></td>
                        <td><b>Address</b></td>
                        <td>Decline</td>
                        </tr>
                        {elementi}
            </table></div><Dialog onClose = {handleClose} open = {openDialog}>
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
         </Dialog></div>
        )
}