import axios from 'axios'

export const GetOrders = async(id,config)=>{
    return await axios.get(`https://localhost:44316/api/order/getold/${id}`,config);
}