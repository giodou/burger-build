import React from 'react';

import Aux from '../../../hoc/Auxiliar/Auxiliar';


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

            <p>Go to purchase now?</p>
        </Aux>
    );
}


export default orderSummary;

