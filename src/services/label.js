import {URL_BACK_FLASK, FetchGet, FetchConf, FetchDel} from '../BackConfig';
 
export const getLabels = async () => { 
    return await FetchGet(URL_BACK_FLASK, `label`);  
}

export const getLabelbyId = async (labelId) => {
    return await FetchGet(URL_BACK_FLASK, `label/${labelId}`);  
}

export const createLabel = async (data) => {
    return await FetchConf(URL_BACK_FLASK, `label`, 'POST', data); 
}

export const updateLabel = async (data, labelId) => {
    return await FetchConf(URL_BACK_FLASK, `label/${labelId}`, 'PUT', data); 
}


export const deleteLabel = async (labelId) => {
    return await FetchDel(URL_BACK_FLASK, `label/${labelId}`, 'DELETE'); 
}
