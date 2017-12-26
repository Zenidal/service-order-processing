import React from 'react';
import {Item} from 'semantic-ui-react';

const mapOrder = (responseOrder) => {
    return {
        id: responseOrder.id,
        companyId: responseOrder.company_branch.company.id,
        localityId: responseOrder.company_branch.address.locality.id,
        addressId: responseOrder.company_branch.address.id,
        description: responseOrder.description,
        status: responseOrder.status,
        companyName: responseOrder.company_branch.company.name,
        countryName: responseOrder.company_branch.address.locality.country.name,
        localityName: responseOrder.company_branch.address.locality.name,
        engineerId: responseOrder.engineer && responseOrder.engineer.id ? responseOrder.engineer.id : '',
        engineerName: responseOrder.engineer && responseOrder.engineer.name ? responseOrder.engineer.name : '',
        ownerName: responseOrder.owner.name,
        exactAddress: responseOrder.company_branch.address.exact_address,
        createdAt: responseOrder.created_at,
    }
};

const orderView = (props) => {
    return (
        <Item>
            <Item.Content>
                <Item.Header>Id: {props.order.id}</Item.Header>
                <Item.Meta>
                    {props.order.createdAt}
                </Item.Meta>
                <Item.Description>{props.order.description}</Item.Description>
                <Item.Description>
                    <span>{props.order.companyName}</span>,
                    <span> {props.order.countryName}</span>,
                    <span> {props.order.localityName}</span>,
                    <span> {props.order.exactAddress}</span>
                </Item.Description>
                <Item.Extra>Status: {props.order.status}</Item.Extra>
                <Item.Extra>Owner: {props.order.ownerName}</Item.Extra>
                <Item.Extra>Engineer: {props.order.engineerName || 'Engineer haven\' assigned.'}</Item.Extra>
            </Item.Content>
        </Item>
    );
};

const orderStatusHistoryView = (props) => {
    return (
        <Item key={props.orderStatusHistory.id}>
            <Item.Content>
                <Item.Header>
                    {props.orderStatusHistory.fromStatus} => {props.orderStatusHistory.toStatus}
                </Item.Header>
                <Item.Meta>
                    {props.orderStatusHistory.createdAt}
                </Item.Meta>
                <Item.Description>{props.orderStatusHistory.comment}</Item.Description>
                <Item.Description>{props.orderStatusHistory.userName}</Item.Description>
            </Item.Content>
        </Item>
    );
};

export {mapOrder, orderView, orderStatusHistoryView};