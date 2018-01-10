import React, {Component} from 'react';
import {Table, Menu, Container, Button} from 'semantic-ui-react'
import CompanyService from "../../services/CompanyService";
import {Link} from 'react-router-dom';
import {
    COMPANY_ALL_PATH, COMPANY_EDIT_PATH, COMPANY_NEW_PATH,
    makeUrl
} from "../../constants/RoutePaths";
import {mapCompany} from "../../constants/Mapper";

export default class Companies extends Component {
    constructor(props) {
        super(props);

        this.companyService = new CompanyService();

        this.state = {
            companies: [],
            limit: props.match.params.limit ? parseInt(props.match.params.limit, 10) : 10,
            pageNumber: props.match.params.page ? parseInt(props.match.params.page, 10) : 1,
            totalOfAllCompanies: 0
        };

        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.changeLimit = this.changeLimit.bind(this);
        this.deleteCompany = this.deleteCompany.bind(this);
    }

    getCompanies(limit, pageNumber) {
        return this.companyService.getAllCompanies(limit, pageNumber, function (response) {
            this.setState({totalOfAllCompanies: response.data.total});
            return response.data.companies ?
                response.data.companies.map(function (company) {
                    return mapCompany(company);
                }) :
                [];
        }.bind(this));
    }

    nextPage() {
        let url = makeUrl(COMPANY_ALL_PATH, {limit: this.state.limit, page: this.state.pageNumber + 1});
        this.props.history.push(url);
    }

    previousPage() {
        let url = makeUrl(COMPANY_ALL_PATH, {limit: this.state.limit, page: this.state.pageNumber - 1});
        this.props.history.push(url);
    }

    changeLimit(limit) {
        let url = makeUrl(COMPANY_ALL_PATH, {limit: limit, page: this.state.pageNumber});
        this.props.history.push(url);
    }

    deleteCompany(companyId) {
        this.companyService.deleteCompany(companyId, function () {
            this.setState(() => {
                let companies = this.state.companies;
                for (let index = 0; index < companies.length; index++) {
                    if (companies[index].id === companyId) delete companies[index];
                }
                return {companies: companies};
            })
        }.bind(this));
    }

    componentWillReceiveProps(nextProps) {
        let limit = nextProps.match.params.limit ? parseInt(nextProps.match.params.limit, 10) : 10,
            pageNumber = nextProps.match.params.page ? parseInt(nextProps.match.params.page, 10) : 1;

        this.getCompanies(limit, pageNumber)
            .then(function (companies) {
                this.setState({
                    limit: limit,
                    pageNumber: pageNumber,
                    companies: companies
                });
            }.bind(this));
    }

    componentDidMount() {
        this.getCompanies(this.state.limit, this.state.pageNumber)
            .then(function (companies) {
                this.setState({companies: companies});
            }.bind(this));
    }

    render() {
        let columns = this.state.companies ? this.state.companies.map(function (company) {
            return (
                <Table.Row key={company.id}>
                    <Table.Cell>{company.id}</Table.Cell>
                    <Table.Cell>{company.name}</Table.Cell>
                    <Table.Cell>{company.createdAt}</Table.Cell>
                    <Table.Cell>
                        <Menu vertical>
                            <Menu.Item as={Link} to={makeUrl(COMPANY_EDIT_PATH, {number: company.id})}>Edit</Menu.Item>
                            <Menu.Item
                                onClick={() => {
                                    this.deleteCompany(company.id);
                                }}>
                                Delete
                            </Menu.Item>
                        </Menu>
                    </Table.Cell>
                </Table.Row>
            );
        }.bind(this)) : (
            <Table.Row>
            </Table.Row>
        );

        return (
            <Container>
                <Table compact celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Id</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Created</Table.HeaderCell>
                            <Table.HeaderCell/>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {columns}
                    </Table.Body>

                    <Table.Footer>
                        <Table.Row>
                            <Table.HeaderCell colSpan={11}>
                                <Button as={Link} to={COMPANY_NEW_PATH}>New company</Button>
                                {this.state.pageNumber > 1 &&
                                <Button onClick={this.previousPage}>
                                    Previous
                                </Button>
                                }
                                {this.state.pageNumber * this.state.limit < this.state.totalOfAllCompanies &&
                                <Button onClick={this.nextPage}>
                                    Next
                                </Button>
                                }
                                <Button onClick={function () {
                                    this.changeLimit(5);
                                }.bind(this)}>
                                    5 per page
                                </Button>
                                <Button onClick={function () {
                                    this.changeLimit(10);
                                }.bind(this)}>
                                    10 per page
                                </Button>
                                <Button onClick={function () {
                                    this.changeLimit(20);
                                }.bind(this)}>
                                    20 per page
                                </Button>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
            </Container>
        );
    }
}