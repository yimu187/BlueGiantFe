import React from 'react';
import {Button, Form, Grid, Header, Image, Segment} from "semantic-ui-react";

const SingupPage = (props) => {

    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                    <Image src='/logo.png' /> Log-in to your account
                </Header>
                <Form size='large'>
                    <Segment stacked>
                        <Form.Input
                            id={'signupUsername'}
                            fluid
                            icon='user'
                            iconPosition='left'
                            placeholder='Username'
                            value={props.username}
                            onChange={props.onSignFormDataChanged}
                        />
                        <Form.Input
                            id={'signupPassword'}
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            value={props.password}
                            onChange={props.onSignFormDataChanged}
                        />
                        <Form.Input
                            id={'signupEmail'}
                            fluid
                            icon='mail'
                            iconPosition='left'
                            placeholder='E-mail address'
                            value={props.signupEmail}
                            onChange={props.onSignFormDataChanged}
                        />

                        <Button color='teal' fluid size='large' onClick={props.onSignupClick}>
                            Signup
                        </Button>
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>
    );
}

export default SingupPage;