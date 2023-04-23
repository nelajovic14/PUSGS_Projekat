import { GetAllOrders } from "../services/OrderService";
import React,{useState,useEffect} from "react";

export default function AllOrders(props){
    const [elements,setElements]=useState([]);
    const config = {
        headers: {  Authorization: 'Bearer ' +  localStorage.getItem('token'),}
    };

    const OrdersTableFill=async (e)=>{
          const resp=await GetAllOrders(config);
            console.log("resp:"+resp);
            setElements(resp.data)
            console.log("staro");        
        
    }

    //useEffect(() =>{
        OrdersTableFill();
    //},[])

   


    const elementi=elements.map(element => <tr><td>
        {element.article.name}</td><td >{element.quantity}</td><td >
        {element.price}</td><td>{element.finalPrice}</td>
        <td>{element.orderTime.split('T')[0]+" at "+element.orderTime.split('T')[1]}</td><td>{element.deliveryTime.split('T')[0]+" at "+element.deliveryTime.split('T')[1]}</td>
        <td>{element.comment}</td><td>{element.address}</td>
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
                        </tr>
                        {elementi}
            </table></div></div>
        )
}