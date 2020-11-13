import fire from '../FirestoreConfig'
 
const fireDB =  fire.firestore();
 
const getProducts = async () => {
    let products = [];
    await fireDB.collection("product").get()
    .then((snapShots) => {
        snapShots.docs.map( (product) => {
            products.push({...product.data(), id: product.id});
        } )
    })
    return products;
}


const getProductbyId = async (productId) => { 
    let products = [];
    await fireDB.collection("product").doc(productId).get()
    .then((snapshot) => {  
        [snapshot].map((doc) => {
            products.push({...doc.data(), id: doc.id}); 
        })        
    }) 
    
    return products;
}

const searchProducts = async (producttypes, desde, hasta) => {
 
    let products = [];
  
    await fireDB.collection("product")
    .where("producttypeId","in",producttypes)
    .where("productPrice",">=", parseFloat(desde))
    .where("productPrice","<=", parseFloat(hasta))
    .get()
    .then((snapShots) => {
        snapShots.docs.map( (product) => { 
            products.push({...product.data(), id: product.id});
        } )
    }) 
    return products; 
}


const getProductsByLabel = async (labelCod) => {
    let products = [];
    await fireDB.collection("product").where("labelId","==",labelCod).limit(4).get()
    .then((snapShots) => {
        snapShots.docs.map( (product) => {
            products.push({...product.data(), id: product.id});
        } )
    }) 

    return products; 
}

const createProduct = async (product) => {
    return await fireDB.collection("product").add(product);
}

const subirImagen = (imagen, refStorage) => {
    return new Promise((resolve, reject) => {
        const tarea = refStorage.put(imagen);

        tarea.on(
            "state_changed", 
            (snapshot) => {}, 
            (error) => {
                reject(error);
            },
            //esto se ejecuta al tener exito subiendo el archivo
            () => {
                tarea.snapshot.ref.getDownloadURL()
                .then((urlImagen) => resolve(urlImagen))
                .catch((error) => reject(error))
            }
        )
    })
}

const deleteProductById = async (productId) => {
    return await fireDB.collection("product").doc(productId).delete();
}

export { 
    getProducts, 
    getProductbyId, 
    getProductsByLabel, 
    createProduct, 
    searchProducts, 
    subirImagen,
    deleteProductById
}