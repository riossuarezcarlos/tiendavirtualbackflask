import {URL_BACK_FLASK, FetchGet, FetchConf, FetchDel} from '../BackConfig';

import fire from '../FirestoreConfig' 
const fireDB =  fire.firestore();
 

export const getProductTypes= async () => {
    return await FetchGet(URL_BACK_FLASK, `producttype`);
}
 
export const getProductTypesbyId= async (producttypeId) => {
    return await FetchGet(URL_BACK_FLASK, `producttype/${producttypeId}`);
}
 

export const getProductTypesBySubCategory = async (subCategoryId) => {
    let ProductTypes = [];
    await fireDB.collection("producttype").where("subcategoryId","==",subCategoryId).get()
    .then((snapShots) => {
        snapShots.docs.map( (producttype) => 
            ProductTypes.push({...producttype.data(), id: producttype.id})
         )
    })
 
    return ProductTypes;
}
 

export const createType = async (data) => {
    return await FetchConf(URL_BACK_FLASK, `producttype`, 'POST', data);
}

export const updateType = async (data, producttypeId) => {
    return await FetchConf(URL_BACK_FLASK, `producttype/${producttypeId}`, 'PUT', data);
}

export const deleteType = async (producttypeId) => {
    return await FetchDel(URL_BACK_FLASK, `producttype/${producttypeId}`, 'DELETE');
}