import axios from 'axios'
//`${process.env.VUE_APP_BASE_URL}/login/`
export const GetOrders = async(id,config)=>{
    return await axios.get(`https://localhost:44316/api/order/getold/${id}`,config);
}

export const DeclineOrder = async(element,config)=>{
    return await axios.put(`https://localhost:44316/api/order/decline`,element,config);
}

export const GetUserOrders = async(id,config)=>{
    return await axios.get(`https://localhost:44316/api/order/getForUser/${id}`,config);
}

export const GetNewUserOrders = async(id,config)=>{
    return await axios.get(`https://localhost:44316/api/order/getForUserNew/${id}`,config);
}

export const AddOrder = async(Order,config)=>{
    return await axios.post(`https://localhost:44316/api/order/add`,Order,config);
}
