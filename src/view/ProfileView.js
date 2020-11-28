import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/authContext' ;
import { getUser, modifyUser } from '../services/user';
import { getAddress, createAddress, modifyAddress } from '../services/address';

export default function ProfileView() {

    const { user } = useContext(AuthContext);  
    const [correo, setCorreo] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [documento, setDocumento] = useState("");
    const [telefono, setTelefono] = useState("");

    const [direccion, setDireccion] = useState("");
    const [numero, setNumero] = useState("");
    const [referencia, setReferencia] = useState("");
    const [persona, setPersona] = useState(""); 

    const [userId, setUserId] = useState(""); 
    const [addressId, seetAddressId] = useState(""); 
    const [indicadorAddress, setIndicadorAddress] = useState(false); 
  
    const showUser = async () => {
        
        let dataUser = await getUser(user.tokens.acceso);
        let userIdTemp = '';
        let addressIdTemp = '';
        setCorreo(user.usuCorreo);

        if (dataUser){
            userIdTemp = dataUser.usuId;
            setNombre(dataUser.usuNombre);
            setApellido(dataUser.usuApellido);
            setDocumento(dataUser.usuDni);
            setTelefono(dataUser.usuCel);
            setUserId(userIdTemp);
        }

        let dataAddress = await getAddress(userIdTemp);
        
        if (dataAddress){
            addressIdTemp = dataAddress.dirId;
            setDireccion(dataAddress.dirDes);
            setNumero(dataAddress.dirNum);
            setReferencia(dataAddress.dirRef);
            setPersona(dataAddress.dirPer);
            seetAddressId(addressIdTemp);
            setIndicadorAddress(true);
        }
        
    }

    const updateUser = async (ev) => {
        ev.preventDefault();

        let objUser = {
            usuNombre: nombre,
            usuApellido: apellido,
            usuDni: documento,
            usuCel: telefono
        } 
 
        await modifyUser(objUser, user.tokens.acceso);

        let objAddress = {
            dirDes: direccion,
            dirNum: numero,
            dirPer: persona,
            dirRef: referencia,
            usuId: userId
        } 
        
        indicadorAddress === false
        ?
            await createAddress(objAddress)
        :
            await modifyAddress(objAddress, addressId)

        window.history.back(); 
    } 

    useEffect(() => {
        showUser();
    }, [])

    return (
        <div className="d-flex justify-content-center"> 
            <form>  
                    <div style={{width: '600px', marginTop: '5rem', marginBottom: '1rem'}}>
                        <div className="card mt-3">
                        <div className="card-body" style={{paddingTop:'10px', paddingBottom: '0px'}}>
                                <h2 className="card-title">
                                    Mi Perfil de Usuario
                                </h2> 
                                <div className="form-group">
                                    <label>Correo:</label>
                                    <input type="email" className="form-control" value={correo} onChange={(ev) => {setCorreo(ev.target.value)}} readOnly/>
                                </div>
                                <div className="form-group">
                                    <label>Nombre:</label>
                                    <input type="text" className="form-control" value={nombre} onChange={(ev) => {setNombre(ev.target.value)}} placeholder="Ingresar Nombres"/>
                                </div>
                                <div className="form-group">
                                    <label>Apellido:</label>
                                    <input type="text" className="form-control" value={apellido} onChange={(ev) => {setApellido(ev.target.value)}} placeholder="Ingresar Apellidos"/>
                                </div>
                                <div className="form-group">
                                    <label>Documento de identidad:</label>
                                    <input type="text" className="form-control" value={documento} onChange={(ev) => {setDocumento(ev.target.value)}} placeholder="Ingresar Documento de Identidad"/>
                                </div>
                                <div className="form-group">
                                    <label>Teléfono/Móvil:</label>
                                    <input type="text" className="form-control" value={telefono} onChange={(ev) => {setTelefono(ev.target.value)}} placeholder="Ingresar Teléfono/Móvil"/>
                                </div>
                            </div>
                        </div> 
                </div>

                <div style={{width: '600px', marginBottom: '1rem'}}>
                        <div className="card mt-3">
                           <div className="card-body" style={{paddingTop:'10px', paddingBottom: '0px'}}>
                                <h2 className="card-title">
                                    Mis Datos de Entrega
                                </h2> 
                                <div className="form-group">
                                    <label>Ingrese su dirección:</label>
                                    <input type="text" className="form-control" value={direccion} onChange={(ev) => setDireccion(ev.target.value)} placeholder="Ingresar Dirección"/>
                                </div>
                                
                                <div className="form-group">
                                    <label>Número/Piso/Departamento:</label>
                                    <input type="text" className="form-control" value={numero} onChange={(ev) => setNumero(ev.target.value)} placeholder="Ingresar Número/Piso/Departamento"/>
                                </div>
                                <div className="form-group">
                                    <label>Referencia de su ubicación:</label>
                                    <input type="text" className="form-control" value={referencia} onChange={(ev) => setReferencia(ev.target.value)} placeholder="Ingresar Ubicación"/>
                                </div>
                                <div className="form-group">
                                    <label>Nombre de la persona que va a recibir:</label>
                                    <input type="text" className="form-control" value={persona} onChange={(ev) => setPersona(ev.target.value)} placeholder="Ingresar Nombre de persona a recibir"/>
                                </div>
                            </div>
                        </div> 
                </div> 
 
                <button type="submit" className="btn btn-primary btn-block" onClick={(ev) => { updateUser(ev) }}>Registrar</button>

            </form>
        </div>

    )
}