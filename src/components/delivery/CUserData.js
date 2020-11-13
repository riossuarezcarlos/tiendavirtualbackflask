import React, { useState, useEffect, useContext } from 'react';
import { getUserbyId } from '../../services/user';
import { CarritoContext } from '../../context/carritoContext';
import { useForm } from "react-hook-form";

export default function CUserData({userId, handleNext}) { 
 
    const { order, setOrderUser } = useContext(CarritoContext); 

    let { register, handleSubmit, errors} = useForm();

    const [correo, setCorreo] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [documento, setDocumento] = useState("");
    const [telefono, setTelefono] = useState(""); 
 
    const getUserData = async () => {
        let dataUser = await getUserbyId(userId);
        dataUser.map((item) => {
            setCorreo(item.user_email);
            setNombre(item.user_name);
            setApellido(item.user_lastname);
            setDocumento(item.user_dni);
            setTelefono(item.user_phone); 
            
            setOrderUser(item.id, item.user_email, item.user_name + ' ' + item.user_lastname, item.user_phone);
    
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
                            Registro
                        </h2>
                        <form onSubmit={handleSubmit(manejarSubmit)}>
                            <div className="form-group">
                                <label>Correo:</label>
                                <input readOnly type="email" className="form-control" value={correo} onChange={(ev) => {setCorreo(ev.target.value)}} placeholder="Ingresar Correo"/>
                            </div>
                            <div className="form-group">
                                <label>Nombre:</label>
                                <input readOnly type="text" className="form-control" value={nombre} onChange={(ev) => {setNombre(ev.target.value)}} placeholder="Ingresar Nombres"/>
                            </div>
                            <div className="form-group">
                                <label>Apellido:</label>
                                <input readOnly type="text" className="form-control" value={apellido} onChange={(ev) => {setApellido(ev.target.value)}} placeholder="Ingresar Apellidos"/>
                            </div>
                            <div className="form-group">
                                <label>Documento de identidad:</label>
                                <input readOnly type="text" className="form-control" value={documento} onChange={(ev) => {setDocumento(ev.target.value)}} placeholder="Ingresar Documento de Identidad"/>
                            </div>
                            <div className="form-group">
                                <label>Teléfono/Móvil:</label>
                                <input readOnly type="text" className="form-control" value={telefono} onChange={(ev) => {setTelefono(ev.target.value)}} placeholder="Ingresar Teléfono/Móvil"/>
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
