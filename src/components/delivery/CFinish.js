import React, { useState, useEffect, useContext } from 'react'; 
import { CarritoContext } from '../../context/carritoContext';
import Card from 'react-bootstrap/Card';
import '../css/CConfirmation.css';

import {createOrder} from '../../services/order';
import {createOrderDetail} from '../../services/orderdetail'; 
import {Link} from "react-router-dom";


export default function CFinish() {

    const { order, carrito, setOrderGen } = useContext(CarritoContext); 
    const [ myorder, setMyOrder] = useState([]);

    const showData = () =>{  
        setMyOrder(order);
    }
    
    const crearOrder = async () => {
        let fecha = Math.floor(Date.now() / 1000);
        let myorder = order;
        let orderId = '';
        console.log(order)
        let dataOrder = {
            "user_phone": order.user_phone,
            "user_name": order.user_name,
            "user_email": order.user_email,
            "userId": order.userId,
            "orderTotal": order.orderTotal,
            "orderDate": fecha,
            "card_year": order.card_year,
            "card_number": order.card_number,
            "card_name": order.card_name,
            "card_month": order.card_month,
            "card_ccv": order.card_ccv,
            "address_name": order.address_name,
            "address_reference": order.address_reference,
            "address_number": order.address_number,
            "order_detail" : []
        }
        
        let orderDetail = []
        carrito.map( async (car) => {
            let objDetail = {
                "productCant": car.productCant, 
                "productId": car.productId,
                "productTotal": car.productTotal,
                "productName": car.productName,
                "productImg": car.productImg
            }
            orderDetail.push(objDetail);
        }) 

        let objOrder = {...dataOrder, order_detail: orderDetail}
 
        let data = await createOrder(objOrder); 
        console.log(data);
    }

    useEffect( () => {
        showData();
    })

    return (
        <div className="d-flex justify-content-center">
            <div className="d-flex flex-column" style={{width: '600px'}}>

                    <div>
                        <h4 className="card-title">Revisar tu pedido</h4>
                    </div>
                
                    <div className="card d-flex justify-content-center flex-row">
                        <div className="card-body">
                            <h6 className="card-title">Datos del Usuario</h6>
                            <div className="form-group">
                                <p className="texto">{myorder.user_name}</p>
                                <p className="texto">{myorder.user_email}</p>
                                <p className="texto">{myorder.user_phone}</p>
                            </div> 
                            <h6 className="card-title">Datos de Entrega</h6>
                            <div className="form-group">
                                <p className="texto">{myorder.address_name}</p>
                                <p className="texto">{myorder.address_number}</p>
                                <p className="texto">{myorder.address_reference}</p>
                            </div> 
                        </div>
                        <div className="card-body">
                            <h6 className="card-title">Resumen del Pedido</h6>
                            <div className="form-group">
                                <table className="table"> 
                                    <tbody> 
                                        <tr>
                                            <th>SubTotal</th>
                                            <th className="textoI">{myorder.orderTotal}</th>
                                        </tr>
                                        <tr>
                                            <th>Costos de Envío</th>
                                            <th className="textoI">0.00</th>
                                        </tr>
                                        <tr>
                                            <th>Total</th>
                                            <th className="textoI">{myorder.orderTotal}</th>
                                        </tr>
                                    </tbody>
                                </table>
                            </div> 
                            <Link className="btn btn-primary btn-block" onClick={() => {crearOrder()}} to="/confirmation">Finalizar Compra</Link>
                        </div>
                    </div>          

                <div className="d-flex justify-content-center">
                    <div className="card mt-3"  style={{width: '600px'}}>
                        <div className="card-body">
                            <h6 className="card-title">Resumen de productos</h6>
                            <div className="form-group"> 
                            {
                                carrito.map((prod,i) => (
                                    <Card style={{ marginTop: '4px'}} key={i} className="d-flex justify-content-center flex-row">    
                                        <div className="d-flex align-items-center">
                                        <Card.Img variant="center" src={prod.productImg} alt="..." className="imgpopover" />
                                        </div>
                                        <Card.Body className="pt-1 pb-1 pl-2 pr-2 "> 
                                            <h5 className="marca">{prod.productMark}</h5> 
                                            <h5 className="texto">{prod.productName}</h5>
                                            <h5 className="texto">Precio: {prod.productPrice}</h5>
                                            <h5 className="texto">Cantidad:{prod.productCant}</h5>                    
                                        </Card.Body>
                                    </Card> 
                                ))
                            }   
                            </div> 
                        
                        </div>
                    </div>
                </div>    
            
            </div> 
         </div> 
    )
}
