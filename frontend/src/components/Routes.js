import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router';
import Home from '../pages/Home';
import Register from '../pages/Register';
import Login from '../pages/Login';

export default class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route path='/home' component={Home}/>
                <Route path='/register' component={Register}/>
                <Route path='/login' component={Login}/>
                <Redirect from="/" to="home"/>
            </Switch>
        );
    }
}