import { GetUserOrders,GetNewUserOrders } from "../services/OrderService";
import React,{useState,useEffect} from "react";
import ShowOrderNoComment from "./ShowOrderNoComment";
import * as ReactDOMClient from 'react-dom/client';

export default function OldOrdersUser(props){
    const [elements,setElements]=useState([]);

    const config = {
        headers: {  Authorization: 'Bearer ' +  localStorage.getItem('token'+props.user.id),}
    };

    const OrdersTableFill=async (e)=>{
        const resp=await GetUserOrders(props.user.id,config);
        setElements(resp.data)
       
    }

    useEffect(() =>{
        OrdersTableFill();
    },[])

    const showOrder =(e,element)=>{
        e.preventDefault();
        const container = document.getElementById('root');
        const root = ReactDOMClient.createRoot(container);
        root.render(<ShowOrderNoComment order={element.id} user={props.user}/>);
    }



    const elementi=elements.map(element => <tr>
        <td>{element.finalPrice}</td>
        <td>{element.orderTime.split('T')[0]+" u "+element.orderTime.split('T')[1]}</td><td>{element.deliveryTime.split('T')[0]+" u "+element.deliveryTime.split('T')[1]}</td>
        <td>{element.comment}</td><td>{element.address}</td><td><input type={"button"} class="btn btn-link" onClick={(event)=>showOrder(event,element)}  value={"Prikaži"}/></td>
        </tr>);
    return(
            <div>
            <div class="container text-center">
                <div class="alert alert-warning"><strong><h1>Porudžbine</h1></strong></div>
                <table class="table table-bordered">
                    <tr>
                        <td><b>Konačna cena</b></td>
                        <td><b>Vreme poručivanja</b></td>
                        <td><b>Vreme isporuke</b></td>
                        <td><b>Komentar</b></td>
                        <td><b>Adresa</b></td>
                        <td><b>Prikaži</b></td>
                        </tr>
                        {elementi}
            </table></div></div>
        )
}