import React, {useState, useEffect, Fragment} from 'react'
import ListType from '../components/crud/ListType';
import CLoading from "../components/CLoading";
import { getProductTypes, deleteType} from '../services/producttype';
import {Link} from "react-router-dom";
import Swal from "sweetalert2";

export default function TypeView() {

    let [types, setTypes] = useState([]);
    const [cargando, setCargando] = useState(true);

    const getType = async () => {
        let data = await getProductTypes();
        setTypes(data);
        setCargando(false);
    }  

    const deleteType = ({id}) => {
        Swal.fire({
            icon: "warning",
            title: "¿Está seguro de eliminar el tipo?",
            showConfirmButton: true,
            confirmButtonText: "Si, Eliminar",
            showCancelButton: true,
        }).then( async (resultSwal) => {
            if(resultSwal.isDismissed === true){ //si es que doy click a cancelar no haga nada
                console.log("cancelar");
                return;
            }
            console.log("Eliminar")
            setCargando(true); //comienzo a cargar porque mi peticion demora
            const productoEliminado = await deleteType(id); //borro, va a demorar
            getType();
            
        }

        )
    }

 
    useEffect(() => {
        getType();
    }, [])
        
    return (
        <Fragment>
            {
                cargando ? (
                    <CLoading />
                ) : (
                    <div style={{marginTop: '5rem', marginBottom: '1rem'}}>
                        <h1 className="align-self-center">Listado de tipos</h1>  
                        <div className="ml-auto mb-3 mt-2">
                            <Link className="btn btn-primary btn-sm ml-auto" to={`/createtype`}>Agregar Tipos</Link>
                        </div>
                        <ListType  types={types} deleteType={deleteType}/> 
                    </div>
                )

            }
        </Fragment> 
    )
}
 