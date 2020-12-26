import React, {useState, useEffect} from 'react';
import {getOrderById } from '../services/order';
import { Link } from 'react-router-dom'
import './css/COrder.css';

export default function COrder({order}) {
 
    const [products, setProducts] = useState([]); 

    const getProducts = async () =>{ 
        console.log("COrder", order)
        setProducts(order.order_detail); 
    }

    useEffect(() =>{
        getProducts();
    }, [order])
  
    return ( 
        <div  className="card mb-4"> 
            {
                products.map((prod,i) => (
                    
                    <div className="d-flex justify-content-center flex-row m-4" style={{ marginTop: '4px'}} key={i}> 
                        <div className="d-flex align-items-center">
                            <img src={prod.productImg} alt="..." className="imgpopover" />
                        </div>
                        <div className="card-body pt-1 pb-1 pl-2 pr-2">
                            {/* <h5 className="marca">{prod.productMark}</h5>  */}
                            <h5 className="texto">{prod.productName}</h5>
                            <h5 className="texto">Precio: {prod.productTotal}</h5>
                            <h5 className="texto">Cantidad:{prod.productCant}</h5>                    
                        </div>
                    </div> 
                    
                ))
            }    
        </div>
    )
}
