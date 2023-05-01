import React,{useState,useRef,useEffect} from "react";
import { GetAllArticles ,getImage2} from "../services/ArticleService";
import { AddOrder } from "../services/OrderService";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

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
        console.log(resp);
        setElements(resp.data)
        resp.data.forEach(element => {
            getImage2(element.id,config);
        });
        console.log(elements);

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
            setData("You have to write your address!");
            openDialogBox();
            valid=false;
        }
        else if(comment==""){
            setData("You have to type some comment!");
            openDialogBox();
            valid=false;
        }
        else if(listOfArticles.length==0){
            setData("Order something! You article list is empty!");
            openDialogBox();
            valid=false;
        }
        return valid;
    }

    const poruci=async (event,element)=>{
       
        event.preventDefault();
        //const container = document.getElementById('root');
        //const root = ReactDOMClient.createRoot(container);
        //root.render(<OrderArticle user={props.user} article={element}></OrderArticle>);
        const config = {
            headers: {  Authorization: 'Bearer ' +  localStorage.getItem('token'),}
        };
        const Order={ address:address, comment:comment, userId:props.user.id, articles: listOfArticles}
        if(valid()){
            const resp =await AddOrder(Order,config);
            console.log(resp);
            if(resp.data.id==-1 || resp.data==''){
                setData("You can not order this articles!");
                openDialogBox();
            }
            else{
                setData("Successfully order! "+"Final price : "+resp.data.finalyPrice+"\nDelivery date and time : "+resp.data.deliveryTime.split('T')[0] + " at "+ resp.data.deliveryTime.split('T')[1].split('.')[0]);
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
            setData("Can not order 0 articles!")
            openDialogBox();
        }
        else if(element.qunatity>=kol.current.value){
            const ArticleNew={id:element.id,name:element.name,price:element.price,qunatity:kol.current.value,description:element.description,image:element.image,userId:element.userId}
            list.push(ArticleNew);
            setList(list);
        }
        else{
            setData("There is no enough of this article!")
            openDialogBox();
        }
       // handleClose();
    }

    const addOnList=(event,element)=>{
        
        event.preventDefault();
        setData(<div>Quantity : <input type={"number"} ref={kol} ></input><input type="submit" name="order" value={"order"} onClick={(event)=>addQuantity(event,element)} /></div>)
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

    const elementi=elements.map(element => <tr><td>
        {element.name}</td><td >{element.price}</td><td >
        {element.qunatity}</td><td>{element.description}</td>
        <td><img src={localStorage.getItem('url-article'+element.id)} height={100} width={100} alt="Image"/></td>
        <td><input type={"button"} class="btn btn-link" onClick={(event)=>addOnList(event,element)}  value={"Poruči"}></input></td>
        </tr>);

    const articles=listOfArticles.map(element => <tr><td>
    {element.name}</td><td>{element.qunatity}</td><td >{element.price}</td><td>{element.description}</td>
    <td><img src={localStorage.getItem('url-article'+element.id)} height={100} width={100} alt="Image"/></td><td><input type={"button"} class="btn btn-link" onClick={(event)=>deletefromList(event,element)}  value={"Delete"}/></td>
    </tr>);

    return(
            <div>
            <div class="container text-center">
                <div class="alert alert-warning"><strong><h1>Artikli</h1></strong></div>
                <table class="table table-bordered">
                    <tr>
                        <td ><b>Name</b></td>
                        <td><b>Price</b></td>
                        <td ><b>Quantity</b></td>
                        <td><b>Description</b></td>
                        <td><b>Image</b></td>
                        <td><b>Order</b></td>
                        </tr>
                        {elementi}
            </table>
            <br/><br/>
            <div class="alert alert-info"><strong><h1>Ordered Articles</h1></strong></div>
            <table class="table table-bordered">
                    <tr>
                        <td ><b>Name</b></td>
                        <td ><b>Quantity</b></td>
                        <td><b>Price</b></td>
                        <td><b>Description</b></td>
                        <td><b>Image</b></td>
                        </tr>
                        {articles}
            </table><br/>
            <div>Address :  <input type={"text"} name='address' value={address} onChange={handleInputChanges}  ></input></div><br/>
                <div>Comment :  <input type={"text"} name='comment' value={comment} onChange={handleInputChanges}  ></input></div><br/>
                <input type={"submit"} name='poruci' value={"poruci"} onClick={poruci}></input><br/>
            </div>

            <Dialog onClose = {handleClose} open = {openDialog}>
            <DialogTitle> Article quantity </DialogTitle>
            <div class="p-5 text-center bg-image rounded-3">
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