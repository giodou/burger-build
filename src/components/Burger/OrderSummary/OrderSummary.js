import React from 'react';

import Aux from '../../../hoc/Auxiliar/Auxiliar';
import Button from '../../UI/Button/Button';
import Price from '../Price/Price'

const orderSummary = (props) => {

    const ingredientsSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredients[igKey]}
                </li>
            )
        });


    return (
        <Aux>
            <h1>That's yours nicelly order!</h1>
            <p>And that's the hers awesome ingredients</p>

            <ul>
                {ingredientsSummary}
            </ul>

            <Price>{props.total}</Price>

            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        </Aux>
    );
}


export default orderSummary;

