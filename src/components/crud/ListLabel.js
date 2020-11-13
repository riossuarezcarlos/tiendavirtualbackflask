import React from 'react';
import {Link} from "react-router-dom";

import Table from 'react-bootstrap/Table';

export default function ListLabel({labels, deleteLabel}) {

    return (
        <div>
  
            <Table>
                <thead>
                    <tr>
                        <th>Nro</th>
                        <th>Nombre de Label</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
 
                { 
                    labels.map(
                        (
                            { 
                                id,
                                descripcion
                            }, 
                            i
                        ) => (
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{descripcion}</td>
                            <td>
                                <Link className="btn btn-outline-info btn-sm mr-2" to={`/createlabel/${id}`}>
                                    <i className="fas fa-pen-alt"></i>
                                </Link>
                                <button className="btn btn-outline-danger btn-sm" onClick={()=>{deleteLabel({id})}}>
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
