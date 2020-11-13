import React, {useContext, useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import { CarritoContext } from '../context/carritoContext';
import '../components/css/CConfirmation.css'; 

export default function ConfirmationView() {

    const { order, limpiarCarrito, limpiarOrder } = useContext(CarritoContext); 
  
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState(''); 
    const [total, setTotal] = useState(0);

    const getData = () =>{  
    
        setName(order.user_name);
        setEmail(order.user_email); 
        setTotal(order.orderTotal);
        setAddress(order.address_name);         

        limpiarOrder();
        limpiarCarrito();
    }
  
    useEffect(() => {
        getData();
    }, [])
 
    return (
        <div className="d-flex justify-content-center">
            <div style={{width: '600px', marginTop: '5rem', marginBottom: '1rem'}}>

            <div className="card mt-3">
                <div className="d-flex justify-content-center clogo">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/e/e0/Check_green_icon.svg" alt="..." className="confirmation"/>
                </div>
                <div className="card-body">
                    <h3 className="card-title">
                        Gracias por su pedido!
                    </h3>

                    <div>
                        <h5>Hola {name}</h5>
                        <p>Gracias por comprar con nosotros. Te enviaremos una confirmación a {email} cuando tus artículos se envíen.</p>
                    </div>
  
                    <div>
                        <h5>Enviar a</h5>
                        <p className="texto">{name}</p>
                        <p className="texto">{address}</p>
                    </div>
 
                    <div className="form-group m-4">
                        <table className="table"> 
                            <tbody> 
                                <tr>
                                    <th className="texto">SubTotal</th>
                                    <th className="textoI">{total}</th>
                                </tr>
                                <tr>
                                    <th className="texto">Costos de Envío</th>
                                    <th className="textoI">0.00</th>
                                </tr>
                                <tr>
                                    <th className="texto">Total</th>
                                    <th className="textoI">{total}</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>  

                    <div>
                        <p>Esperamos volver a verte pronto.</p>
                    </div>

                    <Link className="btn btn-primary btn-block" to="/home">Seguir Comprando</Link>
                    
                </div>
            </div>

            <div className="d-flex justify-content-center clogo">
                <img src="https://riossuarezcarlos.github.io/proyectogrupo4/src/img/logo.png" alt="..."  className="logo"/> 
            </div>

            </div>
        </div>
    )
}
