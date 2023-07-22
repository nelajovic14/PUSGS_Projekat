import React,{useState,useEffect} from "react";
import { GetOrders, DeclineOrder,GetOrdersToShow } from "../services/OrderService";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import * as ReactDOMClient from 'react-dom/client';
import ShowOrder from '../components/ShowOrder'

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
        headers: {  Authorization: 'Bearer ' +  localStorage.getItem('token'+props.user.id),}
    };

    const OrdersTableFill=async (e)=>{
        const resp=await GetOrders(props.user.id,config);
        setElements(resp.data)
    }

    useEffect(() =>{
        OrdersTableFill();
    },[])

    const otkazi=async (event,element)=>{      
        event.preventDefault();
        const resp=await DeclineOrder(element,config);
        if(resp.data==false){
            setData("Nije moguće otkazati porudžbinu!");
            openDialogBox();
        }
        else{
            setData("Porudžbina je otkazana!");
            openDialogBox();
            OrdersTableFill();
        }
    }

    const showOrder =(event,element)=>{
        event.preventDefault();
        const container = document.getElementById('root');
        const root = ReactDOMClient.createRoot(container);
        root.render(<ShowOrder order={element.id} user={props.user}/>);
    }

    const elementi=elements.map(element => <tr>
        <td>{element.finalPrice}</td>
        <td>{element.orderTime.split('T')[0]+" u "+element.orderTime.split('T')[1]}</td><td>{element.deliveryTime.split('T')[0]+" u "+element.deliveryTime.split('T')[1]}</td>
        <td>{element.comment}</td><td>{element.address}</td>
        <td><input type={"button"} class="btn btn-link" onClick={(event)=>otkazi(event,element)}  value={"Otkaži"}></input></td>
        <td><input type={"button"} class="btn btn-link" onClick={(event)=>showOrder(event,element)}  value={"Prikaži"}/></td>
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
                        <td>Otkaži</td>
                        <td>Prikaži</td>
                        </tr>
                        {elementi}
            </table></div><Dialog onClose = {handleClose} open = {openDialog}>
            <DialogTitle> Porudžbina </DialogTitle>
            <div class="p-5 text-center bg-image rounded-3" style={{ backgroundColor: "tomato"}}>
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