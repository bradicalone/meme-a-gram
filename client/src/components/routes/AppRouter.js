import React  from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Home from '../home/Home'
import Create from '../create/Create'
import View from '../view/View'
import Login from '../login/Login'
export const history = createBrowserHistory();

const AppRouter = (props) => {
    
    return (
        <>
            <Router history={history}>
                <Switch>
                    <Route path="/" component={Login} exact={true} />
                    <Route path="/home" component={Home} />
                    <Route path="/create" component={Create} />
                    <Route path="/view/:id" component={View} />
                </Switch>
            </Router>
        </>
    )
};

export default AppRouter