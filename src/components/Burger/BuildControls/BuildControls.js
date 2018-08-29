import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
]

const buildControls = (props) =>(
    <div className={classes.BuildControls}>
        <p>Total price: <strong>${props.totalPrice.toFixed(2)}</strong></p>
        {controls.map(control =>(
            <BuildControl 
                        key={control.label} 
                        label={control.label}
                        disabledLessIngredient={props.disabledLessIngredients[control.type]}
                        lessClicked={() => props.lessClick(control.type)}
                        moreClicked={() => props.moreClick(control.type)}
                        />    
        ))}
        <button disabled={!props.purchasable} className={classes.OrderButton}>ORDER NOW</button>
    </div>
);

export default buildControls;