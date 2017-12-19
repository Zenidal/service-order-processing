import React, {Component} from 'react';
import {Table, Icon, Button, Menu} from 'semantic-ui-react'
import OrderService from "../../services/OrderService";
import {Link} from 'react-router-dom';
import {ORDER_PATH} from "../../constants/RoutePaths";

export default class ShowOrder extends Component {
    constructor(props) {
        super(props);

        this.orderService = new OrderService();

        this.state = {
            orderId: props.match.params.number,
            order: {}
        };
    }

    getOrder(){
        this.orderService.getOrder(this.state.orderId, function (response) {
            this.setState({order: response.data.order});
        }.bind(this));
    }

    componentWillMount() {
        this.getOrder();
    }

    render() {
        return (
            <h1>{this.state.orderId}</h1>
        );
    }
}