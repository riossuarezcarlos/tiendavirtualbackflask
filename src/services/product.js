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
 
    return await FetchGet(URL_BACK_FLASK, `productlabel/${labelCod}`); 
 
}

export const createProduct = async (data) => {
    return await FetchConf(URL_BACK_FLASK, `product`, 'POST', data); 
}

export const updateProduct = async (data, productId) => {
    return await FetchConf(URL_BACK_FLASK, `product/${productId}`, 'PUT', data);
}

export const subirImagen = async (imagen, name) => {


    var formdata = new FormData();
    formdata.append("image", imagen, name);
    
    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };
    
    const response = await fetch(URL_BACK_FLASK + "uploadimage", requestOptions);
    const content = await response.json();
    return content;
}

export const deleteProduct = async (productId) => {
    return await FetchDel(URL_BACK_FLASK, `product/${productId}`, 'DELETE'); 
}
 