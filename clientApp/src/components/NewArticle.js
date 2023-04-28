import React,{useState,useEffect} from "react";
import { AddArticle,AddImage,getImage2 } from "../services/ArticleService";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import  backImage  from "../img/3893666_81805.jpg";

export default function NewArticleFunction(props){

    const [naziv,setNaziv]=useState('');
    const [cena,setCena]=useState(0);
    const [kolicina,setKolicina]=useState(0);
    const [opis,setOpis]=useState('');
    const [slika,setSlika]=useState('');
    const [data,setData]=useState('');
    const [openDialog, handleDisplay] = React.useState(false);

    const [imageUrl,setImageUrl]=useState("");
    const [file,setFile]=useState(null);

    const handleClose = () => {
        handleDisplay(false);
    };

    const openDialogBox = () => {
        handleDisplay(true);
    };


    const handleInputChanges = e=>{
        const{name,value}=e.target
        if(name=="naziv"){
            setNaziv(value);
        }
        if(name=="cena"){
            setCena(value);
        }
        if(name=="kolicina")
        {
            setKolicina(value);
        }
        if(name=="opis"){
            setOpis(value);
        }
        if(name=="slika"){
            setSlika(value);
        }
    }
    const validate=()=>{
        var valid=true;
        if (naziv=='') {
            setData("You have to type name of article!");
            openDialogBox();
            valid=false;
        }
        
        else if (opis=='') {
            setData("You have to type description of article!");
            openDialogBox();
            valid=false;
        }

        else if (kolicina==0) {
            setData("Can not have 0 articles");
            openDialogBox();
            valid=false;
        }
        if (cena<0) {
            setData("Price is positiv number");
            openDialogBox();
            valid=false;
        }
        return valid;
    }
    
    const add =async e=>{
        e.preventDefault();
        if(validate()){
            const config = {
                headers: {  Authorization: 'Bearer ' +  localStorage.getItem('token'),}
            };
            const Article={name:naziv,description:opis,qunatity:kolicina,price:cena,userId:props.user.id};
            const resp=await AddArticle(Article,config);
            console.log(resp);
            if(resp.data!=""){
                setData("successfully add new article!")
                openDialogBox();
            }
            else{
                setData("Something is wrong, you can not add new article!")
                openDialogBox();
            }
            if(file!=null){
                const response=AddImage(file,resp.data.id);
                console.log(response);
            }
        }
        


    }

    function handleFileSelect(event) {
        const file = event.target.files[0];
        console.log(file);
        setImageUrl(file);
        const formData = new FormData();
        formData.append("image", file);
        // send formData to the server
        setFile(formData);
        setImageUrl(file)
      }

    return(
        <div class="container text-center">
            <div class="alert alert-warning"><strong><h1>NEW ARTICLE</h1></strong></div>
            <form onSubmit={add}>
               Name : <input  type={"text"} name="naziv" value={naziv} onChange={handleInputChanges}></input><br/><br/>
               Price : <input  type={"number"} name="cena" value={cena} onChange={handleInputChanges}></input><br/><br/>
               Quantity : <input  type={"number"} name="kolicina" value={kolicina} onChange={handleInputChanges}></input><br/><br/>
               Description : <input  type={"text"} name="opis" value={opis} onChange={handleInputChanges}></input><br/><br/>
               Image: <input type="file" onChange={handleFileSelect} style={{"marginLeft":"300px"}}/>
            {imageUrl && <img src={URL.createObjectURL(imageUrl)} height={300} width={300} />}<br/><br/>
               <input type={"submit"} name='addnes' value={"Add new"} onChange={handleInputChanges} class="btn btn-info"></input><br/>
            </form>
            <Dialog onClose = {handleClose} open = {openDialog}>
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