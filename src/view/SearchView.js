import React, {useState, useEffect, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import Typography from '@material-ui/core/Typography';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import FormGroup from '@material-ui/core/FormGroup'; 

import CProduct from '../components/CProduct';
import CSearchSubCategory from '../components/CSearchSubCategory';
import { getProductTypesBySubCategory } from '../services/producttype';
import { searchProducts } from '../services/product';

import {CarritoContext} from '../context/carritoContext';

import "./styles/Search.css"

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }));

export default function SearchView(props) {    
    const classes = useStyles();

    const { busqueda } = useContext(CarritoContext); 

    const [productTypeFilter, setProductTypeFilter] = useState(['']);
    const [productTypes, setProductTypes] = useState([]);
    const [productos, setProductos] = useState([]); 
    const [desde, setDesde] = useState(1); 
    const [hasta, setHasta] = useState(99999);  

    const getProductType = async () => {  
        let data = await getProductTypesBySubCategory(props.match.params.subCategoryId); 
        setProductTypes(data); 
    } 

    const getProducts = async () => {  
        let mydesde = 1;
        let myhasta = 9999;
        if(desde != undefined && desde != '') {
            mydesde = desde;
        }
        if(hasta != undefined && hasta != '') {
            myhasta = hasta;
        } 
        let products = await searchProducts(productTypeFilter, mydesde, myhasta);
 
        let textBuscar = '';
        if (busqueda != '') {
            textBuscar = busqueda;
        } 
        if(products != undefined){
            let prodFiltrados = products.filter(
                (prod) =>
                  prod.productName
                    .toLowerCase()
                    .includes(textBuscar.toLowerCase()) === true
              );
           
             setProductos(prodFiltrados);  
        }

    }


    const filtrarProductos = async (desde, hasta) => {  

        console.log("productTypeFilter", productTypeFilter)

        let mydesde = 1;
        let myhasta = 9999;
        if(desde != undefined && desde != '') {
            mydesde = desde;
        }
        if(hasta != undefined && hasta != '') {
            myhasta = hasta;
        } 
        let data = await searchProducts(productTypeFilter, mydesde, myhasta);
        setProductos(data);
    }

    const configFilter = (ev) => {
        let value = ev.target.value;
        if(ev.target.checked)
        { 
            setProductTypeFilter([...productTypeFilter, value]) 
        }
        else{
            let productTypeFilterTemp =  productTypeFilter.filter(prod => prod !== value);
            setProductTypeFilter(productTypeFilterTemp) 
        }
    }

    const setearDesde = (value) =>{
        setDesde(value);
        filtrarProductos(value, hasta);
    }

    const setearHasta = (value) =>{
        setHasta(value);
        filtrarProductos(hasta, value);
    }

    useEffect(() => {
        getProductType(); 
    }, [])

    useEffect(() => {
        filtrarProductos(desde, hasta);
    }, [productTypeFilter])
    
    useEffect(() => {
        getProducts();
    },[busqueda])
    
    return (
        <div style={{marginTop: '5rem', marginBottom: '1rem'}} className="d-flex flex-row">
            <div className="mt-3 mr-4 col-3 filtro">
            { 
                <Accordion defaultExpanded> 
                    <AccordionSummary expandIcon={<i className="fas fa-caret-down fa-1x"/>} aria-controls="panel1a-content" id="panel1a-header">
                        <Typography className={classes.heading}>{props.match.params.subCategoryName}</Typography>
                        
                    </AccordionSummary>
                    <AccordionDetails> 
                        <FormGroup>
                            {
                                productTypes.map((type, i) => ( 
                                    <CSearchSubCategory key={i} typeProductId={type.id} typeProductName={type.producttypeName} setTypeProduct={configFilter}/>
                                ))
                            } 
                            </FormGroup> 
                    </AccordionDetails>
                </Accordion>  
            } 


                <div className="card d-flex justify-content-around">
                    <div className="range">
                        <Typography className="mt-2" id="range-slider" gutterBottom>
                            Rango de precio
                        </Typography>
                        <div className="d-flex flex-row justify-content-evently">
                            <div>
                                <p>Desde</p>    
                                <input type="number" value={desde} min="1" max="99999" onChange={(e) => setearDesde(e.target.value)}/>
                            </div>
                            <div className="ml-2">
                                <p>Hasta</p>    
                                <input type="number" value={hasta} min="1" max="99999" onChange={(e) => setearHasta(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                </div>
            

            </div>
            <div className="row mt-2 d-flex justify-content-evently contenedor">
            {
                productos.map((prod, i) => (
                    <div className="col-12 col-sm-6 col-lg-4 p-0" key={i}>
                        <CProduct product={prod}/>
                    </div>
                ))
            }
            </div>
        </div>
    )
}
