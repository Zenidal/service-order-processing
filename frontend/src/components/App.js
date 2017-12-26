import React, {Component} from 'react';
import CustomHeader from './CustomHeader';
import Routes from './Routes';
import Notifications from './Notifications';

export default class App extends Component {
    render() {
        return (
            <div>
                <CustomHeader/>
                <Notifications/>
                <Routes/>
            </div>
        );
    }
}