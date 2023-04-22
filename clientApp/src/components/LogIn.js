import React,{useState} from "react";
import { LogIn } from "../services/UserService";
import * as ReactDOMClient from 'react-dom/client';
import Register from "./RegisterUser";
import MainPage from "./MainPage";
import image from "../img/black-friday-elements-assortment2.jpg"
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import  backImage  from "../img/3893666_81805.jpg";

export default function Login(){

    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [data,setData]=useState('');
    const [openDialog, handleDisplay] = React.useState(false);

    const handleClose = () => {
        handleDisplay(false);
    };

    const openDialogBox = () => {
        handleDisplay(true);
    };

    const handleInputChanges = e=>{
        const{name,value}=e.target
        if(name=="username"){
            setUsername(value);
        }
        if(name=="password"){
            setPassword(value);
        }
    }

        const login=async e=>{
            
            e.preventDefault();
            if(validate()){
                
                const values={Username:username,Password:password};
                const resp=await LogIn(values);
                console.log(resp);
                if(resp.data.logedIn==true){
                    localStorage.setItem('token',resp.data.token)
                    const container = document.getElementById('root');
                    const root = ReactDOMClient.createRoot(container);
                    root.render(<MainPage user={resp.data.user}></MainPage>);
                }
                else{
                    setData("Wrong username or password!")
                    openDialogBox();
                }
            }
        }
        let nameError = "";
        let passwordError = "";
        const validate=()=>{
            
            if (!username) {
                nameError = "Username field is required";
                setData(nameError)
                openDialogBox();
            }
            
            if (!password) {
                passwordError = "Password field is required";
                setData(passwordError)
                openDialogBox();
            }
            if (nameError || passwordError) {
                return false;
            }
            return true;
        }
        const register =e=>{
            e.preventDefault();
            const container = document.getElementById('root');
                const root = ReactDOMClient.createRoot(container);
                root.render(<Register></Register>)
        }

    return(
        <div class="jumbotron text-center" style={{backgroundImage:`url(${image})`, height:750}}>  
            <h2 class="bg-info">Please, log in :)</h2><br/><br/>
            <p >
        <form onSubmit={login} > 
            Username : &nbsp;<input type={"text"} name='username'  value={username} onChange={handleInputChanges}  ></input><br/><br/>
            
            Password : &nbsp;<input type={"password"} name='password' value={password} onChange={handleInputChanges}></input><br/><br/>
            
            <input type={"submit"} name='uloguj' value={"Log in"} onChange={handleInputChanges} class="btn btn-info"></input><br/>
        </form>
        <br/>
        <input type={"submit"} name='registruj' value={"Register"} onClick={register} class="btn btn-primary"></input><br/></p>
        <Dialog onClose = {handleClose} open = {openDialog}>
    <DialogTitle> LogiIn page </DialogTitle>
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
