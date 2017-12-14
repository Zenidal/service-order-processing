import React, {Component} from 'react';
import CustomHeader from './CustomHeader';
import CustomContent from './CustomContent';

export default class App extends Component {
    render() {
        return (
            <div>
                <CustomHeader/>
                <CustomContent/>
            </div>
        );
    }
}