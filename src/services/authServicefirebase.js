import fire from '../FirestoreConfig'
 

const ingresar = (email, password) => {
    return new Promise((resolve, reject) => {
        fire.auth().signInWithEmailAndPassword(email, password)
        .then((u) => {
            resolve(u.user)
        })
        .catch(error => {
            reject(`Error al logear usuario ${error}`);
        })
    })
}


const salir = () => {
    return new Promise ((resolve, reject) => {
      fire.auth().signOut().then(()=>{
        resolve("El usuario se deslogueo");
      }).catch((error) => {
        reject(error);
      });
    })
  }


export { ingresar, salir }