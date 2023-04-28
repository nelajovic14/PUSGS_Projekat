import axios from 'axios'
const serverUrl = process.env.API_URL;

export const LogIn = async(UserLoginDto)=>{
    return await axios.post(`${process.env.REACT_APP_API_URL}/api/users/login`,UserLoginDto);
}

export const LogInExternal = async(UserLoginDto)=>{
    return await axios.post(`${process.env.REACT_APP_API_URL}/api/users/loginExternal`,UserLoginDto);
}

export const getImage2 =(id)=>{
    fetch(`${process.env.REACT_APP_API_URL}/api/users/images/${id}`)
  .then(response => {
    if (response.ok) {
      return response.blob();
    }
    throw new Error('Network response was not ok');
  })
  .then(imageBlob => {
    const url = URL.createObjectURL(imageBlob);
    //setImageUrl(url);
    console.log(url);
    localStorage.setItem('url'+id,url);
  })
  .catch(error => {
    console.error('Error fetching image', error);
    return "";
  });
};

export const RegisterUser = async(UserDto)=>{
    return await axios.post(`${process.env.REACT_APP_API_URL}/api/users/register`,UserDto);
}

export const AddImage = async(File,id)=>{
    return await axios.post(`${process.env.REACT_APP_API_URL}/api/users/images/${id}`,File);
}

export const GetImage = async(id)=>{
    return await axios.get(`${process.env.REACT_APP_API_URL}/api/users/images/${id}`);
}

export const GetUser=async(id,config)=>{
    return await axios.get(`${process.env.REACT_APP_API_URL}/api/users/${id}`,config);
}

export const EditUserPut=async(UserEditDto,config)=>{
    return await axios.put(`${process.env.REACT_APP_API_URL}/api/users/edit`,UserEditDto,config)
}

export const GetUserRequest=async(config)=>{
    return await axios.get(`${process.env.REACT_APP_API_URL}/api/users/getRequest`,config);
}

export const Verificate = async(UserDto,config)=>{
    return await axios.put(`${process.env.REACT_APP_API_URL}/api/users/verificate`,UserDto,config);
}

export const DeclineVer = async(User,config)=>{
    return await axios.post(`${process.env.REACT_APP_API_URL}/api/users/decline`,User,config);
}