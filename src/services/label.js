import {FetchGet, FetchConf, FetchDel} from '../BackConfig';
 
export const getLabels = async () => { 
    return await FetchGet(`label`);  
}

export const getLabelbyId = async (labelId) => {
    return await FetchGet(`label/${labelId}`);  
}

export const createLabel = async (data) => {
    return await FetchConf(`label`, 'POST', data); 
}

export const updateLabel = async (data, labelId) => {
    return await FetchConf(`label/${labelId}`, 'PUT', data); 
}


export const deleteLabel = async (labelId) => {
    return await FetchDel(`label/${labelId}`, 'DELETE'); 
}
