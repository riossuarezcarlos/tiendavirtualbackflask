import {URL_BACK_FLASK, FetchGet, FetchConf, FetchDel} from '../BackConfig';
import fire from '../FirestoreConfig'
 
const fireDB =  fire.firestore();
 
export const getProducts = async () => {
    return await FetchGet(URL_BACK_FLASK, `product`);
} 

export const getProductbyId = async (productId) => { 
    return await FetchGet(URL_BACK_FLASK, `product/${productId}`); 
}

export const searchProducts = async (producttypes, desde, hasta) => {
 
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


export const getProductsByLabel = async (labelCod) => {
    let products = [];
    await fireDB.collection("product").where("labelId","==",labelCod).limit(4).get()
    .then((snapShots) => {
        snapShots.docs.map( (product) => {
            products.push({...product.data(), id: product.id});
        } )
    }) 

    return products; 
}

export const createProduct = async (data) => {
    return await FetchConf(URL_BACK_FLASK, `product`, 'POST', data); 
}

export const updateProduct = async (data, productId) => {
    return await FetchConf(URL_BACK_FLASK, `product/${productId}`, 'PUT', data);
}

export const subirImagen = (imagen, refStorage) => {
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

export const deleteProduct = async (productId) => {
    return await FetchDel(URL_BACK_FLASK, `product/${productId}`, 'DELETE'); 
}
 