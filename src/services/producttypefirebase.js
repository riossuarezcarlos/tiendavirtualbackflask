import fire from '../FirestoreConfig'
 
const fireDB =  fire.firestore();
 

const getProductTypes= async () => {
    let ProductTypes = [];
    await fireDB.collection("producttype").get()
    .then((snapShots) => {
        snapShots.docs.map( (producttype) => {
            ProductTypes.push({...producttype.data(), id: producttype.id});
        } )
    })
 
    return ProductTypes;
}
 

const getProductTypesBySubCategory = async (subCategoryId) => {
    let ProductTypes = [];
    await fireDB.collection("producttype").where("subcategoryId","==",subCategoryId).get()
    .then((snapShots) => {
        snapShots.docs.map( (producttype) => 
            ProductTypes.push({...producttype.data(), id: producttype.id})
         )
    })
 
    return ProductTypes;
}
 

const createType = async (producttype) => {
    return await fireDB.collection("producttype").add(producttype);
}

const deleteTypeById = async (typeId) => {
    return await fireDB.collection("producttype").doc(typeId).delete();
}

export { getProductTypes, getProductTypesBySubCategory,deleteTypeById, createType};
 