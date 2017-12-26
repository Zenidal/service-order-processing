import React, {Component} from 'react';
import {Form, Dropdown, Button, Message, Input} from 'semantic-ui-react';
import UserService from "../services/UserService";

export default class StatusForm extends Component {
    constructor(props) {
        super(props);

        this.userService = new UserService();

        this.state = {
            comment: '',
            errorString: ''
        };

        this.handleChange = this.handleChange.bind(this);
    }

    setErrors(errorString) {
        if (errorString) {
            this.setState({errorString: errorString});
        }
    }

    resetErrors() {
        this.setState({errorString: ''});
    }

    handleChange(event, {name, value}) {
        this.setState(() => {
            let state = {};
            state[name] = value;
            return state;
        });
    }

    render() {
        let buttons = this.props.actions.map(function (action, index) {
            return (
                <Button key={index} type='submit' onClick={() => {
                    this.resetErrors();
                    action.handleSubmit(
                        function (errorString) {
                            this.setErrors(errorString);
                        }.bind(this),
                        this.state.comment
                    );
                }}>
                    {action.actionText}
                </Button>
            );
        }.bind(this));

        return (
            <Form error>
                {this.state.errorString.length > 0 &&
                <Message
                    error
                    content={this.state.errorString}
                />
                }
                <Form.Group widths='equal'>
                    <Form.Input
                        label="Comment"
                        placeholder='Comment'
                        name='comment'
                        value={this.state.comment}
                        onChange={this.handleChange}
                    />
                </Form.Group>
                <Form.Group widths='equal'>
                    {buttons}
                </Form.Group>
            </Form>
        );
    }
}