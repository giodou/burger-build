import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliar/Auxiliar';
import Burger from '../../components/Burger/Burger';
import BuilControls from '../../components/Burger/BuildControls/BuildControls';

import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

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
        purchasable: false,
        purchasing: false,
        totalPrice: 4
    }

    updatePurchasable(ingredients) {
        const totalAddedItens = Object.keys(ingredients).map((ingredient => {
            return ingredients[ingredient];
        })).reduce((sum, el) => {
            return sum + el;
        }, 0);

        this.setState({
            purchasable: totalAddedItens > 0
        })
    }

    removeIngredientHandler = (type) => {
        if (this.state.ingredients[type] > 0) {
            const updatedIngredients = { ...this.state.ingredients };
            const updatedTotalPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

            updatedIngredients[type] = updatedIngredients[type] - 1;

            this.setState({
                ingredients: updatedIngredients,
                totalPrice: updatedTotalPrice
            });

            this.updatePurchasable(updatedIngredients);
        }
    }

    addIngredienthandler = (type) => {
        const updateIngredients = { ...this.state.ingredients };
        updateIngredients[type] = updateIngredients[type] + 1;
        const updatedTotalPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

        this.setState({
            ingredients: updateIngredients,
            totalPrice: updatedTotalPrice
        });

        this.updatePurchasable(updateIngredients);
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        })
    }


    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        alert('You continue!');
    }

    render() {
        const disabledLessIngredients = { ...this.state.ingredients };

        for (let key in disabledLessIngredients) {
            disabledLessIngredients[key] = disabledLessIngredients[key] <= 0
        }

        return (
            <Aux>

                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}
                        total={this.state.totalPrice} />
                </Modal>


                <Burger ingredients={this.state.ingredients} />
                <BuilControls
                    purchasable={this.state.purchasable}
                    totalPrice={this.state.totalPrice}
                    lessClick={this.removeIngredientHandler}
                    moreClick={this.addIngredienthandler}
                    purchaseClick={this.purchaseHandler}
                    disabledLessIngredients={disabledLessIngredients} />
            </Aux>
        );
    }
}

export default BurgerBuilder;