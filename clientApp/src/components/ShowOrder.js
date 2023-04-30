import React,{useState,useEffect} from "react";
import {GetOrdersToShow } from "../services/OrderService";
import { getImage2 } from "../services/ArticleService";
import * as ReactDOMClient from 'react-dom/client';
import MainPage from "./MainPage"

export default function ShowOrder(props){
    const [articles,setArticles]=useState([]);
    const [finalPrice,setFinalPrice]=useState(0);
    const [deliveryTime,setDeliveryTime]=useState();
    const [orderTime,setOrderTime]=useState();
    const [comment,setComment]=useState('');
    const [address, setAddress]=useState('');
    const [imageUrl,setImageUrl]=useState("");

    const config = {
        headers: {  Authorization: 'Bearer ' +  localStorage.getItem('token'+props.user.id),}
    };

    const GetInfo=async (e)=>{
        const resp=await GetOrdersToShow(props.order,config);
        console.log(resp);
        setArticles(resp.data.articles);
        resp.data.articles.forEach(element => {
            getImage2(element.id);
        });
        setFinalPrice(resp.data.finalPrice);
        setDeliveryTime(resp.data.deliveryTime.split('T')[0]+" at "+resp.data.deliveryTime.split('T')[1].split('.')[0]);
        setOrderTime(resp.data.orderTime.split('T')[0]+" at "+resp.data.orderTime.split('T')[1].split('.')[0]);
        setComment(resp.data.comment);
        setAddress(resp.data.address);
        let cost =0;
        resp.data.articles.forEach(element => {
            cost+=(element.qunatity+0)*(element.price+0);
            console.log(cost);
        });
        console.log(cost);
        console.log(resp.data.finalPrice);

    }

    useEffect(() =>{
        GetInfo();
        
    },[])

    const back =e=>{
        e.preventDefault();
        const container = document.getElementById('root');
        const root = ReactDOMClient.createRoot(container);
        root.render(<MainPage user={props.user}></MainPage>)
    }



    const elementi=articles.map(element => <tr><td>
        {element.name}</td><td >{element.price}</td> <td>{element.qunatity}</td> <td> <span>{(element.qunatity+0)*(element.price+0)}</span></td><td>{element.description}</td>
        <td><img src={localStorage.getItem('url-article'+element.id)} height={100} width={100} alt="Image"/></td>
        </tr>);

    return(
        <div>
            <div class="container text-center">
                <div class="alert alert-warning"><strong><h1>Order</h1></strong></div>
                <b>Final price : {finalPrice}</b><br/><br/>
                <b>Order time : {orderTime}</b><br/><br/>
                <b>Delivery time : {deliveryTime}</b><br/><br/>
                <b>Comment : {comment}</b><br/><br/>
                <b>Address : {address}</b><br/><br/>
                <table class="table table-bordered">
                    <tr>
                        <td ><b>Name</b></td>
                        <td><b>Price</b></td>
                        <td><b>Quantity</b></td>
                        <td><b>Sum</b></td>
                        <td><b>Description</b></td>
                        <td><b>Image</b></td>
                        </tr>
                        {elementi}
            </table>
            <input type={"submit"} name='back' value={"Back"} onClick={back} class="btn btn-warning"></input><br/>
            </div>
        </div>
    )

}