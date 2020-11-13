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

const createUser =  async (user) => {
    return await fireDB.collection("user").add(user);
}

const modifyUser =  async (id, user) => {
    console.log("id", id);
    return await fireDB.collection("user").doc(id).update(user);
}

export { getUserbyId, createUser, modifyUser };