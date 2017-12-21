import React, {Component} from 'react';
import {Container} from 'semantic-ui-react'
import OrderService from "../../services/OrderService";
import CompanyService from "../../services/CompanyService";
import LocalityService from "../../services/LocalityService";
import OrderForm from '../../components/OrderForm';
import {ORDER_PATH} from "../../constants/RoutePaths";

export default class StatusManagementOrder extends Component {
    constructor(props){
        super(props);
        this.state = {

        };
    }
}