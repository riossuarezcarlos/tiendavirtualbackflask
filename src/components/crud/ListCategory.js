import React from 'react';
import Table from 'react-bootstrap/Table';
import {Link} from "react-router-dom";

export default function ListCategory({categorias, deleteCategory}) {
    return (
        <div>
  
            <Table>
                <thead>
                    <tr>
                        <th>Nro</th>
                        <th>Nombre de Categoría</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
 
                { 
                    categorias.map(
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
                                <Link className="btn btn-outline-info btn-sm mr-2" to={`/createcategory/${id}`}>
                                    <i className="fas fa-pen-alt"></i>
                                </Link>
                                <button className="btn btn-outline-danger btn-sm" onClick={()=>{deleteCategory({id})}}>
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
