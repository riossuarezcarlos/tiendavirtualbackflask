import {FetchGet, FetchConf, FetchDel} from '../BackConfig';

import fire from '../FirestoreConfig' 
const fireDB =  fire.firestore();
 

export const getProductTypes= async () => {
    return await FetchGet(`producttype`);
}
 
export const getProductTypesbyId= async (producttypeId) => {
    return await FetchGet(`producttype/${producttypeId}`);
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
    return await FetchConf(`producttype`, 'POST', data);
}

export const updateType = async (data, producttypeId) => {
    return await FetchConf(`producttype/${producttypeId}`, 'PUT', data);
}

export const deleteType = async (producttypeId) => {
    return await FetchDel(`producttype/${producttypeId}`, 'DELETE');
}