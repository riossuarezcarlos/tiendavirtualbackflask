import fire from '../FirestoreConfig'
 
const fireDB =  fire.firestore();

const getOrderByUser = async (userId) => {
    let Orders = [];
    await fireDB.collection("order").where("userId","==",userId).get()
    .then((snapShots) => {
        snapShots.docs.map( (order) => { 
            Orders.push({...order.data(), id: order.id});
        } )
    }) 

    return Orders; 
}
  
const getOrderById = async (orderId) => { 
    let Orders = [];
    await fireDB.collection("order").doc(orderId).get()
    .then((snapshot) => {  
        [snapshot].map((doc) => {
            Orders.push({...doc.data(), id: doc.id}); 
        })        
    }) 
    
    return Orders;
}


const createOrder =  async (order) => {
    return await fireDB.collection("order").add(order);
}

export { createOrder, getOrderByUser, getOrderById };