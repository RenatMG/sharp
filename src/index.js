import React from 'react';
import './index.scss'

import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom'
import {Provider} from "react-redux";

import App from "./app/App";
import {configureStore} from "./store/configureStore";

const store = configureStore();
const rootElement = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App/>
        </Router>
    </Provider>,
    rootElement
);

