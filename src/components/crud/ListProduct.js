import React from 'react';
import Table from 'react-bootstrap/Table';
import {Link} from "react-router-dom";

export default function ListProduct({productos, deleteProduct}) {
    console.log(productos)
    return (
        <div>
  
            <Table>
                <thead>
                    <tr>
                        <th>Nro</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
 
                { 
                    productos.map(
                        (
                            { 
                                id,
                                nombre,
                                precio,
                                stock
                            }, 
                            i
                        ) => (
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{nombre}</td>
                            <td>{precio}</td>
                            <td>{stock}</td>
                            <td>
                                <Link className="btn btn-outline-info btn-sm mr-2" to={`/createproduct/${id}`}>
                                    <i className="fas fa-pen-alt"></i>
                                </Link>
                                <button className="btn btn-outline-danger btn-sm" onClick={()=>{deleteProduct({id})}}>
                                <i className="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr> 
                        )
                    )                        
                } 
                </tbody>
            </Table>
        </div> 
    )
}
