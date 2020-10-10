import React from 'react';
import {Switch, Route, withRouter} from 'react-router-dom'


import {Home} from "./pages";

import Header from "./components/Header/Header";



const Routes = () => {
    return (
        <>
            <Route path={'/'} exact component={Home}/>
            <Route path='/(.+)' render={() => (
                <>
                    <Header/>
                    <Switch>

                    </Switch>
                </>
            )}/>
        </>
    )
};

export default withRouter(Routes);