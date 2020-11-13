import React, { useContext, useState } from 'react'
import { CarritoContext } from '../context/carritoContext'
import Count from '../components/CCount'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import './css/CProduct.css'

export default function CProduct(product) {
     
    const {anadirProducto} = useContext(CarritoContext);
    const [cantidad, setCantidad] = useState(1)

    const anadirAlCarrito = (e) => {
        e.preventDefault();
        e.stopPropagation();
        let productoAnadir = {
            productId: product.product.id,
            productName: product.product.productName, 
            productPrice: product.product.productPrice, 
            productMark: product.product.productMark, 
            productImg: product.product.productImg, 
            productCant: cantidad, 
            productTotal: product.product.productPrice * cantidad 
        }
 
        anadirProducto(productoAnadir);

        Swal.fire({
            icon: "success",
            title: "Se añadio el producto",
            showConfirmButton: false,
            timer: 2000
        })
    }
    
    return (   
            <div className="card m-1 p-0"> 
                <Card.Img variant="top" src={product.product.productImg} alt="..." className="img" />
                <div className="card-body">
                    <Card.Title>{product.product.productMark}</Card.Title>
                    <Card.Text>{product.product.productName}</Card.Text>
                    <Card.Text className="price">Precio: {product.product.productPrice}</Card.Text>
                    <Count cantidadProductos={cantidad} actualizarCantidad={setCantidad}/>
                    <Link className="btn btn-primary btn-sm m-2" to={`/productdetail/${product.product.id}`}>Ver Detalle</Link> 
                     
                    {
                        product.product.productStock !== 0 
                        ?
                        (
                            <button className="btn btn-primary btn-sm" onClick={(e) => {anadirAlCarrito(e)}}>Agregar al carrito</button>
                        )
                        : 
                        (
                            <button className="btn btn-danger btn-sm">No hay stock</button>
                        )
                    }
                    
                </div>
            </div>
    )
}
