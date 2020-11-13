import fire from '../FirestoreConfig'
 
const fireDB =  fire.firestore();
 

const getSubCategories= async () => {
    let SubCategories = [];
    await fireDB.collection("subcategory").get()
    .then((snapShots) => {
        snapShots.docs.map( (subcategory) => {
            SubCategories.push({...subcategory.data(), id: subcategory.id});
        } )
    })
 
    return SubCategories;
}

const getSubCategoriesByCategory = async (categoryId) => {
    let SubCategories = [];
    await fireDB.collection("subcategory").where("categoryId","==",categoryId).get()
    .then((snapShots) => {
        snapShots.docs.map( (subcategory) => 
            SubCategories.push({...subcategory.data(), id: subcategory.id})
         )
    })
 
    return SubCategories;
}

const createSubcategory = async (subcategory) => {
    return await fireDB.collection("subcategory").add(subcategory);
}

const deleteSubCategoryById = async (categoryId) => {
    return await fireDB.collection("subcategory").doc(categoryId).delete();
}

  
export { 
    getSubCategories, 
    createSubcategory, 
    getSubCategoriesByCategory,
    deleteSubCategoryById
}