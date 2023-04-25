import React,{useState,useEffect} from "react";
import {GetUser,EditUserPut} from '../services/UserService'
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import  backImage  from "../img/3893666_81805.jpg";

export default function EditUser(props){
    const [id,setId]=useState(-1);
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [Name,setName]=useState('');
    const [lastname,setLastname]=useState('');
    const [email,setEmail]=useState('');
    const [address,setAddress]=useState('');
    const [dateOfBirth,setDateOfBirth]=useState(new Date());
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

    const fillFields=async (e)=>{
        const response=await GetUser(props.user.id,config);
        const user=response.data;
        console.log(user);
        setUsername(user.username);
        
        setAddress(user.address);
        setEmail(user.email);
        setId(user.id);
        console.log(user.dateOfBirth);
        console.log();
        var date=(user.dateOfBirth+"").split('T')[0];
        setDateOfBirth(date);
        const names=user.nameLastname+"";
        const words=names.split('/');
        
        setName(words[0]);
        setLastname(words[1]);
    }

    useEffect (()=>{
        
        fillFields();
       
    },[]);



    const handleInputChanges = e=>{
        var{name,value}=e.target
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

        if(name=="dateOfBirth"){
            setDateOfBirth(value);
        }
    }

    let usernameError = "";
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

            if (nameError || usernameError || lastnameError || birtdayError || emailError || addressError) {
                return false;
            }
            return true;
        }

        const editovanje=async e=>{
            e.preventDefault();
            if(validate()){
                const EditUserDto={Id:id,Username:username,Password:password,NameLastname:Name+"/"+lastname,Email:email,Address:address,DateOfBirth:dateOfBirth,typeOfUser:props.user.typeOfUser} 
                const resp2=await EditUserPut(EditUserDto,config);
                if(resp2==''){
                    setData("Can not change data!")
                    openDialogBox();
                }
                else{
                    setData("You changed your data!")
                    openDialogBox();
                }
            }
        }

    return(
        <div class="jumbotron text-center">
            <h3>Change information about you : </h3><br/>
        <form onSubmit={editovanje}>                                  
            Username : <input type={"text"} name='username' value={username} onChange={handleInputChanges}  ></input><br/><br/>
            
            Password: <input type={"password"} name='password' value={password} onChange={handleInputChanges}></input><br/><br/>
            
            Name : <input type={"text"} name='name' value={Name} onChange={handleInputChanges}  ></input><br/><br/>

            Lastname : <input type={"text"} name='lastname' value={lastname} onChange={handleInputChanges}  ></input><br/><br/>

            Email : <input type={"text"} name='email' value={email} onChange={handleInputChanges}  ></input><br/><br/>

            Date of Birth : <input type={"date"} name="dateOfBirth"  data-date-format="MM/DD/YYYY" value={dateOfBirth} onChange={handleInputChanges}></input><br/><br/>

            Address : <input type={"text"} name="address" value={address} onChange={handleInputChanges} ></input><br/><br/>
        <input type={"submit"} name='promeni' value={"Change"} ></input><br/>

    </form><br/>
    <Dialog onClose = {handleClose} open = {openDialog}>
    <DialogTitle> Edit information </DialogTitle>
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