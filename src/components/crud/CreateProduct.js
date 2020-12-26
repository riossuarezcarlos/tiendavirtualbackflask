import React, { useState, useEffect } from 'react'

import { getCategories, getCategoriesbyId } from '../../services/category';
import { getSubCategoriesbyId } from '../../services/subcategory';
import { getProductTypesbyId, getProductTypesBySubCategory } from '../../services/producttype';
import { getLabels } from '../../services/label';
import { getMarks } from '../../services/mark';
import { createProduct, updateProduct, getProductbyId, subirImagen } from '../../services/product';
import Swal from 'sweetalert2';
import { useHistory } from  'react-router-dom';

import {storage} from '../../FirestoreConfig';
import { useForm } from "react-hook-form";

import { v4 as uuidv4 } from 'uuid';

let imagenProducto;

export default function CreateProduct(props){

    const {id} = props.match.params;

    const history = useHistory();
    let { register, handleSubmit, setValue, errors} = useForm();

    const [labels, setLabels] = useState([]);
    const [marks, setMarks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [productTypes, setProductTypes] = useState([]);
 
    const getProduct = async () => {
        if(id !== undefined){
            let data = await getProductbyId(id);
            console.log("object", data)
 
            setValue("productDesc",data.descripcion);
            setValue("productName",data.nombre);
            setValue("productPrice",data.precio);
            setValue("productStock",data.stock);
      
            await getSubCategory(data.categoria);
            await getProductType(data.subcategoria);
            
            setValue("producttypeId",data.tipoproducto);
            setValue("markId",data.marca);
            setValue("labelId",data.etiqueta);        
            setValue("categoryId",data.categoria);      
            setValue("subcategoryId",data.subcategoria);
        }
    }
  
    const manejarImagen = (e) => {
        e.preventDefault();
        let  miImagen = e.target.files[0]; 
        imagenProducto = miImagen;
        console.log(imagenProducto.name)
    }

    const manejarSubmit  = async (data) => {    
 
        let uuid =  uuidv4(); 

        let product = {...data, productPrice: parseFloat(data.productPrice)}
 
        // Registrar la imagen solo si se ha seleccionado una
        let dataImage = await subirImagen(imagenProducto, imagenProducto.name)
        if (dataImage.ok === true) {
            //Crear el producto
            if(id === undefined){ 
                await createProduct({...product, productImg: dataImage.content}); 

            } else {
                await updateProduct({...product, productImg: dataImage.content}, id); 
            }
            Swal.fire({
                icon: "success",
                title: "Producto creado exitosamente",
                showConfirmButton: false,
                timer: 1000
            });
            return history.push('/product'); 
        }else{
            console.log("Error al subir la imagen")
        }  

    }
  
    const getCategory = async () => {
        let data = await getCategories(); 
        setCategories(data);
    } 

    const getSubCategory = async (categoryId) => { 
        let data = await getCategoriesbyId(categoryId); 
        data && setSubCategories(data.subcategorias);
    } 

    const getProductType = async (subCategoryId) => { 
        
        let data = await getSubCategoriesbyId(subCategoryId); 
        console.log("object", data)
        data && setProductTypes(data.tipos);
    } 

    const getLabel = async () => {
        let data = await getLabels(); 
        setLabels(data);
    }  

    const getMark = async () => {
        let data = await getMarks(); 
        setMarks(data);
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

    const showSelect = async () => {
        await getMark();
        await getCategory();
        await getLabel();
    }
    

    useEffect(() => {
        showSelect();

        getProduct();
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
                                        id ? "Actualizar producto" : "Agregar nuevo producto"
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
                                            <small className="text-danger font-weight-bold">Debe seleccionar una categoria de producto</small>
                                        )
                                    }
                                </div>

                                <div className="form-group">
                                    <label>Subcategoria de Producto</label>
                                    <select name="subcategoryId" className="form-control" 
                                        onChange={(ev) => {getProductType(ev.target.value)}}
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
                                            <small className="text-danger font-weight-bold">Debe seleccionar una subcategoria de producto</small>
                                        )
                                    }
                                </div>

                                <div className="form-group">
                                    <label>Tipo de Producto</label>
                                    <select name="producttypeId" className="form-control" 
                                        ref={register({validate:validateSelect})
                                    }>
                                        <option value="0">Seleccionar Tipo</option> 
                                        {
                                            productTypes.map((elm,i) => (
                                                <option key={i} value={elm.id}>{elm.descripcion}</option>
                                            ))
                                        }
                                    </select>
                                    {
                                        errors.producttypeId && errors.producttypeId.type ==="validate" && (
                                            <small className="text-danger font-weight-bold">Debe seleccionar un tipo de producto</small>
                                        )
                                    }
                                </div>

                                <div className="form-group">
                                    <label>Etiqueta de Producto</label>
                                    <select name="labelId" className="form-control" 
                                        ref={register({validate:validateSelect})
                                    }>
                                        <option value="0">Seleccionar Etiqueta</option> 
                                        {
                                            labels.map((elm,i) => (
                                                <option key={i} value={elm.id}>{elm.descripcion}</option>
                                            ))
                                        }
                                    </select>
                                    {
                                        errors.labelId && errors.labelId.type ==="validate" && (
                                            <small className="text-danger font-weight-bold">Debe seleccionar una etiqueta de producto</small>
                                        )
                                    }
                                </div>

                                <div className="form-group">
                                    <label>Marca de Producto</label>
                                    <select name="markId" className="form-control" 
                                        ref={register({validate:validateSelect})
                                    }>
                                        <option value="0">Seleccionar Marca</option> 
                                        {
                                            marks.map((elm,i) => (
                                                <option key={i} value={elm.id}>{elm.descripcion}</option>
                                            ))
                                        }
                                    </select>
                                    {
                                        errors.markId && errors.markId.type ==="validate" && (
                                            <small className="text-danger font-weight-bold">Debe seleccionar una etiqueta de producto</small>
                                        )
                                    }
                                </div> 
                                
                                <div className="form-group">
                                    <label htmlFor="productName">Nombre Producto:</label>
                                    <input
                                    type="text"
                                    className="form-control"
                                    id="productName"
                                    name="productName"
                                    ref={register({required:true, minLength:10, maxLength:100})}
                                    />
                                    {errors.productName && errors.productName.type === 'required' && (
                                    <small className="text-danger font-weight-bold">Debe ingresar el nombre del producto</small>
                                    )}
                                    {
                                        errors.productName && errors.productName.type === "minLength" && (
                                            <small className="text-danger font-weight-bold">El nombre no puede ser menor a 10 digitos</small>
                                        )
                                    }
                                    {
                                        errors.productName && errors.productName.type === "maxLength" && (
                                            <small className="text-danger font-weight-bold">El nombre no puede ser mayor a 100 digitos</small>
                                        )
                                    }
                                </div>

                                <div className="form-group">
                                    <label htmlFor="productDesc">Descripción Producto:</label>
                                    <textarea
                                    className="form-control"
                                    id="productDesc"
                                    name="productDesc"
                                    ref={register({required:true, minLength:20, maxLength:250})}
                                    />
                                    {errors.productDesc && errors.productDesc.type === 'required' && (
                                    <small className="text-danger font-weight-bold">Debe ingresar la descripción del producto</small>
                                    )}
                                    {
                                        errors.productDesc && errors.productDesc.type === "minLength" && (
                                            <small className="text-danger font-weight-bold">La descripción no puede ser menor a 20 digitos</small>
                                        )
                                    }
                                    {
                                        errors.productDesc && errors.productDesc.type === "maxLength" && (
                                            <small className="text-danger font-weight-bold">La descripción no puede ser mayor a 250 digitos</small>
                                        )
                                    }
                                </div>
  
                                <div className="form-group">
                                    <label htmlFor="productPrice">Precio Producto:</label>
 
                                    <input
                                    type="number"
                                    className="form-control"
                                    id="productPrice"
                                    name="productPrice" 
                                    ref={register({required:true,min:1})}
                                    />
                                    {errors.productPrice && errors.productPrice.type === 'required' && (
                                    <small className="text-danger font-weight-bold">Debe ingresar el precio del producto</small>
                                    )}
                                    {errors.productPrice && errors.productPrice.type === 'min' && (
                                    <small className="text-danger font-weight-bold">El precio del producto no puede ser menor a 1</small>
                                    )} 
                                </div>

                                <div className="form-group">
                                    <label htmlFor="productStock">Stock Producto:</label>
                                    <input
                                    type="number"
                                    className="form-control"
                                    id="productStock"
                                    name="productStock"
                                    ref={register({required:true,min:1})}
                                    />
                                    {errors.productStock && errors.productStock.type === 'required' && (
                                    <small className="text-danger font-weight-bold">Debe ingresar el Stock del producto</small>
                                    )}
                                    {errors.productStock && errors.productStock.type === 'min' && (
                                    <small className="text-danger font-weight-bold">El stock del producto no puede ser menor a 1</small>
                                    )}
                                </div>
                        
                                <div className="form-group">
                                        <label htmlFor="productImg">Elegir Imagen</label>
                                        <input
                                        type="file"
                                        accept="image/*" 
                                        onChange={(e) => {
                                                manejarImagen(e);
                                            }}
                                        className="form-control"
                                        id="productImg"
                                        name="productImg"
                                        ref={register({required:true})}
                                        />
                                        {errors.productImg && errors.productImg.type === 'required' && (
                                        <small className="text-danger font-weight-bold">Debe seleccionar una imagen</small>
                                        )}
                                </div> 
            
                                <button type="submit" className="btn btn-primary btn-lg btn-block">
                                    {
                                        id ? "Actualizar producto" : "Agregar nuevo producto"
                                    }
                                </button>

                            </div>
                        </div> 
                    </div>

                </form>

            </div>
 
    )
}
  