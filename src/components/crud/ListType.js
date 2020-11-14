import React from 'react';
import Table from 'react-bootstrap/Table';
import {Link} from "react-router-dom";

export default function ListType({types, deleteType}) {
    return (
        <div>
  
            <Table>
                <thead>
                    <tr>
                    <th>Nro</th>
                        <th>Nombre de tipo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
 
                { 
                    types.map(
                        (
                            { 
                                id,
                                descripcion,
                            }, 
                            i
                        ) => (
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{descripcion}</td>
                            <td>
                                <Link className="btn btn-outline-info btn-sm mr-2" to={`/createtype/${id}`}>
                                    <i className="fas fa-pen-alt"></i>
                                </Link>
                                <button className="btn btn-outline-danger btn-sm" onClick={()=>{deleteType({id})}}>
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
