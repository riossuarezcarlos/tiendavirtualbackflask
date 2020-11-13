import React, {useState, useEffect, useContext} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AccordionDetails from '@material-ui/core/AccordionDetails'; 
import {Link} from "react-router-dom"; 

import {NavSideContext} from '../context/navSideContext';
import { getSubCategoriesByCategory } from '../services/subcategory';

import ListGroup from 'react-bootstrap/ListGroup'

import './css/CNavSide.css';

export default function CNavSubCategory({categoryId}) { 
    const [subcategory, setSubCategories] = useState([]);
    const { toggleDrawer } = useContext(NavSideContext); 
    const getSubCategory = async () => { 
        let data = await getSubCategoriesByCategory(categoryId);
        setSubCategories(data);
    } 

    useEffect(() => {
        getSubCategory();
        toggleDrawer('left', false);
    },[categoryId])

    return (
        <div>
            {
                subcategory.map((sub, i) => (
                    <AccordionDetails key={i} className="removeSpace subcategory">
                        <ListItem  key={sub.subcategoryName} button>
                            <Link to={`/search/${sub.id}/${sub.subcategoryName}`}>
                                <ListItemText primary={sub.subcategoryName} />
                            </Link>   
                        </ListItem>    
                    </AccordionDetails>
                ))
            }
        </div>
    )
}
