import React, { useState, useEffect } from 'react'

import Jumbotron from 'react-bootstrap/Jumbotron'; 
import { getCategories } from '../../services/category';
import { getSubCategoriesByCategory } from '../../services/subcategory';
import { getProductTypesBySubCategory } from '../../services/producttype';
import { getLabels } from '../../services/label';
import { createProduct, subirImagen } from '../../services/product';
import Swal from 'sweetalert2';
import { useHistory } from  'react-router-dom';

import {storage} from '../../FirestoreConfig';
import { Controller, useForm } from "react-hook-form";

import { v4 as uuidv4 } from 'uuid';

let imagenProducto;

export default function CreateProduct(){

  

    const history = useHistory();
    let { control, register, handleSubmit, errors} = useForm();

    const [labels, setLabels] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [productTypes, setProductTypes] = useState([]);
  
    const manejarImagen = (e) => {
        e.preventDefault();
        let  miImagen = e.target.files[0];
        console.log(miImagen)
        imagenProducto = miImagen;
    }

    const manejarSubmit  = async (data) => {    

        let product = {...data, productPrice: parseFloat(data.productPrice), productStock: parseFloat(data.productStock)}
        let uuid =  uuidv4();
       const refStorage = storage.ref(`productos/${uuid}`);

        subirImagen(imagenProducto, refStorage)
        .then(async (urlImagen) => {
            //Crear el producto
            console.log("urlImagen", urlImagen);
            await createProduct({...product, productImg: urlImagen}); 

            Swal.fire({
                icon: "success",
                title: "Producto creado exitosamente",
                showConfirmButton: false,
                timer: 1000
            })

            return history.push('/product');
        })     
        
    }
  
    const getCategory = async () => {
        let data = await getCategories(); 
        setCategories(data);
    } 

    const getSubCategory = async (categoryId) => { 
        let data = await getSubCategoriesByCategory(categoryId); 
        setSubCategories(data);
    } 

    const getProductType = async (subCategoryId) => { 
        let data = await getProductTypesBySubCategory(subCategoryId); 
        setProductTypes(data);
    } 

    const getLabel = async () => {
        let data = await getLabels(); 
        setLabels(data);
    }  

    const asignarCategoria = (categoria) =>{
        getSubCategory(categoria);
    }

    const asignarSubCategoria = (subcategoria) =>{
        getProductType(subcategoria);
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
        getLabel();
    },[])

    return (

        <div className="d-flex justify-content-center">
              <form
                onSubmit={handleSubmit(manejarSubmit)}
                >

                    <div style={{width: '600px', marginTop: '5rem', marginBottom: '1rem'}}>
                        <div className="card mt-3">
                            <div className="card-body" style={{paddingTop:'10px', paddingBottom: '0px'}}>

                                <h1 className="align-self-center">Agregar un nuevo producto</h1>  
            

                                <div className="form-group">
                                    <label>Categoria de Producto</label>
                                    <select name="productcategoryId" className="form-control" 
                                        onChange={(ev) => {asignarCategoria(ev.target.value)}}
                                        ref={register({validate:validateSelect})
                                    }>
                                        <option value="0">Seleccionar Categoria</option> 
                                        {
                                            categories.map((elm,i) => (
                                                <option key={i} value={elm.id}>{elm.categoryName}</option>
                                            ))
                                        }
                                    </select>
                                    {
                                        errors.productcategoryId && errors.productcategoryId.type ==="validate" && (
                                            <small className="text-danger font-weight-bold">Debe seleccionar una categoria de producto</small>
                                        )
                                    }
                                </div>

                                <div className="form-group">
                                    <label>Subcategoria de Producto</label>
                                    <select name="productsubcategoryId" className="form-control" 
                                        onChange={(ev) => {asignarSubCategoria(ev.target.value)}}
                                        ref={register({validate:validateSelect})
                                    }>
                                        <option value="0">Seleccionar Subcategoria</option> 
                                        {
                                            subCategories.map((elm,i) => (
                                                <option key={i} value={elm.id}>{elm.subcategoryName}</option>
                                            ))
                                        }
                                    </select>
                                    {
                                        errors.productsubcategoryId && errors.productsubcategoryId.type ==="validate" && (
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
                                                <option key={i} value={elm.id}>{elm.producttypeName}</option>
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
                                                <option key={i} value={elm.id}>{elm.labelName}</option>
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
                                    <label htmlFor="productDescription">Descripción Producto:</label>
                                    <textarea
                                    className="form-control"
                                    id="productDescription"
                                    name="productDescription"
                                    ref={register({required:true, minLength:20, maxLength:250})}
                                    />
                                    {errors.productDescription && errors.productDescription.type === 'required' && (
                                    <small className="text-danger font-weight-bold">Debe ingresar la descripción del producto</small>
                                    )}
                                    {
                                        errors.productDescription && errors.productDescription.type === "minLength" && (
                                            <small className="text-danger font-weight-bold">La descripción no puede ser menor a 20 digitos</small>
                                        )
                                    }
                                    {
                                        errors.productDescription && errors.productDescription.type === "maxLength" && (
                                            <small className="text-danger font-weight-bold">La descripción no puede ser mayor a 250 digitos</small>
                                        )
                                    }
                                </div>

                                <div className="form-group">
                                    <label htmlFor="productMark">Marca Producto:</label>
                                    <input
                                    type="text"
                                    className="form-control"
                                    id="productMark"
                                    name="productMark"
                                    ref={register({required:true, minLength:2, maxLength:20})}
                                    />
                                    {errors.productMark && errors.productMark.type === 'required' && (
                                    <small className="text-danger font-weight-bold">Debe ingresar la marca del producto</small>
                                    )}
                                    {
                                        errors.productMark && errors.productMark.type === "minLength" && (
                                            <small className="text-danger font-weight-bold">La marca no puede ser menor a 2 digitos</small>
                                        )
                                    }
                                    {
                                        errors.productMark && errors.productMark.type === "maxLength" && (
                                            <small className="text-danger font-weight-bold">La marca no puede ser mayor a 20 digitos</small>
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
                                    <label htmlFor="productPrice">Stock Producto:</label>
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
                                Agregar nuevo producto
                            </button>

                            </div>
                        </div> 
                    </div>

                </form>

            </div>
 
    )
}
 