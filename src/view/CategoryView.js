import React, {useState, useEffect, Fragment} from 'react'
import ListCategory from '../components/crud/ListCategory';
import CLoading from "../components/CLoading";
import { getCategories, deleteCategory } from '../services/category';
import {Link} from "react-router-dom";
import Swal from "sweetalert2";

export default function CategoryView() {

    let [categorias, setCategorias] = useState([]);
    const [cargando, setCargando] = useState(true);

    const getCategory = async () => {
        let data = await getCategories();
        setCategorias(data);
        setCargando(false);
    }  

    const removeCategory = ({id}) => {
        Swal.fire({
            icon: "warning",
            title: "¿Está seguro de eliminar la categoria?",
            showConfirmButton: true,
            confirmButtonText: "Si, Eliminar",
            showCancelButton: true,
        }).then( async (resultSwal) => {
            if(resultSwal.isDismissed === true){ //si es que doy click a cancelar no haga nada
                console.log("cancelar");
                return;
            }
            setCargando(true); //comienzo a cargar porque mi peticion demora
            const categoryEliminado = await deleteCategory(id); //borro, va a demorar
            getCategory();
        }

        )
    }

 
    useEffect(() => {
        getCategory();
    }, [])
        
    return (
        <Fragment>
            {
                cargando ? (
                    <CLoading />
                ) : (
                    <div style={{marginTop: '5rem', marginBottom: '1rem'}}>
                        <h1 className="align-self-center">Listado de categorias</h1>  
                        <div className="ml-auto mb-3 mt-2">
                            <Link className="btn btn-primary btn-sm ml-auto" to={`/createcategory`}>Agregar Categorias</Link>
                        </div>
                        <ListCategory  categorias={categorias} deleteCategory={removeCategory}/> 
                    </div>
                )

            }
        </Fragment> 
    )
}
 