import React, {useState, createContext} from 'react';

export const CarritoContext = createContext();

const CarritoContextProvider = (props) => {
    const [carrito, setCarrito] = useState([]);
    const [order, setOrder] = useState(null);

    const [busqueda, setBusqueda] = useState('');

    const setOrderGen =  async (campo, valor) => { 
        setOrder({ ...order, [campo]: valor }); 
        console.log("setOrderGen", order)
    }
  
    const setOrderUser =  (userId, user_email, user_name, user_phone) => {
        setOrder({ ...order, userId: userId, user_email: user_email, user_name:user_name, user_phone:user_phone });
    }

    const setOrderDelivery =  (address_name, address_number, address_reference) => {
        setOrder({ ...order, address_name: address_name, address_number: address_number, address_reference:address_reference });
    }
 
    const anadirProducto =  (producto) => {
        setCarrito([...carrito, producto])
    }

    const eliminarProducto =  (producto) => { 
        let carritoTemp =  carrito.filter(prod => prod.productId !== producto.productId) 
        setCarrito(carritoTemp);
    }

    const limpiarCarrito =  () => { 
        setCarrito([]);
    }
    
    const limpiarOrder =  () => { 
        setOrder(null);
    }
  
    return(
        <CarritoContext.Provider value={{carrito, anadirProducto, eliminarProducto, limpiarCarrito, order, setOrderGen, setOrderUser, setOrderDelivery, limpiarOrder, busqueda, setBusqueda}}>
            {props.children}
        </CarritoContext.Provider>
    )
}

export default CarritoContextProvider;