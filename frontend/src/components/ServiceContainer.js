import React, {Component} from "react";
import UserService from "../services/UserService";
import OrderService from "../services/OrderService";
import RoleService from "../services/RoleService";
import CompanyService from "../services/CompanyService";
import LocalityService from "../services/LocalityService";
import StatisticService from "../services/StatisticService";

export default class ServiceContainer extends Component {
    constructor(props) {
        super(props);
        this.userService = new UserService();
        this.orderService = new OrderService();
        this.roleService = new RoleService();
        this.companyService = new CompanyService();
        this.localityService = new LocalityService();
        this.statisticService = new StatisticService();
    }

    render() {
        return (<span></span>);
    }
}