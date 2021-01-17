import React from 'react';
import {Button, Form, Grid, Header, Image, Segment, Message} from 'semantic-ui-react'

const SinginPage = (props) => {

    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                    <Image src='/logo.png' /> Log-in to your account
                </Header>
                <Form size='large'>
                    <Segment stacked>
                        <Form.Input
                            id={'signinUsername'}
                            fluid
                            icon='user'
                            iconPosition='left'
                            placeholder='Username'
                            value={props.username}
                            onChange={props.onSignFormDataChanged}
                        />
                        <Form.Input
                            id={'signinPassword'}
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            value={props.password}
                            onChange={props.onSignFormDataChanged}
                        />

                        <Button color='teal' fluid size='large' onClick={props.onSigninClick}>
                            Login
                        </Button>
                    </Segment>
                </Form>
                <Message>
                    New to us? <a href='#' onClick={props.onOpenSignupFormClick}>Sign Up</a>
                </Message>
            </Grid.Column>
        </Grid>
    );
}

export default SinginPage;