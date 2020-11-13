import React, {useState, useEffect, useContext} from 'react';
import { getAddressbyId } from '../../services/address';
import { CarritoContext } from '../../context/carritoContext';
import { useForm } from "react-hook-form";

export default function CDeliveryData({handleNext}) { 

    const { order, setOrderDelivery } = useContext(CarritoContext);  

    let { register, handleSubmit, errors} = useForm();

    const [direccion, setDireccion] = useState("");
    const [numero, setNumero] = useState("");
    const [referencia, setReferencia] = useState("");
    const [persona, setPersona] = useState("");

    const getUserData = async () => { 

        let dataAddress = await getAddressbyId(order.userId);
        dataAddress.map((item) => {
            setDireccion(item.address_name);
            setNumero(item.address_number);
            setReferencia(item.address_reference);
            setPersona(item.address_person);

            setOrderDelivery(item.address_name, item.address_number, item.address_reference);  
        }); 
 
    }

    const manejarSubmit  = async (data) => {    
        handleNext();
    }
 
    useEffect(() => {
        getUserData();
    }, [])

    return (
        <div className="d-flex justify-content-center">
            <div style={{width: '400px'}}>
                <div className="card mt-3">
                    <div className="card-body">
                        <h2 className="card-title">
                            Entrega
                        </h2>
                        <form onSubmit={handleSubmit(manejarSubmit)}>
                            <div className="form-group">
                                <label>Ingrese su dirección:</label>
                                <input readOnly type="text" className="form-control" value={direccion} onChange={(ev) => setDireccion(ev.target.value)} placeholder="Ingresar Dirección"/>
                            </div>
                            
                            <div className="form-group">
                                <label>Número/Piso/Departamento:</label>
                                <input readOnly type="text" className="form-control" value={numero} onChange={(ev) => setNumero(ev.target.value)} placeholder="Ingresar Número/Piso/Departamento"/>
                            </div>
                            <div className="form-group">
                                <label>Referencia de su ubicación:</label>
                                <input readOnly type="text" className="form-control" value={referencia} onChange={(ev) => setReferencia(ev.target.value)} placeholder="Ingresar Ubicación"/>
                            </div>
                            <div className="form-group">
                                <label>Nombre de la persona que va a recibir:</label>
                                <input readOnly type="text" className="form-control" value={persona} onChange={(ev) => setPersona(ev.target.value)} placeholder="Ingresar Nombre de persona a recibir"/>
                            </div>

                            <button type="submit" className="btn btn-primary btn-lg btn-block">
                                Siguiente
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}