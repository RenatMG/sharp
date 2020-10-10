import {createStore, applyMiddleware} from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk'
// import logger from 'redux-logger';

import rootReducer from "./rootReducer";

export const configureStore = () => {
    // return  createStore(rootReducer, composeWithDevTools(applyMiddleware(reduxThunk, logger)))
    return  createStore(rootReducer, composeWithDevTools(applyMiddleware(reduxThunk)))
};