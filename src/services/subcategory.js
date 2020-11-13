import {FetchGet, FetchConf, FetchDel} from '../BackConfig';
import fire from '../FirestoreConfig'
 
const fireDB =  fire.firestore();
 
 
export const getSubCategories= async () => {
    return await FetchGet(`subcategory`);
}

export const getSubCategoriesbyId= async (subcategoryId) => {
    return await FetchGet(`subcategory/${subcategoryId}`);
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
    return await FetchConf(`subcategory`, 'POST', data);
}

export const updateSubcategory = async (data, subcategoryId) => {
    return await FetchConf(`subcategory/${subcategoryId}`, 'PUT', data);
}

export const deleteSubCategory = async (subcategoryId) => {
    return await FetchDel(`subcategory/${subcategoryId}`, 'DELETE');
}

   