import React, { useState, useContext } from 'react'
import { ingresar } from '../services/authService';
import {AuthContext} from '../context/authContext';

export default function LoginView() {

    const { user, setAuthUser } = useContext(AuthContext);

    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');

    const loguear = (e) => {
        e.preventDefault();
        ingresar(correo, password)
        .then((rpta) => {
            setAuthUser(rpta);  
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
                        Login
                    </h2>
                    <form onSubmit={(e) => {loguear(e)}}>
                    <div className="form-group">
                            <label>Correo:</label>
                            <input value={correo} onChange={(e) => {setCorreo(e.target.value);}} type="email" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label>Password:</label>
                            <input value={password} onChange={(e) => {setPassword(e.target.value);}} type="password" className="form-control"/>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">Ingresar</button>
                    </form>
                </div>
            </div>
            </div>
        </div>
    )
}
