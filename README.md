# Depatitos frontend

Front de depatitos hecho con React y Redux.

## Características y dependencias
* Uso de Redux avanzado (Thunks, multiple reducers, async creators y connected middlewares)
* Aplicación completamente responsive utilizando flexbox y la librería de bootstrap
* Integración con API vía JWT
* Uso de Google Recaptcha como primera barrera antibots
* Internacionalización de la web y language-detector.
* Compartir anuncios via RRSS

El proyecto hace uso de las siguientes dependencias:

* react
* react-dom
* react-google-recaptcha
* react-redux
* react-router-dom
* react-i18next
* react-share
* redux
* redux-logger
* redux-thunk
* i18next
* i18next-browser-languagedetector
* axios

A nivel de desarrollo también se hace uso de las devtools de redux mediante:
* redux-devtools-extension


### React
Todo el front está desarrollado por React. El listado de rutas de la web es el siguiente:

#### Zona privada

* Dar de baja: `/my-zone/unsubscribe`
* Actualizar mis datos: `/my-zone/update-my-data`
* Crear un anuncio: `/my-zone/create-advert`
* Editar un anuncio: `/my-zone/edit-advert/:id`
* Ver mis anuncios: `/my-zone/my-adverts`
* Ver mis anuncios favoritos: `/my-zone/favourite-adverts`
* Mi zona: `/my-zone`

#### Zona pública
* Iniciar sesión: `/sign-in`
* Registrarme: `/sign-up`
* Ver perfil de un usuario: `/profile/:slug/:username/:id`
* Ver un anuncio en detalle: `/advert/:advertSlug/:id`
* Olvidé mi contraseña: `/forgot-password`
* Homepage: `/`
* Cualquier otra ruta que derive a 404: `*`

### Redux 
Utilizo redux para almacenar toda la información referente a:
* Anuncios
* Usuario logado y su token JWT
* Tags
* Algún mensaje de error
* Paginación del listado actual de anuncios

Redux prácticamente todas las llamadas a la API mediante sus actions, ya que casi todo lo que nos interese consultar vía API, se almacena en el store.


## Scripts disponibles

En la raíz del proyecto, puedes lanzar los siguientes comandos:

### `yarn start`

Lanza la aplicación en el modo de desarrollo.<br /> Abre [http://localhost:3000](http://localhost:3000) para verlo en el navegador.

### `yarn build`

Hace el build de la app para producción y la almacena en la carpeta `build`.<br />
