import axios from 'axios'
//`${process.env.VUE_APP_BASE_URL}/login/`
export const GetOrders = async(id,config)=>{
    return await axios.get(`${process.env.REACT_APP_API_URL}/api/order/getForCustmer/${id}`,config);
}

export const GetOrdersToShow = async(id,config)=>{
    return await axios.get(`${process.env.REACT_APP_API_URL}/api/order/show/${id}`,config);
}

export const DeclineOrder = async(element,config)=>{
    return await axios.put(`${process.env.REACT_APP_API_URL}/api/order/decline`,element,config);
}

export const GetUserOrders = async(id,config)=>{
    return await axios.get(`${process.env.REACT_APP_API_URL}/api/order/getForUser/${id}`,config);
}

export const GetNewUserOrders = async(id,config)=>{
    return await axios.get(`${process.env.REACT_APP_API_URL}/api/order/getForUserNew/${id}`,config);
}


export const AddOrder = async(Order,config)=>{
    return await axios.post(`${process.env.REACT_APP_API_URL}/api/order/add`,Order,config);
}

export const GetAllOrders = async(config)=>{
    return await axios.get(`${process.env.REACT_APP_API_URL}/api/order`,config);
}