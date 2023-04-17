import axios from 'axios'

export const LogIn = async(UserLoginDto)=>{
    return await axios.post(`https://localhost:44316/api/users/login`,UserLoginDto);
}

export const RegisterUser = async(UserDto)=>{
    return await axios.post(`https://localhost:44316/api/users/register`,UserDto);
}

export const GetUser=async(id,config)=>{
    return await axios.get(`https://localhost:44316/api/users/${id}`,config);
}

export const EditUserPut=async(UserEditDto,config)=>{
    return await axios.put(`https://localhost:44316/api/users/edit`,UserEditDto,config)
}