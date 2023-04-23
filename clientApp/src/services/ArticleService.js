import axios from 'axios'

export const GetAllArticles = async(config)=>{
    return await axios.get(`https://localhost:44316/api/article`,config);
}

export const GetAllUserArticles = async(id,config)=>{
    return await axios.get(`https://localhost:44316/api/article/getAllFromUser/${id}`,config);
}

export const DeleteArticle=async (id,config)=>{
    return await axios.delete(`https://localhost:44316/api/article/${id}`,config)
}

export const AddArticle=async (Article,config)=>{
    return await axios.post(`https://localhost:44316/api/article/add`,Article,config)
}

export const EditArticle=async (Article,config)=>{
    return await axios.put(`https://localhost:44316/api/article`,Article,config)
}