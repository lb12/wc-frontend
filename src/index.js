// React imports
import React from "react";
import { render } from "react-dom";

// Global components imports
import App from "./components/App";
import "./utils/i18n";

// Component imports
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { storeConfiguration } from "./store";
import { initialState } from "./store/reducers";
import { getUser, setUser } from "./utils/storage";
import { getUserLogged } from "./services/APIService";

let user = {};

getUserLogged(getUser())
  .then(_user => { // Se obtiene el usuario con el token o un {}
    user = _user;
  })
  .catch( () => { // Si ocurriese algún error, simplemente no conectamos al usuario, para que vuelva a hacer login.
    user = {};
  })
  .finally(() => buildApp(user)); // Para ambos casos, construimos la SPA

const buildApp = user => {
  const preloadedState = { ...initialState, user };
  const store = storeConfiguration(preloadedState);

  // Guardar cualquier cambio del usuario en el LS
  store.subscribe(() => {
    const { user } = store.getState();
    user && setUser(user);
  });

  render(<App store={store} />, document.getElementById("root"));

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
};
