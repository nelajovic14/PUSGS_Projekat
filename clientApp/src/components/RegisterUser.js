import { RegisterUser } from "../services/UserService";
import React,{useState,useRef} from "react";

export default function Register(){
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [Name,setName]=useState('');
    const [lastname,setLastname]=useState('');
    const [email,setEmail]=useState('');
    const [address,setAddress]=useState('');
    const [dateOfBirth,setDateOfBirth]=useState('');
    const [alertMessage,setAlert]=useState(<div></div>);
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

            
            console.log(dateInputRef.current.value)
            console.log(username+"/"+password+"/"+Name+"/"+email+"/"+address+"/"+dateInputRef.current.value+"/"+uloga.current.value)
            const values={Username:username,Password:password,NameLastname:Name,Email:email,Address:address,TypeOfUser:uloga.current.value,DateOfBirth:dateInputRef.current.value};
            const resp= await RegisterUser(values);
            console.log(resp);

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
                alert(usernameError)
            }
            
            if (!password) {
                passwordError = "Password field is required";
                alert(passwordError)
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

            if (nameError || passwordError || usernameError || lastnameError || birtdayError || emailError || addressError) {
                return false;
            }
            return true;
        }


    return(
        <div class="jumbotron text-center">
            <h3>Register new user:</h3><br/><br/>
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
        {alertMessage}
        </div>
    )
       
}