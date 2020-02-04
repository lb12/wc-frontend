import React, { useContext } from 'react';

import { FormContext } from '../Form';


// Componente input propio

const Input = props => {
    const context = useContext(FormContext); // Contexto que wrappea al HOC del Form 

    return (
        <input
            type={ props.type }
            id={ props.id }
            name={ props.name }
            value={ context.inputs[props.name] || '' }
            onChange={ context.handleInputChange }
            placeholder={ props.placeholder }
            required={ props.required }
            className={ props.className }
        />
    )
};

export default Input;