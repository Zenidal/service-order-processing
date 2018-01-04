import React from "react";
import {Item} from "semantic-ui-react";

const OrderStatusHistoryView = (props) => (
    <Item>
        <Item.Content>
            <Item.Header>
                {props.orderStatusHistory.fromStatusName} => {props.orderStatusHistory.toStatusName}
            </Item.Header>
            <Item.Meta>
                {props.orderStatusHistory.createdAt}
            </Item.Meta>
            <Item.Description>{props.orderStatusHistory.comment}</Item.Description>
            <Item.Description>{props.orderStatusHistory.userName}</Item.Description>
        </Item.Content>
    </Item>
);

export default OrderStatusHistoryView;