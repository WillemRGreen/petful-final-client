import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home'
import AdoptPage from './AdoptPage';
import { ContextProvider } from '../Context/Context';


const Router = () => (
    <ContextProvider>
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/adopt' component={AdoptPage} />
            </Switch>
        </BrowserRouter>
    </ContextProvider>
);

export default Router;