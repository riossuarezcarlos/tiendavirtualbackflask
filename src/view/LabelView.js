import React, {useState, useEffect, Fragment} from 'react'
import ListLabel from '../components/crud/ListLabel';
import CLoading from "../components/CLoading";
import { getLabels, deleteLabel } from '../services/label';
import {Link} from "react-router-dom";
import Swal from "sweetalert2";

export default function LabelView() {

    let [labels, setLabels] = useState([]);
    const [cargando, setCargando] = useState(true);

    const getProductosLabel = async () => {
        let data = await getLabels();
        setLabels(data);
        setCargando(false);
    }  

    const removeLabel = ({id}) => {
        Swal.fire({
            icon: "warning",
            title: "¿Está seguro de eliminar la label?",
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
            const productoEliminado = await deleteLabel(id); //borro, va a demorar
            getProductosLabel();
        }

        )
    }

 
    useEffect(() => {
        getProductosLabel();
    }, [])
        
    return (
        <Fragment>
            {
                cargando ? (
                    <CLoading />
                ) : (
                    <div style={{marginTop: '5rem', marginBottom: '1rem'}}>
                        <h1 className="align-self-center">Listado de Etiquetas</h1>  
                        <div className="ml-auto mb-3 mt-2">
                            <Link className="btn btn-primary btn-sm ml-auto" to={`/createlabel`}>Agregar Etiquetas</Link>
                        </div>
                        <ListLabel  labels={labels} deleteLabel={removeLabel}/> 
                    </div>
                )

            }
        </Fragment> 
    )
}
 