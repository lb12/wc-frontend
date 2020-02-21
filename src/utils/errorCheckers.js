export default (responseError, t) => {
  const { success, error, message } = responseError.data;
  const errorMessage = [];

  if (!success) {
    if (message && message.length > 0) {
      // error devuelto por el API por nosotros
      errorMessage.push(t(message));
    } else if (error && error.errors) {
      // error devuelto por el API por un campo malformado
      const { errors } = error;

      for (const errorProp in errors) {
        errorMessage.push(t(errors[errorProp].msg));
      }
    }
  }

  return errorMessage;
};
