import React, { useState,useEffect } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import CNavSubCategory from './CNavSubCategory';
import { getCategories } from '../services/category'; 

import './css/CNavSide.css'; 
  
export default function CNavSide() {
    const [categories, setCategories] = useState([]); 

    const getCategory = async () => {
        let data = await getCategories(); 
        setCategories(data); 
    } 
  
    useEffect(() => {
        getCategory(); 
    },[])

    return (
        <div>
            <div className="d-flex justify-content-center clogo">
                <img src="https://riossuarezcarlos.github.io/proyectogrupo4/src/img/logo.png" alt="..."  className="logo"/>
            </div>
            <div className="categorybox">
            {
                categories.map((cat, i) => (
                    <Accordion key={i}>
                        <AccordionSummary  aria-controls="panel1a-content" id="panel1a-header"> 
                                {cat.categoryName} 
                        </AccordionSummary>
                        <CNavSubCategory categoryId={cat.id} />
                    </Accordion> 
                ))
            }
            </div>
        </div>
    )
}