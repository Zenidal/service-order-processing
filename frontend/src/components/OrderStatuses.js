import React, {Component} from 'react';
import {Step} from 'semantic-ui-react';
import AssignForm from "./AssignForm";
import StatusForm from "./StatusForm";

export default class OrderStatuses extends Component {
    constructor(props) {
        super(props);

        this.statuses = [
            {value: 1, text: "Opened"},
            {value: 2, text: "Assigned"},
            {value: 3, text: "In Progress"},
            {value: 4, text: "Resolved"},
            {value: 5, text: "Closed"},
            {value: 6, text: "Reopened"},
        ];
        this.state = {contentForm: ''};
    }

    componentWillReceiveProps(newProps) {
        let contentForm;
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