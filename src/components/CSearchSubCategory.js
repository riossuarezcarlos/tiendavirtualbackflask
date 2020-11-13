import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function CSearchSubCategory({typeProductId,typeProductName, setTypeProduct}) {
    return (
        <FormControlLabel
            control={<Checkbox onChange={(ev) => setTypeProduct(ev)} value={typeProductId}  color="primary"/>}
            label={typeProductName}
        />
    )
}
