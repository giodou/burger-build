import React, { Component } from 'react';

import axios from '../../axios-order';
import Aux from '../../hoc/Auxiliar/Auxiliar';
import Burger from '../../components/Burger/Burger';
import BuilControls from '../../components/Burger/BuildControls/BuildControls';

import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/whithErrorHandler';

class BurgerBuilder extends Component {

    state = {
        ingredients: [],
        purchasable: false,
        purchasing: false,
        totalPrice: 4,
        loading: false
    }

    componentDidMount() {
        axios.get('/ingredients.json')
            .then(response => {

                const defaultPrice = Object.values(response.data).map((ingredient => {
                    return ingredient;
                })).reduce((sum, el) => {
                    return sum + (el.quantity * el.price);
                }, 0)

                this.setState({ 
                    ingredients: Object.values(response.data),
                    totalPrice: this.state.totalPrice + defaultPrice
                })

                this.updatePurchasable(response.data)
            })
    }

    updatePurchasable(ingredients) {
        const totalAddedItens = Object.values(ingredients).map((ingredient => {
            return ingredient;
        })).reduce((sum, el) => {
            return sum + el.quantity;
        }, 0);

        this.setState({
            purchasable: totalAddedItens > 0
        })
    }

    removeIngredientHandler = (ingredient) => {
        if (ingredient.quantity > 0) {
            const updatedIngredients = [...this.state.ingredients];
            const updatedTotalPrice = this.state.totalPrice - ingredient.price;

            updatedIngredients.map(updatedIngredient =>{
                if(updatedIngredient === ingredient){
                    updatedIngredient.quantity--;
                }

                return updatedIngredient;
            })
            
            this.setState({
                ingredients: updatedIngredients,
                totalPrice: updatedTotalPrice
            });

            this.updatePurchasable(updatedIngredients);
        }
    }

    addIngredienthandler = (ingredient) => {
        const updateIngredients = [ ...this.state.ingredients ];
        let updatedTotalPrice = this.state.totalPrice;

        updateIngredients.map(ingredientUpdated =>{
            if(ingredient === ingredientUpdated)
            {
                ingredientUpdated.quantity++;
                updatedTotalPrice = updatedTotalPrice + ingredient.price;
            }
            
            return ingredientUpdated;
        })

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
        this.setState({
            loading: true
        })

        const order = {
            ingredients: [...this.state.ingredients].map(ingredient =>{
                if(ingredient.quantity > 0)
                    return ingredient;
            }),
            price: this.state.price,
            customer: {
                name: 'Giovane Timm',
                adress: 'Rua paraná, 530',
                city: 'Toledo',
                zipCode: '85909563'
            },
            deliveryMethod: 'fastest'
        }

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false, purchasing: false })
            })
            .catch(error => {
                this.setState({ loading: false, purchasing: false })
            })
    }

    render() {
        let burgerElement = <Spinner />;
        let orderSummary = <Spinner />;

        if (this.state.ingredients) {
            burgerElement = (
                <Aux>            
                    <Burger ingredients={this.state.ingredients} />
                    <BuilControls
                        ingredients={this.state.ingredients}
                        purchasable={this.state.purchasable}
                        totalPrice={this.state.totalPrice}
                        lessClick={this.removeIngredientHandler}
                        moreClick={this.addIngredienthandler}
                        purchaseClick={this.purchaseHandler}
                        />
                </Aux>
            )

            orderSummary = <OrderSummary
                            ingredients={this.state.ingredients}
                            purchaseCancelled={this.purchaseCancelHandler}
                            purchaseContinued={this.purchaseContinueHandler}
                            total={this.state.totalPrice} />

        }

        if (this.state.loading)
            orderSummary = <Spinner />

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>

                {burgerElement}

            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);