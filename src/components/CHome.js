import React, { useState, useEffect } from 'react';
import CLabel from './CLabel';
 
import { getLabels } from '../services/label';
 

export default function CCategory() {
 
    const [labels, setLabels] = useState([]);

    const getLabel = async () => {
        let label = await getLabels();
        setLabels(label);  
    }
 
    useEffect(() => {
        getLabel();
    }, []) 

    return (
        <div>
        {
            labels.map((lab,i) => (
                <CLabel label={lab} key={i}/>
            ))
        }
        </div>
    )
}
