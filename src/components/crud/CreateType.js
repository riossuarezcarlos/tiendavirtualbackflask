import React, { useState, useEffect } from 'react'

import { getCategories, getCategoriesbyId } from '../../services/category';
import { getSubCategoriesbyId } from '../../services/subcategory';
import { getProductTypesbyId } from '../../services/producttype';
import { createType, updateType } from '../../services/producttype';
import Swal from 'sweetalert2';
import { useHistory } from  'react-router-dom';

import { useForm } from "react-hook-form";

export default function CreateType(props){

    const {id} = props.match.params;

    const history = useHistory();
    let { register, handleSubmit, setValue, errors} = useForm();
    const [categories, setCategories] = useState([]); 
    const [subCategories, setSubCategories] = useState([]);
    
    const getProductType = async () => {
        if(id !== undefined){
            let data = await getProductTypesbyId(id);
            console.log("object", data.subcategoria)
            let subcategoria = await getSubCategoriesbyId(data.subcategoria) 

            let categoryId = 0;
            subcategoria.map((subcat) => {
                setValue("categoryId",subcat.categoria);
                categoryId = subcat.categoria;
            })

            await getSubCategory(categoryId)

            setValue("subcategoryId",data.subcategoria);
            setValue("producttypeDesc",data.descripcion);
        }
    }

    const manejarSubmit = async (data) => {    

        if(id === undefined){
            let typeC = await createType(data);  
        }
        else{
            console.log(data, id)
            let typeC = await updateType(data, id);  
        }
         
        Swal.fire({
            icon: "success",
            title: "Registro correcto",
            showConfirmButton: false,
            timer: 1000
        })

        return history.push('/tipo');

    }
  
    const getCategory = async () => {
        let data = await getCategories(); 
        setCategories(data);
    } 

    const getSubCategory = async (categoryId) => { 
        let data = await getCategoriesbyId(categoryId); 
        data.map((category) => {
            setSubCategories(category.subcategorias);
        })
    } 
  
    //* Validar Select **/
    
    let validateSelect = (value) => {
        if(value === "0"){
            return false;
        }else{
            return true;
        }
    }
  
    useEffect(() => {
        getCategory(); 
        getProductType();
    },[])

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
                                        id ? "Actualizar tipo" : "Agregar nuevo tipo"
                                    }
                                </h1> 

                                <div className="form-group">
                                    <label>Categoria de Producto</label>
                                    <select name="categoryId" className="form-control" 
                                        onChange={(ev) => {getSubCategory(ev.target.value)}}
                                        ref={register({validate:validateSelect})
                                    }>
                                        <option value="0">Seleccionar Categoria</option> 
                                        {
                                            categories.map((elm,i) => (
                                                <option key={i} value={elm.id}>{elm.descripcion}</option>
                                            ))
                                        }
                                    </select>
                                    {
                                        errors.categoryId && errors.categoryId.type ==="validate" && (
                                            <small className="text-danger font-weight-bold">Debe seleccionar una categoria</small>
                                        )
                                    }
                                </div>

                                <div className="form-group">
                                    <label>Subcategoria de Producto</label>
                                    <select name="subcategoryId" className="form-control" 
                                        ref={register({validate:validateSelect})
                                    }>
                                        <option value="0">Seleccionar Subcategoria</option> 
                                        {
                                            subCategories.map((elm,i) => (
                                                <option key={i} value={elm.id}>{elm.descripcion}</option>
                                            ))
                                        }
                                    </select>
                                    {
                                        errors.subcategoryId && errors.subcategoryId.type ==="validate" && (
                                            <small className="text-danger font-weight-bold">Debe seleccionar una subcategoria</small>
                                        )
                                    }
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="producttypeDesc">Nombre Tipo:</label>
                                    <input
                                    type="text"
                                    className="form-control"
                                    id="producttypeDesc"
                                    name="producttypeDesc"
                                    ref={register({required:true, minLength:2, maxLength:30})}
                                    />
                                    {errors.producttypeDesc && errors.producttypeDesc.type === 'required' && (
                                    <small className="text-danger font-weight-bold">Debe ingresar el nombre del tipo</small>
                                    )}
                                    {
                                        errors.producttypeDesc && errors.producttypeDesc.type === "minLength" && (
                                            <small className="text-danger font-weight-bold">El nombre no puede ser menor a 10 digitos</small>
                                        )
                                    }
                                    {
                                        errors.producttypeDesc && errors.producttypeDesc.type === "maxLength" && (
                                            <small className="text-danger font-weight-bold">El nombre no puede ser mayor a 100 digitos</small>
                                        )
                                    }
                                </div>

                            <button type="submit" className="btn btn-primary btn-lg btn-block">
                                {
                                    id ? "Actualizar tipo" : "Agregar nuevo tipo"
                                }
                            </button>

                            </div>
                        </div> 
                    </div>

                </form>

            </div>
 
    )
}
 