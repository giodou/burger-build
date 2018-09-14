import React from 'react'

import classes from './Burger.css'
import BurgerIngredient from './BurgerIgredient/BurgerIngredient'

const burger = (props) => {
    console.log('Props: ', props);

    /**
     * Transform the ingredients properts into an array of BurgerIngredient component
     */
    let transformedIngredients = props.ingredients.map(ingredient => {
        return [...Array(ingredient.quantity)].map((_, i) => {
            return <BurgerIngredient key={ingredient.label + i} type={ingredient.label} />
        })
    }).reduce((arr, el) => {
        return arr.concat(el)
    }, []);

    console.log(transformedIngredients)

    if (transformedIngredients.length === 0)
        transformedIngredients = <p>Please, start adding ingredients</p>

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger