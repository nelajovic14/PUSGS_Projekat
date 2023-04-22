import { RegisterUser } from "../services/UserService";
import React,{useState,useRef} from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import  backImage  from "../img/3893666_81805.jpg";

export default function Register(){
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [Name,setName]=useState('');
    const [lastname,setLastname]=useState('');
    const [email,setEmail]=useState('');
    const [address,setAddress]=useState('');
    const [dateOfBirth,setDateOfBirth]=useState('');
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
        if(name=="name"){
            setName(value);
        }
        if(name=="lastname"){
            setLastname(value);
        }
        if(name=="email"){
            setEmail(value);
        }
        
        if(name=="address"){
            setAddress(value);
        }
        if(name=="uloga"){
            setAddress(value);
        }
    }
    const uloga=useRef();
    const dateInputRef = useRef(null);
    const register=async e=>{
        
        e.preventDefault();
        if(validate()){

           const values={Username:username,Password:password,NameLastname:Name+"/"+lastname,Email:email,Address:address,TypeOfUser:uloga.current.value,DateOfBirth:dateInputRef.current.value};
            const resp= await RegisterUser(values);
            console.log(resp);
            if(resp.data!=''){
                if(uloga.current.value=="PRODAVAC"){
                    setData("You send a request for registration!")
                    openDialogBox();
                }
                else{
                    setData("You are registrated!")
                    openDialogBox();
                }
            }
            else{
                setData("Person with this username or email already exists!")
                openDialogBox();
            }

        }
    }

        let usernameError = "";
        let passwordError = "";
        let nameError="";
        let lastnameError="";
        let addressError="";
        let birtdayError="";
        let emailError="";

        const validate=()=>{
            
            if (!username) {
                usernameError = "Username field is required";
                setData(usernameError);
                openDialogBox();
            }
            
            else if (!password) {
                passwordError = "Password field is required";
                setData(passwordError);
                openDialogBox();
            }

            else if (!Name) {
                nameError = "Name field is required";
                setData(nameError);
                openDialogBox();
            }

            else if (!lastname) {
                lastnameError = "Lastname field is required";
                setData(lastnameError);
                openDialogBox();
            }

            else if (!email) {
                emailError = "Email field is required";
                setData(emailError);
                openDialogBox();
            }

            else if (!address) {
                addressError = "Address field is required";
                setData(addressError);
                openDialogBox();
            }

            if (nameError || passwordError || usernameError || lastnameError || birtdayError || emailError || addressError) {
                return false;
            }
            return true;
        }


    return(
        <div class="jumbotron text-center">
            <h3 class="bg-info">Register new user:</h3><br/><br/>
        <form onSubmit={register}> 
            Username : <input type={"text"} name='username' value={username} onChange={handleInputChanges}  ></input><br/><br/>
            
            Password: <input type={"password"} name='password' value={password} onChange={handleInputChanges}></input><br/><br/>
            
            Name : <input type={"text"} name='name' value={Name} onChange={handleInputChanges}  ></input><br/><br/>

            Lastname : <input type={"text"} name='lastname' value={lastname} onChange={handleInputChanges}  ></input><br/><br/>

            Email : <input type={"text"} name='email' value={email} onChange={handleInputChanges}  ></input><br/><br/>

            Date of Birth : <input type={"date"} name="date" ref={dateInputRef}></input><br/><br/>

            Address : <input type={"text"} name="address" value={address} onChange={handleInputChanges} ></input><br/><br/>

            Role : <select ref={uloga} >
                <option value={'KUPAC'}>KUPAC</option>
                <option value={'PRODAVAC'}>PRODAVAC</option>
            </select><br/><br/>

            <input type={"submit"} name='registruj' value={"Register"} onChange={handleInputChanges}></input><br/>
        </form>
        <br/>
        <Dialog onClose = {handleClose} open = {openDialog}>
            <DialogTitle> Registration </DialogTitle>
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