import React, {useState, useContext, useEffect} from 'react';
import {Form } from 'react-bootstrap';
import { CarritoContext } from '../../context/carritoContext'; 
import { useForm } from "react-hook-form";

export default function CPayData({handleNext}) {
    let { register, handleSubmit, errors} = useForm();

    const { order, setOrderGen } = useContext(CarritoContext); 

    const [numero, setNumero] = useState([]);
    const [nombre, setNombre] = useState([]);
    const [mes, setMes] = useState([]);
    const [anio, setAnio] = useState([]);
    const [ccv, setCCV] = useState([]);

    /** -------------------------------------------------------------------------------------------------------------------------- */
    const months = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Setiembre","Octubre","Noviembre","Diciembre"];
    let years = [];
    const setearYear = () =>{
        for (let i = 2020; i < 2031; i++) {
            years.push(i);
        }
    }
    setearYear()
    /** -------------------------------------------------------------------------------------------------------------------------- */ 
    
    let validateSelect = (value) => {
        console.log("value", value);
        if(value === "0"){
            return false;
        }else{
            return true;
        }
    }

    const manejarSubmit  = async (data) => {    
        handleNext();
    }

    const getData = () => { 
        setNumero(order.card_number);
        setNombre(order.card_name); 
        setMes(order.card_month); 
        setAnio(order.card_year); 
        setCCV(order.card_ccv); 
    }
 
    const setearNumero = (value) => {
        setNumero(value);
        setOrderGen('card_number', value);
    }
 
    const setearNombre = (value) => {
        setNombre(value);
        setOrderGen('card_name', value);
    }

    const setearMes = (value) => {
        setMes(value);
        setOrderGen('card_month', value);
    }

    const setearAnio = (value) => {
        setAnio(value);
        setOrderGen('card_year', value);
    }

    const setearCcv = (value) => {
        setCCV(value);
        setOrderGen('card_ccv', value);
    } 

    useEffect(() => {
        getData();
    }, [])
  
    return (
        <div className="d-flex justify-content-center">
            <div style={{width: '400px'}}>
                <div className="card mt-3">
                    <div className="card-body">
                        <h2 className="card-title">
                            Pago
                        </h2>
                        <form onSubmit={handleSubmit(manejarSubmit)}>

                            <div className="form-group">
                                <label htmlFor="productName">Número de la tarjeta:</label>
                                <input
                                type="text"
                                className="form-control"
                                id="card_number"
                                name="card_number"
                                value={numero} onChange={(ev) => setearNumero(ev.target.value)} placeholder="Ingresar Número"
                                ref={register({required:true, minLength:16, maxLength:16})}
                                />
                                {errors.card_number && errors.card_number.type === 'required' && (
                                <small className="text-danger font-weight-bold">Debe ingresar el número de la tarjeta</small>
                                )}
                                {
                                    errors.card_number && errors.card_number.type === "minLength" && (
                                        <small className="text-danger font-weight-bold">El nombre no puede ser menor a 16 digitos</small>
                                    )
                                }
                                {
                                    errors.card_number && errors.card_number.type === "maxLength" && (
                                        <small className="text-danger font-weight-bold">El nombre no puede ser mayor a 16 digitos</small>
                                    )
                                }
                            </div>

                            <div className="form-group">
                                <label htmlFor="productName">Nombre que figura en la tarjeta:</label>
                                <input
                                type="text"
                                className="form-control"
                                id="card_name"
                                name="card_name"
                                value={nombre} onChange={(ev) => setearNombre(ev.target.value)} placeholder="Ingresar Nombre"
                                ref={register({required:true, minLength:3, maxLength:50})}
                                />
                                {errors.card_name && errors.card_name.type === 'required' && (
                                <small className="text-danger font-weight-bold">Debe ingresar el nombre de dueño de la tarjeta</small>
                                )}
                                {
                                    errors.card_name && errors.card_name.type === "minLength" && (
                                        <small className="text-danger font-weight-bold">El nombre del dueño de la tarjeta no puede ser menor a 3 digitos</small>
                                    )
                                }
                                {
                                    errors.card_name && errors.card_name.type === "maxLength" && (
                                        <small className="text-danger font-weight-bold">El nombre del dueño de la tarjeta no puede ser mayor a 50 digitos</small>
                                    )
                                }
                            </div>

                            <div className="form-group">
                                    <label>Mes:</label>
                                    <select name="card_month" className="form-control" 
                                        value={mes} onChange={(ev) => setearMes(ev.target.value)}
                                        ref={register({validate:validateSelect})
                                    }>
                                        <option key={0} value={0}>Mes</option> 
                                        {
                                            months.map((month, i) => (
                                                <option key={i + 1} value={i + 1}>{month}</option> 
                                            )) 
                                        } 
                                    </select>
                                    {
                                        errors.card_month && errors.card_month.type ==="validate" && (
                                            <small className="text-danger font-weight-bold">Debe seleccionar una mes</small>
                                        )
                                    }
                            </div>

                            <div className="form-group">
                                    <label>Año:</label>
                                    <select name="card_year" className="form-control" 
                                        value={anio} onChange={(ev) => setearAnio(ev.target.value)}
                                        ref={register({validate:validateSelect})
                                    }>
                                        <option key={0} value={0}>Año</option> 
                                        {
                                            years.map((year) => (
                                                <option key={year} value={year}>{year}</option> 
                                            )) 
                                        } 
                                    </select>
                                    {
                                        errors.card_year && errors.card_year.type ==="validate" && (
                                            <small className="text-danger font-weight-bold">Debe seleccionar una mes</small>
                                        )
                                    }
                            </div> 

                            <div className="form-group">
                                <label htmlFor="productName">CCV:</label>
                                <input
                                type="text"
                                className="form-control"
                                id="card_ccv"
                                name="card_ccv"
                                value={ccv} onChange={(ev) => setearCcv(ev.target.value)} placeholder="Ingresar CCV"
                                ref={register({required:true, minLength:3, maxLength:3})}
                                />
                                {errors.card_ccv && errors.card_ccv.type === 'required' && (
                                <small className="text-danger font-weight-bold">Debe ingresar el CCV</small>
                                )}
                                {
                                    errors.card_ccv && errors.card_ccv.type === "minLength" && (
                                        <small className="text-danger font-weight-bold">El CCV no puede ser menor a 3 digitos</small>
                                    )
                                }
                                {
                                    errors.card_ccv && errors.card_ccv.type === "maxLength" && (
                                        <small className="text-danger font-weight-bold">El CCV no puede ser mayor a 3 digitos</small>
                                    )
                                }
                            </div> 

                            <button type="submit" className="btn btn-primary btn-lg btn-block">
                                Siguiente
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
