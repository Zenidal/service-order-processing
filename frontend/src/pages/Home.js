import React, {Component} from 'react';
import {Container, Statistic} from 'semantic-ui-react';
import StatisticService from "../services/StatisticService";
import NotificationSystem from "react-notification-system";

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.statisticService = new StatisticService();
        this.notificationSystem = null;

        this.state = {
            statistic: {
                user: '',
                order: '',
                country: '',
                locality: '',
                company: '',
                companyBranch: ''
            }
        };

        this.getStatistic = this.getStatistic.bind(this);
    }

    getStatistic(){
        this.statisticService.getStatistics({
                fields: [
                    'user',
                    'order',
                    'country',
                    'locality',
                    'company',
                    'companyBranch'
                ]
            },
            function (response) {
                this.setState(() => {
                    let statistic = {
                        user: response.data.statistic.user,
                        order: response.data.statistic.order,
                        country: response.data.statistic.country,
                        locality: response.data.statistic.locality,
                        company: response.data.statistic.company,
                        companyBranch: response.data.statistic.companyBranch
                    };
                    return {statistic: statistic};
                });
            }.bind(this),
            function (error) {
                this.notificationSystem.addNotification({
                    message: error.message,
                    level: 'error'
                });
            }.bind(this),
        )
    }

    componentDidMount() {
        this.notificationSystem = this.refs.notificationSystem;
        this.getStatistic();
    }

    render() {
        return (
            <Container>
                <Statistic.Group widths='two' size="huge">
                    <Statistic>
                        <Statistic.Value>{this.state.statistic.user}</Statistic.Value>
                        <Statistic.Label>Users</Statistic.Label>
                    </Statistic>

                    <Statistic>
                        <Statistic.Value>{this.state.statistic.order}</Statistic.Value>
                        <Statistic.Label>Orders</Statistic.Label>
                    </Statistic>

                    <Statistic>
                        <Statistic.Value>{this.state.statistic.country}</Statistic.Value>
                        <Statistic.Label>Countries</Statistic.Label>
                    </Statistic>

                    <Statistic>
                        <Statistic.Value>{this.state.statistic.locality}</Statistic.Value>
                        <Statistic.Label>Localities</Statistic.Label>
                    </Statistic>

                    <Statistic>
                        <Statistic.Value>{this.state.statistic.company}</Statistic.Value>
                        <Statistic.Label>Companies</Statistic.Label>
                    </Statistic>

                    <Statistic>
                        <Statistic.Value>{this.state.statistic.companyBranch}</Statistic.Value>
                        <Statistic.Label>Company branches</Statistic.Label>
                    </Statistic>
                </Statistic.Group>
                <NotificationSystem ref="notificationSystem"/>
            </Container>
        );
    }
}