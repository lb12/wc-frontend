import React from 'react';

import withForm from './withForm.js';

// Componente reusable para formularios.
// Se exporta wrappeado en un HOC que nos permite controlare cambios en el input y el submit del form.
const Form = ({children, ...props}) => <form {...props}> {children} </form>;

export default withForm(Form);