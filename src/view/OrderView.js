import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../context/authContext';
import COrder from '../components/COrder';
import { getUser } from '../services/user';
import {getOrderByUser} from '../services/order';
import { Link } from 'react-router-dom';

export default function OrderView() {
    const { user } = useContext(AuthContext);

    const [orders, setOrders] = useState([]);
   
      const getData = async () => {
        let dataUser = await getUser(user.tokens.acceso); 
        let dataOrder = await getOrderByUser(dataUser.usuId);
        console.log("OrderView", dataOrder)
        setOrders(dataOrder); 
      } 

      useEffect(() => {
          getData();
      }, [])

    return (
        <div className="d-flex justify-content-center">
            <div style={{width: '800px', marginTop: '5rem', marginBottom: '1rem'}}>
                <h2>Mis Pedidos</h2>
                {
                    orders.map((order, i) => (
                        <div className="mt-4" key={i}>
                            <div  className="card cabecera">
                                <div className="m-2 general">
                                    Pedido N° {order.id}    |   Fecha de pedido {order.orderDate}| Total {order.orderTotal}
                                </div>
                                <div className="m-2"> 
                                    <Link className="btn btn-outline-primary mr-4" to={`/orderdetail/${order._id}`}>Ver Pedido</Link> 
                                </div>
                            </div> 
                            <COrder key={i} order={order}/>
                        </div>
                        
                    ))
                }
                
            </div>
        </div>
    )
}
