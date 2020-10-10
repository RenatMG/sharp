import React from 'react';
import {Switch, Route} from 'react-router-dom'


const Routes = () => {
    return (
        <Switch>
            <Route path={'/'} component={Auth}/>

        </Switch>
    );
};

export default Routes;