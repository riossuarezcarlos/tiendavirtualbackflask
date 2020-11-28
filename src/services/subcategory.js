import {URL_BACK_FLASK, FetchGet, FetchConf, FetchDel} from '../BackConfig';
import fire from '../FirestoreConfig'
 
const fireDB =  fire.firestore();
 
 
export const getSubCategories= async () => {
    return await FetchGet(URL_BACK_FLASK, `subcategory`);
}

export const getSubCategoriesbyId= async (subcategoryId) => {
    return await FetchGet(URL_BACK_FLASK, `subcategory/${subcategoryId}`);
}

export const getSubCategoriesByCategory = async (categoryId) => {
    let SubCategories = [];
    await fireDB.collection("subcategory").where("categoryId","==",categoryId).get()
    .then((snapShots) => {
        snapShots.docs.map( (subcategory) => 
            SubCategories.push({...subcategory.data(), id: subcategory.id})
         )
    })
 
    return SubCategories;
}

export const createSubcategory = async (data) => {
    return await FetchConf(URL_BACK_FLASK, `subcategory`, 'POST', data);
}

export const updateSubcategory = async (data, subcategoryId) => {
    return await FetchConf(URL_BACK_FLASK, `subcategory/${subcategoryId}`, 'PUT', data);
}

export const deleteSubCategory = async (subcategoryId) => {
    return await FetchDel(URL_BACK_FLASK, `subcategory/${subcategoryId}`, 'DELETE');
}

   