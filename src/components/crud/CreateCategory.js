import React, { useState, useEffect } from 'react'

import { createCategory, getCategoriesbyId, updateCategory } from '../../services/category';
import Swal from 'sweetalert2';
import { useHistory } from  'react-router-dom';
import { useForm } from "react-hook-form";


export default function CreateCategory(props){

    const {id} = props.match.params;

    const history = useHistory();
    let { register, handleSubmit, setValue, errors} = useForm();

    const getCategory = async () => {
        if(id !== undefined){
            let data = await getCategoriesbyId(id);
            setValue("categoryDesc",data.descripcion);
        }
    }
  
    const manejarSubmit = async (data) => {    
        
        if(id === undefined){
            let categoryC = await createCategory(data);  
        }
        else{
            let categoryC = await updateCategory(data, id);  
        }


        //Mostramos el alert
        Swal.fire({
            icon: "success",
            title: "Registro correcto",
            showConfirmButton: false,
            timer: 1000
        })

        // regresamos a la pagina principal
        return history.push('/category');     
    }
   
    useEffect(() => {
        getCategory();
    }, []);
   
    
    return (

        <div className="d-flex justify-content-center">
              <form
                onSubmit={handleSubmit(manejarSubmit)}
                >

                    <div style={{width: '600px', marginTop: '5rem', marginBottom: '1rem'}}>
                        <div className="card mt-3">
                            <div className="card-body" style={{paddingTop:'10px', paddingBottom: '10px'}}>

                                <h1 className="align-self-center">
                                    {
                                        id ? "Actualizar categoria" : "Agregar nueva categoria"
                                    }
                                </h1>
                                
                                <div className="form-group">
                                    <label htmlFor="categoryDesc">Nombre de Categoria:</label>
                                    <input
                                    type="text"
                                    className="form-control"
                                    id="categoryDesc"
                                    name="categoryDesc"
                                    ref={register({required:true, minLength:2, maxLength:20})}
                                    />
                                    {errors.categoryDesc && errors.categoryDesc.type === 'required' && (
                                    <small className="text-danger font-weight-bold">Debe ingresar el nombre del producto</small>
                                    )}
                                    {
                                        errors.categoryDesc && errors.categoryDesc.type === "minLength" && (
                                            <small className="text-danger font-weight-bold">El nombre no puede ser menor a 2 digitos</small>
                                        )
                                    }
                                    {
                                        errors.categoryDesc && errors.categoryDesc.type === "maxLength" && (
                                            <small className="text-danger font-weight-bold">El nombre no puede ser mayor a 20 digitos</small>
                                        )
                                    }
                                </div>
                       
                                <button type="submit" className="btn btn-primary btn-lg btn-block">
                                    {
                                        id ? "Actualizar categoria" : "Agregar nueva categoría"
                                    }
                                </button>

                            </div>
                        </div> 
                    </div>

                </form>

            </div>
 
    )
}
 