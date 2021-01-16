import React from 'react';
import {Form, Input, Button, TextArea} from 'semantic-ui-react';


const NewRecordPage = (props) => {

    const {modelOpened, onDeleteClick, onSaveClick, onRenewClick} = props;

    return (

        <div>
            <Form >
                <Form.Group  style={{display: 'none'}}>
                    <Form.Field>
                        <Input
                            placeholder={'id'}
                            id="id"
                            value={props.formData.id}
                            // onChange={props.onFormDataChanged}
                        />
                    </Form.Field>
                </Form.Group>

                <Form.Group>
                    <Form.Field>
                        <Input
                            placeholder={'Ad Bilgisi giriniz'}
                            id="ad"
                            value={props.formData.ad}
                            onChange={props.onFormDataChanged}
                        />
                    </Form.Field>
                </Form.Group>

                <Form.Group>
                    <Form.Field>
                        <Input
                            placeholder={'Soyad Bilgisi giriniz'}
                            id="soyad"
                            value={props.formData.soyad}
                            onChange={props.onFormDataChanged}
                        />
                    </Form.Field>
                </Form.Group>

                <Form.Group>
                    <Form.Field>
                        <TextArea
                            placeholder={'Adres Bilgisi giriniz'}
                            id="adres"
                            value={props.formData.adres}
                            onChange={props.onFormDataChanged}
                        />
                    </Form.Field>
                </Form.Group>
            </Form>
            <Button floated='right' primary onClick={onSaveClick} >Kaydet</Button>
            {modelOpened && (<Button color='red' floated='right' onClick={onDeleteClick} >Sil</Button>)}
            {!modelOpened && (<Button floated='right' onClick={onRenewClick} >Yenile</Button>)}

        </div>
    )
}

export default NewRecordPage;