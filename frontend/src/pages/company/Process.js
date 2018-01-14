import React, {Component} from 'react';
import {Container} from 'semantic-ui-react'
import CompanyForm from '../../constants/CompanyForm';
import {COMPANY_PATH} from "../../constants/RoutePaths";
import {mapCompany} from "../../constants/Mapper";
import NotificationSystem from "react-notification-system";
import ErrorView from "../../constants/ErrorView";
import ServiceContainer from "../../components/ServiceContainer";

export default class ProcessCompany extends Component {
    constructor(props) {
        super(props);

        this.serviceContainer = null;
        this.notificationSystem = null;

        let companyId = (props.match && props.match.params.number) || null;

        this.state = {
            companyId: companyId,
            actionText: companyId ? 'Edit' : 'Create',
            company: {
                id: '',
                name: ''
            },
            error: '',
            fatalError: ''
        };

        this.handleError = this.handleError.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.serviceContainer = this.refs.serviceContainer;
        this.notificationSystem = this.refs.notificationSystem;

        if (this.state.companyId) this.getCompany();
    }

    handleError(error) {
        if (error.response) {
            let message;
            switch (error.response.status) {
                case 403:
                    message = 'Forbidden.';
                    break;
                case 404:
                    message = 'Not found.';
                    break;
                default:
                    message = '';
            }
            this.setState({fatalError: {message: message}});
        }
    }

    getCompany() {
        this.serviceContainer.companyService.getCompany(this.state.companyId, function (response) {
            this.setState(() => {
                return {
                    company: mapCompany(response.data.company)
                }
            })
        }.bind(this), this.handleError);
    }

    setApiValidationErrors(errors) {
        this.resetErrors();

        this.setState({error: errors.join(' | ')});
    }

    resetErrors() {
        this.setState({error: ''});
    }

    processCompany() {
        let method = this.state.companyId ? 'editCompany' : 'newCompany';
        this.serviceContainer.companyService[method](
            this.state.company,
            function (response) {
                this.props.history.push(COMPANY_PATH);
            }.bind(this),
            function (error) {
                if (error.response) {
                    if (error.response.status === 400) {
                        this.setApiValidationErrors(error.response.data.error);
                    }
                } else {
                    this.notificationSystem.addNotification({
                        message: error.message,
                        level: 'error'
                    });
                }
            }.bind(this)
        );
    }

    handleSubmit() {
        this.processCompany();
    }

    handleChange(event, {name, value, options}) {
        this.setState((prevState, props) => {
            let company = prevState.company;
            company[name] = value;
            return {company: company}
        });
    }

    render() {
        let view = (props) => {
            return !props.fatalError ? (
                <Container>
                    <CompanyForm
                        actionText={props.actionText}
                        company={props.company}
                        error={props.error}
                        handleChange={props.handleChange}
                        handleSubmit={props.handleSubmit}
                    />
                    <NotificationSystem ref="notificationSystem"/>
                    <ServiceContainer ref="serviceContainer"/>
                </Container>
            ) : (<ErrorView error={props.fatalError}/>);
        };

        return view({
            actionText: this.state.actionText,
            company: this.state.company,
            error: this.state.error,
            fatalError: this.state.fatalError,
            handleChange: this.handleChange,
            handleSubmit: this.handleSubmit,
        });
    }
}