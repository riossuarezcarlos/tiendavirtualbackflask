import fire from '../FirestoreConfig'
 
const fireDB =  fire.firestore();

const createOrderDetail =  async (orderDetail) => {
    return await fireDB.collection("orderdetail").add(orderDetail);
}



const getOrderDetailByOrder = async (orderId) => {
    let products = [];
    await fireDB.collection("orderdetail").where("orderId","==",orderId).get()
    .then((snapShots) => {
        snapShots.docs.map( (orderDetail) => {
            products.push({...orderDetail.data(), id: orderDetail.id});
        } )
    }) 

    return products; 
}


export { createOrderDetail, getOrderDetailByOrder };