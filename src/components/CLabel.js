import React, { useState, useEffect } from 'react';
import CProduct from './CProduct';
import { getProductsByLabel } from '../services/product';

export default function CCLabel({label}) {
 

    const [productos, setProductos] = useState([]);

    const getProducts = async () => {
        let data = await getProductsByLabel(label.id);
        setProductos(data); 
    }

    useEffect(() => {
        getProducts();
    }) 

    return (
        <div>
            <div>
                <i className="fas fa-caret-right fa-2x" />
                <span style={{ color: 'gray', fontSize: '26px', paddingLeft: '20px', fontWeight: 'bolder' }}>{label.labelName}</span>
            </div>
            <div className="row mt-2 d-flex justify-content-center">
            {
                productos.map((prod, i) => (
                    <div className="col-12 col-sm-6 col-lg-3 p-0" key={i}>
                        <CProduct product={prod}/>
                    </div>
                ))
            }
            </div>
        </div>
    )
} 