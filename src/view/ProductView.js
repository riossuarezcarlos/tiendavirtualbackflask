import React, {useState, useEffect} from 'react'
import ListProduct from '../components/crud/ListProduct';
import CLoading from "../components/CLoading";
import { getProducts, deleteProductById } from '../services/product';
import {Link} from "react-router-dom";
import Swal from "sweetalert2";

export default function ProductView() {

    let [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);

    const getProduct = async () => {
        let data = await getProducts();
        setProductos(data);
        setCargando(false);
    }  

    const deleteProduct = ({id}) => {
        Swal.fire({
            icon: "warning",
            title: "¿Está seguro de eliminar el producto?",
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
            const productoEliminado = await deleteProductById(id); //borro, va a demorar
            console.log(productoEliminado)
            getProduct();
        }

        )
    }

 
    useEffect(() => {
        getProduct();
    }, [])
        
    return (
        <div>
            {
                cargando ? (
                    <CLoading />
                ) : (
                    <div style={{marginTop: '5rem', marginBottom: '1rem'}}>
                        <h1 className="align-self-center">Listado de productos</h1>  
                        <div className="ml-auto mb-3 mt-2">
                            <Link className="btn btn-primary btn-sm ml-auto" to={`/createproduct`}>Agregar Producto</Link>
                        </div>
                        <ListProduct  productos={productos} deleteProduct={deleteProduct}/> 
                    </div>
                )

            }
        </div> 
    )
}
 