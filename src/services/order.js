import {URL_BACK_JS, FetchConf, FetchGet} from '../BackConfig';

const getOrderByUser = async (userId) => {
    return await FetchGet(URL_BACK_JS, `order/${userId}`); 
}
  
const getOrderById = async (orderId) => { 
    return await FetchGet(URL_BACK_JS, `orderporid/${orderId}`); 
}


const createOrder =  async (order) => {  
    return await FetchConf(URL_BACK_JS, `order`, 'POST', order);  
}

export { createOrder, getOrderByUser, getOrderById };