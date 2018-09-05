import React from 'react'

import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'
import Price from '../Price/Price'



const buildControls = (props) =>(
    <div className={classes.BuildControls}>
        <Price>{props.totalPrice}</Price>
        {props.ingredients.map(ingredient =>(
            <BuildControl 
                        key={ingredient.label} 
                        label={ingredient.label}
                        disabledLessIngredient={ingredient.quantity <= 0}
                        lessClicked={() => props.lessClick(ingredient)}
                        moreClicked={() => props.moreClick(ingredient)}
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