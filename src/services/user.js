import {URL_BACK_DJANGO, FetchGetToken, FetchConf, FetchConfToken} from '../BackConfig';

import fire from '../FirestoreConfig'
 
const fireDB =  fire.firestore();

const getUserbyId = async (userId) => {
    let Users = [];
    await fireDB.collection("user").where("user_fireid", "==", userId).get()
    .then((snapShots) => {
        snapShots.docs.map((doc) => {
            Users.push({...doc.data(), id: doc.id})
        })
    })

    return Users;
}

export const getUser = async (token) => {
    return await FetchGetToken(URL_BACK_DJANGO, 'perfil', token);
}
   
export const createUser = async (data) => { 
    return await FetchConf(URL_BACK_DJANGO, `registro`, 'POST', data); 
}

export const login = async(data) => {
    return await FetchConf(URL_BACK_DJANGO, 'login', 'POST', data);
}

export const logout = async(data, token) => {
    return await FetchConfToken(URL_BACK_DJANGO, 'logout', 'POST', data, token);
}
  
export const modifyUser = async (data, token) => {
    return await FetchConfToken(URL_BACK_DJANGO, 'perfil', 'PUT', data, token);
}
  
export { getUserbyId };