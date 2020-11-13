import React, {useState, useEffect, Fragment} from 'react'
import ListSubcategory from '../components/crud/ListSubcategory';
import CLoading from "../components/CLoading";
import { getSubCategories, deleteSubCategory } from '../services/subcategory';
import {Link} from "react-router-dom";
import Swal from "sweetalert2";

export default function SubcategoryView() {

    let [subcategorias, setSubcategorias] = useState([]);
    const [cargando, setCargando] = useState(true);

    const getSubcategory = async () => {
        let data = await getSubCategories();
        setSubcategorias(data);
        setCargando(false);
    }  

    const deleteSubcategory = ({id}) => {
        Swal.fire({
            icon: "warning",
            title: "¿Está seguro de eliminar la Subcategoria?",
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
            const productoEliminado = await deleteSubCategory(id); //borro, va a demorar
            getSubcategory();
        }

        )
    }

 
    useEffect(() => {
        getSubcategory();
    }, [])
        
    return (
        <Fragment>
            {
                cargando ? (
                    <CLoading />
                ) : (
                    <div style={{marginTop: '5rem', marginBottom: '1rem'}}>
                        <h1 className="align-self-center">Listado de Subcategorias</h1>  
                        <div className="ml-auto mb-3 mt-2">
                            <Link className="btn btn-primary btn-sm ml-auto" to={`/createsubcategory`}>Agregar Subcategoria</Link>
                        </div>
                        <ListSubcategory  subcategorias={subcategorias} deleteSubcategory={deleteSubcategory}/> 
                    </div>
                )

            }
        </Fragment> 
    )
}
 