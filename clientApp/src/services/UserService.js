import axios from 'axios'

export const LogIn = async(UserLoginDto)=>{
    return await axios.post("https://localhost:44316"+"/api/users/login",UserLoginDto);
}

export const RegisterUser = async(UserDto)=>{
    return await axios.post("https://localhost:44316"+"/api/users/register",UserDto);
}