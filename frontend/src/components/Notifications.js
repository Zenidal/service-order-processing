import React, {Component} from 'react';
import {Container, Message} from 'semantic-ui-react';

let instance = null;

export default class Notifications extends Component {
    constructor(props) {
        super(props);
        if (!instance) {
            instance = this;
        }

        this.state = {
            errorCounter: 0,
            warningCounter: 0,
            successCounter: 0,
            errors: [],
            warnings: [],
            successes: [],
        };

        return instance;
    }

    static addError(errorMsg) {
        let self = new Notifications();
        self.setState((prevState) => {
            let errors = prevState.errors, errorCounter = prevState.errorCounter;
            errors.push({message: errorMsg, number: errorCounter});
            errorCounter++;
            return {errorCounter: errorCounter, errors: errors}
        });
    }

    static addWarning(warningMsg) {
        let self = new Notifications();
        self.setState((prevState) => {
            let warnings = prevState.warnings, warningCounter = prevState.warningCounter;
            warnings.push({message: warningMsg, number: warningCounter});
            warningCounter++;
            return {warningCounter: warningCounter, warnings: warnings}
        });
    }

    static addSuccess(successMsg) {
        let self = new Notifications();
        self.setState((prevState) => {
            let successes = prevState.successes, successCounter = prevState.successCounter;
            successes.push({message: successMsg, number: successCounter});
            successCounter++;
            return {successCounter: successCounter, successes: successes}
        });
    }

    handleDismiss(arrayName, id) {
        for (let index = 0; index < this.state[arrayName].length; index++) {
            if (this.state[arrayName][index].number === id) {
                this.setState((prevState) => {
                    let array = prevState[arrayName];
                    array.splice(index, 1);

                    let obj = {};
                    obj[arrayName] = array;
                    return obj;
                });
            }
        }
    }

    render() {
        let errors = this.state.errors ? this.state.errors.map(function (error) {
                return (
                    <Message error
                             key={error.number}
                             onDismiss={() => {
                                 this.handleDismiss('errors', error.number)
                             }}
                             header={error.message}
                    />
                );
            }.bind(this)) :
            '';
        let warnings = this.state.warnings ? this.state.warnings.map(function (warning) {
                return (
                    <Message warning
                             key={warning.number}
                             onDismiss={() => {
                                 this.handleDismiss('warnings', warning.number)
                             }}
                             header={warning.message}
                    />
                );
            }.bind(this)) :
            '';
        let successes = this.state.successes ? this.state.successes.map(function (success) {
                return (
                    <Message info
                             key={success.number}
                             onDismiss={() => {
                                 this.handleDismiss('successes', success.number)
                             }}
                             header={success.message}
                    />
                );
            }.bind(this)) :
            '';

        return (
            <div className="messages-container">
                {errors}
                {warnings}
                {successes}
            </div>
        );
    }
}