import React, {Component} from 'react';
import {Form, Dropdown, Button, Message} from 'semantic-ui-react';
import UserService from "../services/UserService";

export default class AssignForm extends Component {
    constructor(props) {
        super(props);

        this.userService = new UserService();

        this.state = {
            engineerId: this.props.engineerId,
            comment: '',
            engineers: this.props.engineers,
            errorString: ''
        };

        this.searchEngineers = this.searchEngineers.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    searchEngineers() {
        this.userService.searchEngineers(
            function (response) {
                this.setState(() => {
                    let engineers = response.data.users.map(function (user) {
                        return {
                            key: user.id,
                            value: user.id,
                            text: user.name
                        };
                    });
                    return {engineers: engineers};
                });
            }.bind(this),
            function (error) {
                this.setErrors(error.response.data.error);
            }.bind(this))
    }

    setErrors(errorString) {
        this.setState({errorString: errorString});
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
        return (
            <Form error>
                {this.state.errorString.length > 0 &&
                <Message
                    error
                    content={this.state.errorString}
                />
                }
                <Form.Group widths='equal'>
                    <Dropdown
                        fluid
                        placeholder='Engineer'
                        name='engineerId'
                        value={this.state.engineerId}
                        onChange={this.handleChange}
                        onSearchChange={this.searchEngineers}
                        search
                        selection
                        options={this.state.engineers}
                    />
                </Form.Group>
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
                    <Button type='submit' onClick={() => {
                        this.resetErrors();
                        this.props.assignOrder(
                            this.state.engineerId,
                            function (errorString) {
                                this.setErrors(errorString);
                            }.bind(this),
                            this.state.comment
                        );
                    }}>
                        Assign
                    </Button>
                </Form.Group>
            </Form>
        );
    }
}