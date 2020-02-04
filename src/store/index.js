import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import * as reducers from './reducers';

const loggerMiddleware = createLogger();
const composeEnhancers = composeWithDevTools;

/**
 * Store configuration
 * @param [preloadedState] The initial state to restore a previously serialized user session
 */
export const storeConfiguration = preloadedState => {
    const reducer = combineReducers(reducers);
    const middlewares = [ thunkMiddleware, loggerMiddleware ];
    return createStore(reducer, preloadedState, composeEnhancers( applyMiddleware(...middlewares) ));
};
