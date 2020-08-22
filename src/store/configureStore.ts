import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from '../reducers/index';

export const history = createBrowserHistory()

export default function configureStore(preloadedState?: any) {
    const store = createStore(
        createRootReducer(history),
        preloadedState,
        applyMiddleware(
            routerMiddleware(history),
            thunk
        ),
    )

    return store;
}
