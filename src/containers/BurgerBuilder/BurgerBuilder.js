import React, {Component} from 'react';

import Aux from '../../hoc/Auxiliar/Auxiliar';
import Burger from '../../components/Burger/Burger';
import BuilControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad: 0.3,
    bacon: 0.7,
    cheese: 0.5,
    meat: 1.2
}

class BurgerBuilder extends Component {
    
    state = {
        ingredients: {
            salad: 0,
            meat: 0,
            cheese: 0,
            bacon: 0
        },
        totalPrice: 4
    }

    removeIngredientHandler = (type) =>{
        if(this.state.ingredients[type] > 0){
            const updatedIngredients = {...this.state.ingredients};
            const updatedTotalPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

            updatedIngredients[type] = updatedIngredients[type] - 1;

            this.setState({
                ingredients: updatedIngredients,
                totalPrice: updatedTotalPrice
            });
        }
        
    }

    addIngredienthandler = (type) =>{
        const updateIngredients = {...this.state.ingredients};
        updateIngredients[type] = updateIngredients[type] + 1;
        const updatedTotalPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

        this.setState({
            ingredients: updateIngredients,
            totalPrice: updatedTotalPrice
        });
    }

    render(){
        const disabledLessIngredients = {...this.state.ingredients};

        for(let key in disabledLessIngredients){
            disabledLessIngredients[key] = disabledLessIngredients[key] <= 0
        }

        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuilControls
                    totalPrice={this.state.totalPrice} 
                    lessClick={this.removeIngredientHandler} 
                    moreClick={this.addIngredienthandler}
                    disabledLessIngredients={disabledLessIngredients} />
            </Aux>
        );  
    }
}

export default BurgerBuilder;