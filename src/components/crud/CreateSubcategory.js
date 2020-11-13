import React, { useState, useEffect } from 'react' 
import { getCategories } from '../../services/category';  
import { createSubcategory, getSubCategories, getSubCategoriesbyId, updateSubcategory } from '../../services/subcategory';
import Swal from 'sweetalert2';
import { useHistory } from  'react-router-dom';
 
import { useForm } from "react-hook-form";
 

export default function CreateSubcategory(props){

    const {id} = props.match.params;

    const history = useHistory();
    let { register, handleSubmit, setValue, errors} = useForm();
    const [categories, setCategories] = useState([]); 

    const getSubcategory = async () => {
        if(id !== undefined){
            let data = await getSubCategoriesbyId(id);
            console.log("id", data)
            setValue("subcategoryDesc",data.descripcion);
            setValue("categoryId",data.categoria);
        }
    }

    const manejarSubmit = async (data) => {     

        if(id === undefined){
            let subcategoryC = await createSubcategory(data);  
        }
        else{
            console.log(data, id)
            let subcategoryC = await updateSubcategory(data, id);  
        }

        //Mostramos el alert
        Swal.fire({
            icon: "success",
            title: "Registro correcto",
            showConfirmButton: false,
            timer: 1000
        })
      
        return history.push('/subcategory');
    }
  
    const getCategory = async () => {
        let data = await getCategories(); 
        console.log("object", data)
        setCategories(data);
    } 
  
    //* Validar Select **/
    
    let validateSelect = (value) => {
        console.log("value", value);
        if(value === "0"){
            return false;
        }else{
            return true;
        }
    }
  
    useEffect(() => {
        getCategory(); 
        getSubcategory();
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
                                        id ? "Actualizar sub categoria" : "Agregar nueva sub categoria"
                                    }
                                </h1> 

                                <div className="form-group">
                                    <label>Categoria de Producto</label>
                                    <select name="categoryId" className="form-control" 
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
                                            <small className="text-danger font-weight-bold">Debe seleccionar una categoria de producto</small>
                                        )
                                    }
                                </div>
                            
                                <div className="form-group">
                                    <label htmlFor="subcategoryDesc">Nombre Subcategoria:</label>
                                    <input
                                    type="text"
                                    className="form-control"
                                    id="subcategoryDesc"
                                    name="subcategoryDesc"
                                    ref={register({required:true, minLength:2, maxLength:20})}
                                    />
                                    {errors.subcategoryDesc && errors.subcategoryDesc.type === 'required' && (
                                    <small className="text-danger font-weight-bold">Debe ingresar el nombre de la subcategoria</small>
                                    )}
                                    {
                                        errors.subcategoryDesc && errors.subcategoryDesc.type === "minLength" && (
                                            <small className="text-danger font-weight-bold">El nombre no puede ser menor a 2 digitos</small>
                                        )
                                    }
                                    {
                                        errors.subcategoryDesc && errors.subcategoryDesc.type === "maxLength" && (
                                            <small className="text-danger font-weight-bold">El nombre no puede ser mayor a 20 digitos</small>
                                        )
                                    }
                                </div>
                       
                            <button type="submit" className="btn btn-primary btn-lg btn-block">
                                    {
                                        id ? "Actualizar sub categoria" : "Agregar nueva sub categoria"
                                    }
                            </button>

                            </div>
                        </div> 
                    </div>

                </form>

            </div>
 
    )
}
 