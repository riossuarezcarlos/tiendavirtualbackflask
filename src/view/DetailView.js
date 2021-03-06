import React, { useState, useEffect, useContext } from 'react' 
import { getProductbyId } from '../services/product' 
import { CarritoContext } from '../context/carritoContext'
import CLoading from '../components/CLoading'
import Count from '../components/CCount'
import Swal from 'sweetalert2'

export default function DetailView(props) {
    //recuperar el Id
    const productoId = props.match.params.id;  
    //context
    const {anadirProducto} = useContext(CarritoContext); 

     //Estados Local 
    const [miProducto, setMiProducto] = useState([])
    const [cantidad, setCantidad] = useState(1)
    const [cargando, setCargando] = useState(true)
 
    //Obtener productos
    const getProduct = async () => {
        let productoObtenido = await getProductbyId(productoId);

        setMiProducto(productoObtenido); 
        setCargando(false); 
    }

    const anadirAlCarrito = () => {
        let productoAnadir = {
            productId: miProducto.id,
            productName: miProducto.descripcion, 
            productPrice: miProducto.precio, 
            // productMark: miProducto.productMark, 
            productImg: miProducto.img, 
            productCant: cantidad, 
            productTotal: miProducto.precio * cantidad
        }
        anadirProducto(productoAnadir);

        Swal.fire({
            icon: "success",
            title: "Se añadio el producto",
            showConfirmButton: false,
            timer: 2000
        })
    } 

    useEffect(() => {
        getProduct();
    }, []);

    return ( 
        <div>
            {
                cargando === true ?
                ( 
                        <CLoading/> 
                ):
                (
                    <div style={{marginTop: '5rem', marginBottom: '1rem'}}>
                    <div className="row">
                        <div className="col-12 col-lg-6">
                            <img src={miProducto.img} alt="..." className="img-fluid"/>
                        </div>
                        <div className="col-12 col-lg-6">
                            {/* <h1>{miProducto.productMark}</h1> */}
                            <h1>{miProducto.descripcion}</h1>
                            <h2>Precio: {miProducto.precio}</h2> 
                            <Count cantidadProductos={cantidad} actualizarCantidad={setCantidad}/>

                            {
                                miProducto.stock !== 0 
                                ?
                                (
                                    <button className="btn btn-primary btn-sm" onClick={() => {anadirAlCarrito()}}>Agregar al carrito</button>
                                )
                                : 
                                (
                                    <button className="btn btn-danger btn-sm">No hay stock</button>
                                )
                            }
                            
                        </div>
                    </div>
                </div> 
                )
            }
        </div>   
    )
}
