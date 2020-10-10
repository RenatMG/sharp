import React from 'react';
import './App.scss';

import {Redirect, Route, Switch} from "react-router-dom";

import {Home, Auth, Personal} from "../pages";
import {Header} from "../features";



const App = () => {

    return (
        <>
            <Route path={'/'} exact component={Home}/>
            <Route path='/(.+)' render={() => (
                <>
                    <Header/>
                    <Switch>
                        <Route path={['/register', '/login']} component={Auth}/>
                        <Route path={'/personal'} component={Personal}/>
                        <Redirect to={'/'}/>
                    </Switch>
                </>
            )}/>
        </>
    );
};

export default App;
