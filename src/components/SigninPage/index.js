import React from 'react';
import {Button, Form, Grid, Header, Image, Segment, Message} from 'semantic-ui-react'

const SinginPage = (props) => {

    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                   Giriş Yapın
                </Header>
                <Form size='large'>
                    <Segment stacked>
                        <Form.Input
                            id={'signinUsername'}
                            fluid
                            icon='user'
                            iconPosition='left'
                            placeholder='Kullanıcı adı'
                            value={props.username}
                            onChange={props.onSignFormDataChanged}
                        />
                        <Form.Input
                            id={'signinPassword'}
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Şifre'
                            type='password'
                            value={props.password}
                            onChange={props.onSignFormDataChanged}
                        />

                        <Button color='teal' fluid size='large' onClick={props.onSigninClick}>
                            Giriş
                        </Button>
                    </Segment>
                </Form>
                <Message>
                    Hesabın yok mu? <a href='#' onClick={props.onOpenSignupFormClick}>Kaydol</a>
                </Message>
            </Grid.Column>
        </Grid>
    );
}

export default SinginPage;