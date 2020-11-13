import React, { useState, useEffect, useContext } from 'react';
import {Link} from "react-router-dom" ;
import { CarritoContext } from '../context/carritoContext'; 

export default function CarritoView() {

    const { carrito, eliminarProducto, setOrderGen} = useContext(CarritoContext); 
    const [miCarrito, setMiCarrito] = useState([]);  
    const [ subTotal, setSubTotal] = useState([]);  

    const calcularTotal = () => { 
        let sub = 0;
        miCarrito.forEach((car) => { 
            sub += car.productTotal;
        }) 
        sub = redondear(sub);
        setSubTotal(sub);
        setOrderGen('orderTotal', sub);
    }

    const eliminarDelCarrito = (e, product) => { 
        e.preventDefault(); 
        eliminarProducto(product);  
    }

    const configurarCarrito = () => {
        setMiCarrito(carrito);
        calcularTotal();
    } 

    const redondear = (num) => {
        return parseFloat(num).toFixed(2);
    }

    useEffect(() => { 
        calcularTotal();
    }, [miCarrito])

    useEffect(() => {
        configurarCarrito(); 
        calcularTotal();
    }, [carrito])

    return (
        <div style={{marginTop: '5rem', marginBottom: '1rem'}}>
            <h1>Mi Carrito</h1>
            <table className = "table">
            <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Precio Unitario</th>
                        <th>Cantidad</th>
                        <th>Precio Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        miCarrito.map(
                            (product,i) => (
                                <tr key={i}>
                                    <td>{product.productName}</td>
                                    <td>{redondear(product.productPrice)}</td>
                                    <td>{product.productCant}</td>
                                    <td>{redondear(product.productTotal)}</td>
                                    <td>  
                                        <button className="btn btn-outline-danger btn-sm" onClick={(e) => {eliminarDelCarrito(e, product)}}>
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>

            <div className="d-flex justify-content-center">
                <table className="table" style={{ width: '300px'}} > 
                    <tbody> 
                        <tr>
                            <th>SubTotal</th>
                            <th style={{ textAlign: 'right' }}>{subTotal}</th>
                        </tr>
                        <tr>
                            <th>Total</th>
                            <th style={{ textAlign: 'right' }}>{subTotal}</th>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="d-flex justify-content-center">
                <Link style={{ width: '300px'}} className="btn btn-primary" to="/sale">Confirmar Compra</Link>
            </div>
        </div>
    )
}
