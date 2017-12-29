import React, {Component} from 'react';
import CustomHeader from './CustomHeader';
import Routes from './Routes';

export default class App extends Component {
    render() {
        return (
            <div>
                <CustomHeader/>
                <Routes/>
            </div>
        );
    }
}