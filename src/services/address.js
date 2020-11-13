import fire from '../FirestoreConfig'
 
const fireDB =  fire.firestore();

const getAddressbyId = async (userId) => {
    let Address = [];
    await fireDB.collection("address").where("user_id", "==", userId).get()
    .then((snapShots) => {
        snapShots.docs.map((doc) => {
            Address.push({...doc.data(), id: doc.id})
        })
    })

    return Address;
}

const createAddress =  async (address) => {
    return await fireDB.collection("address").add(address);
}

const modifyAddress =  async (id, adress) => {
    return await fireDB.collection("address").doc(id).update(adress);
}

export { getAddressbyId, createAddress, modifyAddress };