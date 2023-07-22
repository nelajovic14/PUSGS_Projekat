import React,{useState} from "react";
import { LogIn,LogInExternal } from "../services/UserService";
import * as ReactDOMClient from 'react-dom/client';
import Register from "./RegisterUser";
import MainPage from "./MainPage";
import image from "../img/black-friday-elements-assortment2.jpg"
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import  backImage  from "../img/3893666_81805.jpg";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";

export default function Login(){

    gapi.load("client:auth2", () => {
        gapi.client.init({
          clientId:
            "204473720538-b586qupb74fdgq0vdccc8vojnhm462o9.apps.googleusercontent.com",
          plugin_name: "chat",
        });
      });
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [data,setData]=useState('');
    const [openDialog, handleDisplay] = React.useState(false);


    const responseGoogle = (response) => {
        console.log(response);
        logExteranal(response);
    }

    const logExteranal =async (response)=>{
        const LogObject={provider:"GOOGLE",idToken:response.tokenId}
        const logresp=await LogInExternal(LogObject);
        if(logresp.data.logedIn==true){
            localStorage.setItem('token'+logresp.data.user.id,logresp.data.token)
            const container = document.getElementById('root');
            const root = ReactDOMClient.createRoot(container);
            root.render(<MainPage user={logresp.data.user}></MainPage>);
        }
        else{
            setData("Pogrešno ste uneli korisničko ime ili lozinku!")
            openDialogBox();
        }
    }

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
                if(resp.data.logedIn==true){
                    localStorage.setItem('token'+resp.data.user.id,resp.data.token)
                    const container = document.getElementById('root');
                    const root = ReactDOMClient.createRoot(container);
                    root.render(<MainPage user={resp.data.user}></MainPage>);
                }
                else{
                    setData("Pogrešno ste uneli korisničko ime ili lozinku!")
                    openDialogBox();
                }
            }
        }
        
        let nameError = "";
        let passwordError = "";
        const validate=()=>{
            
            if (!username) {
                nameError = "Polje za korisničko ime je obavezno!";
                setData(nameError)
                openDialogBox();
            }
            
            if (!password) {
                passwordError = "Polje za lozinku je obavezno!";
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
            <h2 class="bg-info">Ulogujte se :)</h2><br/>
            Molimo Vas, prijavite se kako bi pristupili aplikaciji :)<br/><br/>
            <p >
        <form onSubmit={login} > 
            Korisničko ime : &nbsp;<input type={"text"} name='username'  value={username} onChange={handleInputChanges}  ></input><br/><br/>
            
            Lozinka : &nbsp;<input type={"password"} name='password' value={password} onChange={handleInputChanges}></input><br/><br/>
            
            <input type={"submit"} name='uloguj' value={"Uloguj se"} onChange={handleInputChanges} class="btn btn-info"></input><br/>
        </form>
        <br/>
        <GoogleLogin
        clientId="204473720538-b586qupb74fdgq0vdccc8vojnhm462o9"
        buttonText="Logovanje putem google naloga"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
        scope="profile"
        />
        <br/><br/>
        
        <input type={"submit"} name='registruj' value={"Registruj se"} onClick={register} class="btn btn-primary"></input><br/></p>
        <Dialog onClose = {handleClose} open = {openDialog}>
        <DialogTitle> Logovanje </DialogTitle>
            <div class="p-5 text-center bg-image rounded-3" style={{ backgroundColor: "tomato"}}>
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
