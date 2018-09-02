import React from 'react'

import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'
import Price from '../Price/Price'

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
]

const buildControls = (props) =>(
    <div className={classes.BuildControls}>
        <Price>{props.totalPrice}</Price>
        {controls.map(control =>(
            <BuildControl 
                        key={control.label} 
                        label={control.label}
                        disabledLessIngredient={props.disabledLessIngredients[control.type]}
                        lessClicked={() => props.lessClick(control.type)}
                        moreClicked={() => props.moreClick(control.type)}
                        />    
        ))}
        <button disabled={!props.purchasable} 
                className={classes.OrderButton}
                onClick={() => props.purchaseClick()}>
                ORDER NOW
        </button>
    </div>
);

export default buildControls