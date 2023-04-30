import { GetAllOrders } from "../services/OrderService";
import React,{useState,useEffect} from "react";
import ShowOrder from "./ShowOrder";
import * as ReactDOMClient from 'react-dom/client';

export default function AllOrders(props){
    const [elements,setElements]=useState([]);
    const config = {
        headers: {  Authorization: 'Bearer ' +  localStorage.getItem('token'+props.user.id)}
    };

    const OrdersTableFill=async (e)=>{
        const resp=await GetAllOrders(config);
        console.log("resp:"+resp);
        setElements(resp.data)
        console.log("staro");        
    }

    useEffect(() =>{
        OrdersTableFill();
    },[])

    const showOrder =(e,element)=>{
        e.preventDefault();
        const container = document.getElementById('root');
        const root = ReactDOMClient.createRoot(container);
        root.render(<ShowOrder order={element.id} user={props.user}/>);
    }
   //.split('T')[0]+" at "+element.orderTime.split('T')[1] -- .split('T')[0]+" at "+element.deliveryTime.split('T')[1]
    const elementi=elements.map(element => <tr>
        <td>{element.finalPrice}</td>
        <td>{element.orderTime}</td><td>{element.deliveryTime}</td>
        <td>{element.comment}</td><td>{element.address}</td><td><input type={"button"} class="btn btn-link" onClick={(event)=>showOrder(event,element)}  value={"Show"}/></td>
        </tr>);

    return(
            <div>
            <div class="container text-center">
                <div class="alert alert-warning"><strong><h1>Orders</h1></strong></div>
                <table class="table table-bordered">
                    <tr>
                        <td><b>Final price</b></td>
                        <td><b>Order time</b></td>
                        <td><b>Delivery time</b></td>
                        <td><b>Comment</b></td>
                        <td><b>Address</b></td>
                        <td><b>Show order</b></td>
                        </tr>
                        {elementi}
            </table></div></div>
        )
}