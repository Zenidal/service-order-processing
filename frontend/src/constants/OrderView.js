import React from "react";
import {Item} from "semantic-ui-react";

const OrderView = (props) => (
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
            <Item.Extra>Status: {props.order.statusName}</Item.Extra>
            <Item.Extra>Owner: {props.order.ownerName}</Item.Extra>
            <Item.Extra>Engineer: {props.order.engineerName || 'Engineer haven\' assigned.'}</Item.Extra>
        </Item.Content>
    </Item>
);

export default OrderView;