import React, { Component } from 'react';

export const FormContext = React.createContext();

const withForm = (WrappedComponent) => {
    return class Form extends Component {
        constructor (props) {
            super(props);
            this.state = { };
        }

        handleInputChange = event => {
            const { name, value } = event.target;            
            this.setState({ [name]: value });           
        }

        handleSubmit = event => {
            event.preventDefault();
            this.props.onSubmit(this.state);
        }

        render() {
            return (
                <FormContext.Provider value={ { inputs: this.state, handleInputChange: this.handleInputChange } }>
                    <WrappedComponent {...this.props} onSubmit={this.handleSubmit} />
                </FormContext.Provider>
            )
        }
    }
};

export default withForm;