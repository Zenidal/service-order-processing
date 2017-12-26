import React, {Component} from 'react';
import {Step, Dimmer, Loader} from 'semantic-ui-react';
import AssignForm from "./AssignForm";
import StatusForm from "./StatusForm";

export default class OrderStatuses extends Component {
    constructor(props) {
        super(props);

        this.statuses = [
            {value: 1, text: "Opened", description: ''},
            {value: 2, text: "Assigned", description: '',},
            {value: 3, text: "In Progress", description: '',},
            {value: 4, text: "Resolved", description: '',},
            {value: 5, text: "Closed", description: '',},
            {value: 6, text: "Reopened", description: '',},
        ];
        this.state = {contentForm: ''};
    }

    componentWillReceiveProps(newProps) {
        let contentForm;
        if (!newProps.order) {
            contentForm = (
                <Dimmer active inverted>
                    <Loader size='small'>Loading</Loader>
                </Dimmer>
            );
            return this.setState({contentForm: contentForm});
        }
        switch (parseInt(newProps.order.status, 10)) {
            case 1: {
                contentForm = <AssignForm
                    searchEngineers={this.props.searchEngineers}
                    engineers={this.props.engineers}
                    order={newProps.order}
                    assignOrder={this.props.assignOrder}
                />;
                break;
            }
            case 2: {
                contentForm = <StatusForm
                    order={newProps.order}
                    actions={[
                        {actionText: "Start progress", handleSubmit: this.props.startProgressOrder}
                    ]}
                />;
                break;
            }
            case 3: {
                contentForm = <StatusForm
                    order={newProps.order}
                    actions={[
                        {actionText: "Resolve", handleSubmit: this.props.resolveOrder}
                    ]}
                />;
                break;
            }
            case 4: {
                contentForm = <StatusForm
                    order={newProps.order}
                    actions={[
                        {actionText: "Close", handleSubmit: this.props.closeOrder},
                        {actionText: "Reopen", handleSubmit: this.props.reopenOrder},
                    ]}
                />;
                break;
            }
            case 5: {
                contentForm = <StatusForm
                    order={newProps.order}
                    actions={[
                        {actionText: "Reopen", handleSubmit: this.props.reopenOrder}
                    ]}
                />;
                break;
            }
            case 6: {
                contentForm = <AssignForm
                    searchEngineers={this.props.searchEngineers}
                    handleChange={this.props.handleChange}
                    engineers={this.props.engineers}
                    order={newProps.order}
                    assignOrder={this.props.assignOrder}
                />;
                break;
            }
            default:
                contentForm = '';
        }
        return this.setState({contentForm: contentForm});
    }

    render() {
        let steps = this.statuses.map(function (step) {
            return (
                <Step active={step.value === (parseInt(this.props.order.status, 10))} key={step.value}>
                    <Step.Content>
                        <Step.Title>{step.text}</Step.Title>
                        <Step.Description>{step.description}</Step.Description>
                    </Step.Content>
                </Step>
            );
        }.bind(this));

        return (
            <div>
                <Step.Group ordered fluid>
                    {steps}
                </Step.Group>
                {this.state.contentForm}
            </div>
        );
    }
};