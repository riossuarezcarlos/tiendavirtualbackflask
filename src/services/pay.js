import {URL_BACK_MP, FetchConf, FetchGet} from '../BackConfig';

const createPay =  async (data) => {  
    return await FetchConf(URL_BACK_MP, `crearPreferencia`, 'POST', data);  
}

export { createPay };
