import React from 'react';
import Popover from '@material-ui/core/Popover';

export default function CCarrito() {
    return (
        <div>
            <Popover 
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}>
                <h1>Mi Carrito</h1>
            </Popover>
        </div>
    )
}
