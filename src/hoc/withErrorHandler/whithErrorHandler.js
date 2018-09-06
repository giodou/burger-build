import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliar/Auxiliar';

const withErrorHandler = (WrappedElement, axios) => {
    return class extends Component {

        state = {
            error: null
        }

        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(request =>{
                this.setState({error: null})
                return request;
            })
            
            this.resInterceptor = axios.interceptors.response.use(res => {
                return res;
            }, error =>{
                this.setState({error: error})
            })
        }

        //clean this interceptors when they is not required anymore
        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () =>{
            this.setState({error: null})
        }

        render() {
            return (
                <Aux>
                    <Modal show={this.state.error}  modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedElement {...this.props} />
                </Aux>
            )

        }
    }
}

export default withErrorHandler;