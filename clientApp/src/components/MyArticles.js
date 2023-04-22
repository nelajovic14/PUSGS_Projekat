import React,{useState} from "react";
import { DeleteArticle, GetAllUserArticles } from "../services/ArticleService";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import  backImage  from "../img/3893666_81805.jpg";

export default function NewOrder(props){
    //console.log("props:"+props.user.typeOfUser);
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

    const tableArticles=async (e)=>{
        const resp=await GetAllUserArticles(props.user.id,config);
        console.log(resp);
        setElements(resp.data)
        console.log(elements);

    }
        
    //useEffect(() =>{
        tableArticles();
    //},[])

    const obrisi=async (event,element)=>{
       
        event.preventDefault();
        const respDelete=await DeleteArticle(element.id,config);
        console.log(respDelete);
        setData("Article is deleted!");
        openDialogBox();
    }

    const elementi=elements.map(element => <tr><td>
        {element.name}</td><td >{element.price}</td><td >
        {element.qunatity}</td><td>{element.description}</td>
        <td>{element.image}</td>
        <td><input type={"button"} class="btn btn-link" onClick={(event)=>obrisi(event,element)}  value={"Delete"}></input></td>
        </tr>);
    return(
            <div>
            <div class="container text-center">
                <div class="alert alert-warning"><strong><h1>Articles</h1></strong></div>
                <table class="table table-bordered">
                    <tr>
                        <td ><b>Name</b></td>
                        <td><b>Price</b></td>
                        <td ><b>Quantity</b></td>
                        <td><b>Description</b></td>
                        <td><b>Image</b></td>
                        <td><b>Delete</b></td>
                        </tr>
                        {elementi}
            </table></div>
            <Dialog onClose = {handleClose} open = {openDialog}>
    <DialogTitle> Article </DialogTitle>
            <div class="p-5 text-center bg-image rounded-3" style={{ backgroundImage: `url(${backImage})`}}>
            <div class="mask">
                <div class="d-flex justify-content-center align-items-center h-100">
                <div class="text-black">
                    <h4 class="mb-3">{data}</h4>
                </div>
                </div>
            </div>
            </div>
         </Dialog>
            </div>
        )

}