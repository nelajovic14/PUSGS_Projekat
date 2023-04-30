import React,{useState,useEffect} from "react";
import { GetUserRequest,Verificate,DeclineVer } from "../services/UserService";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

export default function UserRequest(props){
    const [users,setUsers]=useState([]);
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
    
    const getUsers=async ()=>{
        const resp=await GetUserRequest(config)
        console.log(resp);
        if(resp.data!=users)
        {
            setUsers(resp.data);
        }
    }


    useEffect(() =>{
        getUsers();

    },[])

    const verificateUser = async (User)=>{
        const resp2=await Verificate(User,config);
        console.log(resp2);
        if(resp2.data!=''){
            getUsers();
        }
        else{
            openDialogBox();
        }
    }

    const declineUser = async (User)=>{
        const resp2=await DeclineVer(User,config);
        console.log(resp2);
        getUsers();
    }

    const odobri= (e,element)=>{
        e.preventDefault()
        const User={username:element.username,email:element.email,id:element.id,nameLastname:element.nameLastname,dateOfBirth:element.dateOfBirth,address:element.address,typeOfUser:element.typeOfUser}
        verificateUser(User);
    }

    const odbij= (e,element)=>{
        e.preventDefault()
        const User={username:element.username,email:element.email,id:element.id,nameLastname:element.nameLastname,dateOfBirth:element.dateOfBirth,address:element.address,typeOfUser:element.typeOfUser}
        declineUser(User);
    }

    

    const elementi=users.map(element => <tr><td>
        {element.username}</td><td >{element.email}</td><td >
        {element.dateOfBirth}</td><td>{element.address}</td>
        <td>{element.image}</td>
        <td><input type={"button"} class="btn btn-link" onClick={(e)=>odobri(e,element)}  value={"Confirm"}></input></td>
        <td><input type={"button"} class="btn btn-link" onClick={(e)=>odbij(e,element)}  value={"Decline"}></input></td>
        </tr>);

    return(
        <div>
            <div class="container text-center">
                <div class="alert alert-warning"><strong><h1>Users</h1></strong></div>
                <table class="table table-bordered">
                    <tr>
                        <td ><b>Username</b></td>
                        <td><b>Email</b></td>
                        <td ><b>Date of birth</b></td>
                        <td><b>Address</b></td>
                        <td><b>Image</b></td>
                        <td><b>Confirm</b></td>
                        <td><b>Decline</b></td>
                        </tr>
                        {elementi}
            </table></div>
            <Dialog onClose = {handleClose} open = {openDialog}>
            <div class="p-5 text-center bg-image rounded-3" >
            <div class="mask">
                <div class="d-flex justify-content-center align-items-center h-100">
                <div class="text-black">
                    <h4 class="mb-3">You can not verficate this user!</h4>
                </div>
                </div>
            </div>
            </div>
         </Dialog>
            </div>
    )
}