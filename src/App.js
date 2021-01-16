import React, {Component} from 'react';
import './App.css';
import {Grid, Menu, Segment, Modal, Confirm} from 'semantic-ui-react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import WelcomePage from "./components/WelcomePage";
import NewRecordPage from "./components/NewRecordPage";
import ListPage from "./components/ListPage";

class App extends Component {

    state = {
        modelOpened: false,
        activeItem: 'Giriş',
        formData: {
            id: null,
            ad: '',
            soyad: '',
            adres: '',
        },
        windowFormData: {
            id: null,
            ad: '',
            soyad: '',
            adres: '',
        },
        tableData:[],
        loading: false,
        confirmOpened: false,
    }

    constructor(){
        super();
        this.onFormDataChanged = this.onFormDataChanged.bind(this);

        document.title = 'Task Page';
    }

    onFormDataChanged = (field, event) =>  {

        const { state } = this;
        const { modelOpened } = state;
        if(!modelOpened){
            const { id, value } = event
            const formData = this.state.formData;
            formData[id] = value;
            this.setState(formData);
        }else{
            const { id, value } = event
            const windowFormData = this.state.windowFormData;
            windowFormData[id] = value;
            this.setState(windowFormData);
        }

    }

    onDeleteClick = () => {
        this.setConfirmWindowOpened(true);
    }

    onRenewClick = () => {
        this.setState({
            formData: {
                id: null,
                ad: '',
                soyad: '',
                adres: '',
            }
        })
    }

    onSaveClick = () => {

        const { state } = this;
        const { modelOpened } = state;

        const formData = !modelOpened ? this.state.formData : this.state.windowFormData;
        var self = this;
        axios.post('/formData/save', formData)
            .then(function (response) {
                const { data } = response;
                const { success, message, dto } = data;
                if(success === true){
                    self.notifySuccess(message);
                    if(modelOpened){
                        self.setState({
                            windowFormData: dto
                        });
                    }else{
                        self.setState({
                            formData: dto
                        });
                    }
                }else{
                    self.notifyFailure(message);
                }
            })
            .catch(function (error) {
                console.log(error);
                self.notifyFailure("Hata Durum oluşmuştur. Lütfen Sistem Yöneticiniz ile görüşünüz");
            });
    };


    handleItemClick = (e, { name }) => {
        if(name === 'Listeleme'){
            this.sendListRequest();
        }
        this.setState({ activeItem: name })
    };

    sendListRequest = () => {
        var self = this;
        const url = '/formData/getAll';
        this.setState({loading: true})
        axios.get(url)
            .then(function (response) {
                const { data } = response;
                const { success, message, list } = data;
                if(success === true){
                    self.notifySuccess(message);
                    self.setState({
                        tableData: list,
                        loading:false
                    });
                }else{
                    self.notifyFailure(message);
                    self.setState({
                        loading:false
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
                self.setState({
                    tableData: [{id: 1, ad: 'adi', soyad: 'soyad', adres: 'adres'}, {id: 2, ad: 'adi', soyad: 'soyad', adres: 'adres'}],
                    loading:false
                });
            })
    }

    notifySuccess = (message) => {
        toast.success(message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
        });
    }

    notifyFailure = (message)  =>{
        toast.error(message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
        });
    }

    setModelOpened = (modelOpened) => {
        this.setState({
            modelOpened
        })
    }

    onIconClick = (event, field) => {
        const {id} = field;
        const {tableData} = this.state;

        const filteredItems = tableData.filter(tableDataItem => {
            return tableDataItem.id === id
        });
        if(filteredItems.length > 0){
            const filterdItem = filteredItems[0];
            this.setState({
                modelOpened: true,
                windowFormData: filterdItem
            })
        }else {
            this.notifyFailure(id + " numaralı kayıt liste içinde bulunamıştır");
        }
    }

    onConfirmCancel = () => {
        this.setConfirmWindowOpened(false);
    }

    setConfirmWindowOpened(opened) {
        this.setState({
            confirmOpened: opened
        })
    }

    onConfirmed = () => {
        const { state } = this;
        const { modelOpened } = state;

        if(modelOpened){
            const windowFormData = this.state.windowFormData;

            var self = this;
            axios.post('/formData/delete', windowFormData)
                .then(function (response) {
                    const { data } = response;
                    const { success, message } = data;
                    if(success === true){
                        self.notifySuccess(message);
                        self.setModelOpened(false);
                        self.sendListRequest();
                        self.setConfirmWindowOpened(false);

                    }else{
                        self.notifyFailure(message);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    self.notifyFailure("Hata Durum oluşmuştur. Lütfen Sistem Yöneticiniz ile görüşünüz");
                });
        }
    }

    render() {
        const { activeItem, formData, tableData, modelOpened, windowFormData, loading, confirmOpened } = this.state
        const welcomPage = activeItem === 'Giriş';
        const newRecord = activeItem === 'Yeni Kayıt';
        const listing = activeItem === 'Listeleme';

        return (
            <div>
                <ToastContainer />
                <Grid>
                    <Grid.Column width={3}>
                        <Menu fluid vertical tabular>
                            <Menu.Item
                                name='Giriş'
                                active={welcomPage}
                                onClick={this.handleItemClick}
                            />
                            <Menu.Item
                                name='Yeni Kayıt'
                                active={newRecord}
                                onClick={this.handleItemClick}
                            />
                            <Menu.Item
                                name='Listeleme'
                                active={listing}
                                onClick={this.handleItemClick}
                            />
                        </Menu>
                    </Grid.Column>

                    <Grid.Column stretched width={12}>
                        <Segment>
                            {welcomPage && (<WelcomePage/>)}
                            {newRecord && (<NewRecordPage formData={formData} onFormDataChanged={this.onFormDataChanged} onSaveClick={this.onSaveClick} modelOpened={modelOpened} onRenewClick={this.onRenewClick}/>)}
                            {listing && (<ListPage tableData={tableData} onIconClick={this.onIconClick} loading={loading}/>)}
                        </Segment>
                    </Grid.Column>
                </Grid>

                <Modal
                    onClose={() => this.setModelOpened(false)}
                    onOpen={() => this.setModelOpened(true)}
                    open={modelOpened}
                >
                    <Modal.Content>
                        <NewRecordPage formData={windowFormData} onFormDataChanged={this.onFormDataChanged} onSaveClick={this.onSaveClick} onDeleteClick={this.onDeleteClick} modelOpened={modelOpened}/>
                    </Modal.Content>
                </Modal>
                <Confirm
                    open={confirmOpened}
                    content='Silme işlemi gerçekleştirilecektir. Onaylıyor musunuz?'
                    cancelButton='İptal Et'
                    confirmButton="Onayla"
                    onCancel={this.onConfirmCancel}
                    onConfirm={this.onConfirmed}
                />

            </div>

        );
    }
}

export default App;
