import React, { useState } from 'react'
import { createUser } from '../services/user';

import Swal from 'sweetalert2';

export default function RegisterView() {

    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');

    const crearUsuario = async (e) => {
        e.preventDefault();

        let data = {
            'usuCorreo' : correo,
            'password' : password,
            "is_superuser": true,
            "is_staff": true
        }

        let usuario = await createUser(data);

        //Mostramos el alert
        Swal.fire({
            icon: "success",
            title: `usuario ${usuario.usuCorreo} creado correctamente`,
            showConfirmButton: false,
            timer: 1500
        })
 
        window.history.back(); 

    }

    return (
        <div className="d-flex justify-content-center">
            <div style={{width: '400px', marginTop: '5rem', marginBottom: '1rem'}}>
            <div className="card mt-3">
                <div className="card-body">
                    <h2 className="card-title">
                        Registro
                    </h2>
                    <form onSubmit={crearUsuario}>
                        <div className="form-group">
                            <label>Correo:</label>
                            <input value={correo} onChange={(e) => {setCorreo(e.target.value);}} type="email" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label>Password:</label>
                            <input value={password} onChange={(e) => {setPassword(e.target.value);}} type="password" className="form-control"/>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">Registrar</button>
                    </form>
                </div>
            </div>
            </div>
        </div>
    )
}