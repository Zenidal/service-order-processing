import React from 'react';
import {Container, Header} from 'semantic-ui-react';

const ErrorView = (props) => (
    <Container>
        <Header as='h1' textAlign='center'>
            {props.error.message}
        </Header>
    </Container>
);

export default ErrorView;