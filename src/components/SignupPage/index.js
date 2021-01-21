import React from 'react';
import {Button, Form, Grid, Header, Image, Segment} from "semantic-ui-react";

const SingupPage = (props) => {

    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                    Giriş yapın
                </Header>
                <Form size='large'>
                    <Segment stacked>
                        <Form.Input
                            id={'signupUsername'}
                            fluid
                            icon='user'
                            iconPosition='left'
                            placeholder='Kullanıcı adı'
                            value={props.username}
                            onChange={props.onSignFormDataChanged}
                        />
                        <Form.Input
                            id={'signupPassword'}
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Şifre'
                            type='password'
                            value={props.password}
                            onChange={props.onSignFormDataChanged}
                        />
                        <Form.Input
                            id={'signupEmail'}
                            fluid
                            icon='mail'
                            iconPosition='left'
                            placeholder='E-posta adresi'
                            value={props.signupEmail}
                            onChange={props.onSignFormDataChanged}
                        />

                        <Button color='teal' fluid size='large' onClick={props.onSignupClick}>
                            Kaydol
                        </Button>
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>
    );
}

export default SingupPage;