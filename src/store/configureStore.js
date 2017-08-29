import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import { routerMiddleware } from 'react-router-redux';
import { createBrowserHistory } from 'history';

export const browserHistory = createBrowserHistory();
const routingMiddleware = routerMiddleware(browserHistory);

var currentStore;

export function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(routingMiddleware)
    );

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers')
            store.replaceReducer(nextRootReducer)
        })
    }
    currentStore = store;
    return store;
}

export function dispatch() {
    return currentStore.dispatch.apply(currentStore,arguments);
}

export function getCurrentState() {
    return currentStore.getState();
}