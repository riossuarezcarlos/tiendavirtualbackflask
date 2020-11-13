import fire from '../FirestoreConfig'
 
const fireDB =  fire.firestore();

const getCategories = async () => {
    let Categories = [];
    await fireDB.collection("category").get()
    .then((snapShots) => {
        snapShots.docs.map( (category) => {
            Categories.push({...category.data(), id: category.id});
        } )
    })

    return Categories;
}

const createCategory = async (category) => {
    return await fireDB.collection("category").add(category);
}

const deleteCategoryById = async (categoryId) => {
    return await fireDB.collection("category").doc(categoryId).delete();
}


export { 
    getCategories, 
    createCategory,
    deleteCategoryById 
 };