import React, {Component} from 'react';
import {Container, Dimmer, Loader} from 'semantic-ui-react'
import OrderService from "../../services/OrderService";
import CompanyService from "../../services/CompanyService";
import LocalityService from "../../services/LocalityService";
import OrderForm from '../../components/OrderForm';
import {ORDER_PATH} from "../../constants/RoutePaths";
import {mapOrder} from "../../constants/OrderHelper";
import NotificationSystem from "react-notification-system";

export default class EditOrder extends Component {
    constructor(props) {
        super(props);

        this.orderService = new OrderService();
        this.companyService = new CompanyService();
        this.localityService = new LocalityService();
        this.notificationSystem = null;
        this.actionText = 'Edit';
        this.searchLimit = 10;

        this.state = {
            orderId: props.match.params.number,
            order: {},
            companies: [],
            localities: [],
            companyAddresses: [],
            newCompanyAddress: {},
            error: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.searchCompanies = this.searchCompanies.bind(this);
        this.searchLocalities = this.searchLocalities.bind(this);
        this.searchCompanyBranches = this.searchCompanyBranches.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getOrder() {
        this.orderService.getOrder(this.state.orderId, function (response) {
            this.setState(() => {
                return {
                    order: mapOrder(response.data.order),
                    companies: [
                        {
                            key: response.data.order.company_branch.company.id,
                            text: response.data.order.company_branch.company.name,
                            value: response.data.order.company_branch.company.id,
                        }
                    ],
                    localities: [
                        {
                            key: response.data.order.company_branch.address.locality.id,
                            text: response.data.order.company_branch.address.locality.name,
                            value: response.data.order.company_branch.address.locality.id,
                        }
                    ],
                    companyAddresses: [
                        {
                            key: response.data.order.company_branch.address.id,
                            text: response.data.order.company_branch.address.exact_address,
                            value: response.data.order.company_branch.address.id,
                        }
                    ],
                    newCompanyAddress: {
                        key: 0,
                        text: '',
                        value: 0
                    }
                }
            })
        }.bind(this));
    }

    searchCompanies(event, {searchQuery}) {
        this.companyService.searchCompany(
            searchQuery,
            this.searchLimit,
            function (response) {
                this.setState(() => {
                    let companies = response.data.companies.map(function (company) {
                        return {
                            text: company.name,
                            value: company.id,
                            key: company.id
                        };
                    });
                    return {companies: companies};
                });
                this.resetCompanyAddresses();
            }.bind(this), function (error) {
                this.notificationSystem.addNotification({
                    message: error.message,
                    level: 'error'
                });
            }
        );
    }

    searchLocalities(event, {searchQuery}) {
        this.localityService.searchLocality(
            searchQuery,
            this.searchLimit,
            function (response) {
                this.setState(() => {
                    let localities = response.data.localities.map(function (locality) {
                        return {
                            text: locality.name,
                            value: locality.id,
                            key: locality.id
                        };
                    });
                    return {localities: localities};
                });
                this.resetCompanyAddresses();
            }.bind(this), function (error) {
                this.notificationSystem.addNotification({
                    message: error.message,
                    level: 'error'
                });
            }
        );
    }

    resetCompanyAddresses() {
        this.setState((prevState) => {
            let order = prevState.order;
            order.addressId = 0;
            return {order: order, companyAddresses: []};
        });
    }

    searchCompanyBranches(event, {searchQuery}) {
        this.companyService.searchCompanyBranchByAddress(
            searchQuery,
            this.state.order.companyId,
            this.state.order.localityId,
            this.searchLimit,
            function (response) {
                this.setState((prevState, props) => {
                    let companyAddresses = response.data.companyBranches.map(function (companyBranch) {
                        return {
                            text: companyBranch.address.exact_address,
                            value: companyBranch.address.id,
                            key: companyBranch.address.id
                        };
                    });

                    let newCompanyAddress = prevState.newCompanyAddress;
                    newCompanyAddress.text = searchQuery;
                    return {companyAddresses: companyAddresses, newCompanyAddress: newCompanyAddress};
                });
            }.bind(this), function (error) {
                this.notificationSystem.addNotification({
                    message: error.message,
                    level: 'error'
                });
            }
        );
    }

    setApiValidationErrors(errors) {
        this.resetErrors();

        this.setState({error: errors.join(' | ')});
    }

    resetErrors() {
        this.setState({error: ''});
    }

    editOrder() {
        this.orderService.editOrder(
            this.state.order,
            function (response) {
                this.props.history.push(ORDER_PATH);
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
        this.editOrder();
    }

    handleChange(event, {name, value, options}) {
        if (name === 'companyId' || name === 'localityId')
            this.resetCompanyAddresses();

        if (name === 'addressId') {
            this.setState((prevState, props) => {
                let order = prevState.order;
                for (let index = 0; index < options.length; index++) {
                    if (options[index].value === value)
                        order.exactAddress = options[index].text;
                }
                return {order: order};
            });
        }
        this.setState((prevState, props) => {
            let order = prevState.order;
            order[name] = value;
            return {order: order}
        });
    }

    componentDidMount() {
        this.getOrder();
        this.notificationSystem = this.refs.notificationSystem;
    }

    render() {
        let content =
            <OrderForm
                actionText={this.actionText}
                companies={this.state.companies}
                localities={this.state.localities}
                companyAddresses={this.state.companyAddresses.concat([this.state.newCompanyAddress])}
                order={this.state.order}
                error={this.state.error}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                searchCompanies={this.searchCompanies}
                searchLocalities={this.searchLocalities}
                searchCompanyBranches={this.searchCompanyBranches}
            />;

        return (
            <Container>
                {content}
                <NotificationSystem ref="notificationSystem"/>
            </Container>
        );
    }
}