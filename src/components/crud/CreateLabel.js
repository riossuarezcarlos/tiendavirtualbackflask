import React, { useState, useEffect } from 'react'

import { createLabel, getLabelbyId, updateLabel } from '../../services/label';
import Swal from 'sweetalert2';
import { useHistory } from  'react-router-dom';
import { useForm } from "react-hook-form";
 

export default function CreateCategory(props){

    const {id} = props.match.params;

    const history = useHistory();
    let { register, handleSubmit, setValue, errors} = useForm();

    const getLabel = async () => {
        if(id !== undefined){
            let data = await getLabelbyId(id);
            setValue("labelDesc",data.descripcion);
        }
    }
  
    const manejarSubmit = async (data) => {    

        if(id === undefined){
            let categoryC = await createLabel(data);  
        }
        else{
            let categoryC = await updateLabel(data, id);  
        }

        //Mostramos el alert
        Swal.fire({
            icon: "success",
            title: "Registro correcto",
            showConfirmButton: false,
            timer: 1000
        })

        // regresamos a la pagina principal
        return history.push('/label');
    }

    useEffect(() => {
        getLabel();
    }, []);
   
    return (

        <div className="d-flex justify-content-center">
              <form
                onSubmit={handleSubmit(manejarSubmit)}
                >

                    <div style={{width: '600px', marginTop: '5rem', marginBottom: '1rem'}}>
                        <div className="card mt-3">
                            <div className="card-body" style={{paddingTop:'10px', paddingBottom: '0px'}}>

                                <h1 className="align-self-center">
                                    {
                                        id ? "Actualizar etiqueta" : "Agregar nueva Etiqueta"
                                    }
                                </h1>  
                            
                                <div className="form-group">
                                    <label htmlFor="labelDesc">Nombre de Etiqueta:</label>
                                    <input
                                    type="text"
                                    className="form-control"
                                    id="labelDesc"
                                    name="labelDesc"
                                    ref={register({required:true, minLength:2, maxLength:20})}
                                    />
                                    {errors.labelDesc && errors.labelDesc.type === 'required' && (
                                    <small className="text-danger font-weight-bold">Debe ingresar el nombre de la etiqueta</small>
                                    )}
                                    {
                                        errors.labelDesc && errors.labelDesc.type === "minLength" && (
                                            <small className="text-danger font-weight-bold">El nombre de la etiqueta no puede ser menor a 2 digitos</small>
                                        )
                                    }
                                    {
                                        errors.labelDesc && errors.labelDesc.type === "maxLength" && (
                                            <small className="text-danger font-weight-bold">El nombre de la etiqueta no puede ser mayor a 20 digitos</small>
                                        )
                                    }
                                </div>
                       
                                <button type="submit" className="btn btn-primary btn-lg btn-block">
                                    {
                                        id ? "Actualizar etiqueta" : "Agregar nueva Etiqueta"
                                    }
                                </button>

                            </div>
                        </div> 
                    </div>

                </form>

            </div>
 
    )
}
 