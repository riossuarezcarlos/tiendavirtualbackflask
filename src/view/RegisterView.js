import React, { useState } from 'react'
import { registro } from '../services/authService';
import { createUser } from '../services/user';

export default function RegisterView() {

    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');

    const registrar = (e) => {
        e.preventDefault();
        registro(correo, password)
        .then(async (rpta) => {

            let objUser = {
                user_dni: '',
                user_email: correo,
                user_lastname: '',
                user_fireid: rpta,
                user_name: '',
                user_phone: ''
            }
            
            let user = await createUser(objUser);
            console.log("Usuario Creado", user);
            window.history.back(); 
        })
        .catch(error => {
            console.log(error);
        })
    }

    return (
        <div className="d-flex justify-content-center">
            <div style={{width: '400px', marginTop: '5rem', marginBottom: '1rem'}}>
            <div className="card mt-3">
                <div className="card-body">
                    <h2 className="card-title">
                        Registro
                    </h2>
                    <form onSubmit={(e) => {registrar(e)}}>
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