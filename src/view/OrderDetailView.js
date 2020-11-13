import React, { useEffect, useState} from 'react';
import COrder from '../components/COrder';
import {getOrderById} from '../services/order';

let userIdFire = '';

export default function OrderDetailView(props) {

    //recuperar el Id
    const orderId = props.match.params.id;

    const [orders, setOrders] = useState([]);
  
      const getData = async () => {
        let dataOrder = await getOrderById(orderId); 
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
                        </div> 
                        <div className="card d-flex flex-row">
                            <div style={{marginLeft:'10px', marginRight: '30px'}}>
                                <h5>Datos del usuario</h5>
                                <p>{order.user_name}</p>
                                <p>{order.user_email}</p>
                                <p>{order.user_phone}</p>  
                            </div> 
                            <div>
                                <h5>Datos de la entrega</h5>
                                <p>{order.address_name}</p>
                                <p>{order.address_number}</p>
                                <p>{order.address_reference}</p> 
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
