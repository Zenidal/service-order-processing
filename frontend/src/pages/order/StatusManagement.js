import React, {Component} from 'react';
import {Container} from 'semantic-ui-react'
import OrderService from "../../services/OrderService";
import {mapOrder, order} from "../../constants/OrderHelper";
import OrderStatuses from '../../components/OrderStatuses';

export default class StatusManagementOrder extends Component {
    constructor(props) {
        super(props);

        this.orderService = new OrderService();

        this.state = {
            orderId: props.match.params.number,
            order: {},
            formData: {},
            engineers: []
        };

        this.assignOrder = this.assignOrder.bind(this);
        this.startProgressOrder = this.startProgressOrder.bind(this);
        this.resolveOrder = this.resolveOrder.bind(this);
        this.closeOrder = this.closeOrder.bind(this);
        this.reopenOrder = this.reopenOrder.bind(this);
    }

    getOrder() {
        this.orderService.getOrder(this.state.orderId, function (response) {
            this.setState(() => {
                let mappedOrder = mapOrder(response.data.order);
                let engineers = mappedOrder.engineerId ? [
                    {
                        key: mappedOrder.engineerId,
                        value: mappedOrder.engineerId,
                        text: mappedOrder.engineerName
                    }
                ] : [];
                return {order: mappedOrder, engineers: engineers};
            });
        }.bind(this));

    }

    assignOrder(engineerId, callback, comment) {
        this.orderService.assign(
            this.state.order,
            engineerId,
            comment,
            function (response) {
                this.setState({order: mapOrder(response.data.order)});
                callback('');
            }.bind(this),
            function (error) {
                callback(error.response.data.error);
            }.bind(this)
        );
    }

    startProgressOrder(callback, comment) {
        this.orderService.startProgress(
            this.state.order,
            comment,
            function (response) {
                this.setState({order: mapOrder(response.data.order)});
                callback('');
            }.bind(this),
            function (error) {
                callback(error.response.data.error);
            }.bind(this)
        );
    }

    resolveOrder(callback, comment) {
        this.orderService.resolve(
            this.state.order,
            comment,
            function (response) {
                this.setState({order: mapOrder(response.data.order)});
                callback('');
            }.bind(this),
            function (error) {
                callback(error.response.data.error);
            }.bind(this)
        );
    }

    closeOrder(callback, comment) {
        this.orderService.close(
            this.state.order,
            comment,
            function (response) {
                this.setState({order: mapOrder(response.data.order)});
                callback('');
            }.bind(this),
            function (error) {
                callback(error.response.data.error);
            }.bind(this)
        );
    }

    reopenOrder(callback, comment) {
        this.orderService.reopen(
            this.state.order,
            comment,
            function (response) {
                this.setState({order: mapOrder(response.data.order)});
                callback('');
            }.bind(this),
            function (error) {
                callback(error.response.data.error);
            }.bind(this)
        );
    }

    componentWillMount() {
        this.getOrder();
    }

    render() {
        return (
            <Container>
                <OrderStatuses
                    engineerId={this.state.order.engineerId}
                    engineers={this.state.engineers}
                    order={this.state.order}
                    assignOrder={this.assignOrder}
                    startProgressOrder={this.startProgressOrder}
                    resolveOrder={this.resolveOrder}
                    closeOrder={this.closeOrder}
                    reopenOrder={this.reopenOrder}
                />
                {order({order: this.state.order})}
            </Container>
        );
    }
}