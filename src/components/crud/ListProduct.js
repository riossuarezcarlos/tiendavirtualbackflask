import React from 'react'
import Table from 'react-bootstrap/Table'

export default function ListProduct({productos, deleteProduct}) {
    console.log(productos)
    return (
        <div>
  
            <Table>
                <thead>
                    <tr>
                        <th>Nro</th>
                        <th>Nombre</th>
                        <th>Descripcion</th>
                        <th>Marca</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
 
                { 
                    productos.map(
                        (
                            { 
                                id,
                                productName,
                                productDescription,
                                productMark,
                                productPrice
                            }, 
                            i
                        ) => (
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{productName}</td>
                            <td>{productDescription}</td>
                            <td>{productMark}</td>
                            <td>{productPrice}</td>
                            <td>
                                <button className="btn btn-outline-info btn-sm mr-2">
                                    <i className="fas fa-pen-alt"></i>
                                </button>
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
