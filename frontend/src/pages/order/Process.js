import React, {Component} from 'react';
import {Container} from 'semantic-ui-react'
import OrderService from "../../services/OrderService";
import CompanyService from "../../services/CompanyService";
import LocalityService from "../../services/LocalityService";
import OrderForm from '../../constants/OrderForm';
import {ORDER_PATH} from "../../constants/RoutePaths";
import {mapOrder} from "../../constants/OrderHelper";
import NotificationSystem from "react-notification-system";
import ErrorView from "../../constants/ErrorView";

export default class ProcessOrder extends Component {
    constructor(props) {
        super(props);

        this.orderService = new OrderService();
        this.companyService = new CompanyService();
        this.localityService = new LocalityService();
        this.notificationSystem = null;
        this.searchLimit = 10;

        let orderId = (props.match && props.match.params.number) || null;

        this.state = {
            orderId: orderId,
            actionText: orderId ? 'Edit' : 'Create',
            order: {
                id: '',
                companyId: '',
                companyName: '',
                localityId: '',
                localityName: '',
                exactAddress: '',
                addressId: '',
                description: '',
            },
            error: '',
            companies: [],
            localities: [],
            companyAddresses: [],
            newCompanyAddress: {
                key: 0,
                text: '',
                value: 0
            }
        };

        this.handleError = this.handleError.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.searchCompanies = this.searchCompanies.bind(this);
        this.searchLocalities = this.searchLocalities.bind(this);
        this.searchCompanyBranches = this.searchCompanyBranches.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if (this.state.orderId) this.getOrder();
        this.notificationSystem = this.refs.notificationSystem;
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
            this.setState({error: {message: message}});
        }
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
                    ]
                }
            })
        }.bind(this), this.handleError);
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

    processOrder() {
        let method = this.state.orderId ? 'editOrder' : 'newOrder';
        this.orderService[method](
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
        this.processOrder();
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

    render() {
        let view = (props) => {
            return !props.error ? (
                <Container>
                    <OrderForm
                        actionText={props.actionText}
                        companies={props.companies}
                        localities={props.localities}
                        companyAddresses={props.companyAddresses.concat([props.newCompanyAddress])}
                        order={props.order}
                        error={props.error}
                        handleChange={props.handleChange}
                        handleSubmit={props.handleSubmit}
                        searchCompanies={props.searchCompanies}
                        searchLocalities={props.searchLocalities}
                        searchCompanyBranches={props.searchCompanyBranches}
                    />
                    <NotificationSystem ref="notificationSystem"/>
                </Container>
            ) : (<ErrorView error={props.error}/>);
        };

        return view({
            actionText: this.state.actionText,
            companies: this.state.companies,
            localities: this.state.localities,
            companyAddresses: this.state.companyAddresses,
            newCompanyAddress: this.state.newCompanyAddress,
            order: this.state.order,
            error: this.state.error,
            handleChange: this.handleChange,
            handleSubmit: this.handleSubmit,
            searchCompanies: this.searchCompanies,
            searchLocalities: this.searchLocalities,
            searchCompanyBranches: this.searchCompanyBranches
        });
    }
}