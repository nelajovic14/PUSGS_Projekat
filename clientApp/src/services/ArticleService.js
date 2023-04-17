import axios from 'axios'

export const GetAllArticles = async(config)=>{
    return await axios.get(`https://localhost:44316/api/article`,config);
}