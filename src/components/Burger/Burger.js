import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIgredient/BurgerIngredient';

const burger = (props) => {

    /**
     * Transform the ingredients properts into an array of BurgerIngredient component
     */
    let transformedIngredients = Object.keys(props.ingredients).map(igKey =>{
        return [...Array(props.ingredients[igKey])].map((_, i) => {
            return <BurgerIngredient key={igKey + i} type={igKey} />;
        })
    }).reduce((arr, el) =>{
        return arr.concat(el);    
    }, []);

    console.log(transformedIngredients);

    if(transformedIngredients.length === 0 )
        transformedIngredients = <p>Please, start adding ingredients</p>;

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;