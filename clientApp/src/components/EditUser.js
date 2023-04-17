import React,{useState,useEffect} from "react";
import {GetUser,EditUserPut} from '../services/UserService'

export default function EditUser(props){
    const [id,setId]=useState(-1);
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [Name,setName]=useState('');
    const [lastname,setLastname]=useState('');
    const [email,setEmail]=useState('');
    const [address,setAddress]=useState('');
    const [dateOfBirth,setDateOfBirth]=useState(new Date());
    const [alertMessage,setAlert]=useState(<div></div>);
    const config = {
        headers: {  Authorization: 'Bearer ' +  localStorage.getItem('token'),}
    };

    useEffect (async ()=>{
        
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
                alert(usernameError)
            }
            
           

            if (!Name) {
                nameError = "Name field is required";
                alert(nameError)
            }

            if (!lastname) {
                lastnameError = "Lastname field is required";
                alert(lastnameError)
            }

            if (!email) {
                emailError = "Email field is required";
                alert(emailError)
            }

            if (!address) {
                addressError = "Address field is required";
                alert(addressError)
            }

            if (nameError || usernameError || lastnameError || birtdayError || emailError || addressError) {
                return false;
            }
            return true;
        }

        const editovanje=async e=>{
            e.preventDefault();
            if(validate()){
                const EditUserDto={Id:id,Username:username,Password:password,NameLastname:Name+"/"+lastname,Email:email,Address:address,DateOfBirth:dateOfBirth} 
                const resp2=await EditUserPut(EditUserDto,config);
                if(resp2==null){
                    setAlert("Cant change! ERROR!")
                }
                else{
                    setAlert("YOU MAKE SOME CHANGES CORECTLY! :)")
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

    </form><br/>{alertMessage}
    </div>
    )
}