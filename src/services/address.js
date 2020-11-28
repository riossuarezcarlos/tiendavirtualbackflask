import {URL_BACK_DJANGO, FetchGet, FetchConf, FetchDel} from '../BackConfig';

import fire from '../FirestoreConfig'
 
const fireDB =  fire.firestore();

export const getAddressbyId = async (userId) => {
    let Address = [];
    await fireDB.collection("address").where("user_id", "==", userId).get()
    .then((snapShots) => {
        snapShots.docs.map((doc) => {
            Address.push({...doc.data(), id: doc.id})
        })
    })

    return Address;
}


export const getAddress = async (userId)=> {
    return await FetchGet(URL_BACK_DJANGO, `direccionu/${userId}`);
}

export const createAddress =  async (data) => {
    return await FetchConf(URL_BACK_DJANGO, `direccion`, 'POST', data);
}

export const modifyAddress =  async (data, adressId) => {
    return await FetchConf(URL_BACK_DJANGO, `direccion/${adressId}`, 'PUT', data);
}
