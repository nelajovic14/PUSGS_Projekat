import axios from 'axios'

export const AddComment=async (comment,config)=>{
    return await axios.post(`${process.env.REACT_APP_API_URL}/api/comments/add`,comment,config)
}

export const GetAllCommentsForArticle=async (id,config)=>{
    return await axios.get(`${process.env.REACT_APP_API_URL}/api/comments/forarticle/${id}`,config)
}

export const GetRate=async (id,config)=>{
    return await axios.get(`${process.env.REACT_APP_API_URL}/api/comments/getrate/${id}`,config)
}