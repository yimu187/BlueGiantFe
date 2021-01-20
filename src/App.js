import React, {Component} from 'react';
import './App.css';
import {Grid, Menu, Segment, Modal, Confirm} from 'semantic-ui-react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import WelcomePage from "./components/WelcomePage";
import NewRecordPage from "./components/NewRecordPage";
import ListPage from "./components/ListPage";
import SinginPage from "./components/SigninPage";
import SignupPage from "./components/SignupPage";


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
        signinUsername: '',
        signinPassword: '',
        showSignin: true,
        jwt: null,
        signupUsername: '',
        signupPassword: '',
        signupEmail: '',
        showSignup: false,
    }

    constructor(){
        super();
        this.onFormDataChanged = this.onFormDataChanged.bind(this);

        document.title = 'Task Page';
    }

    componentDidMount() {
        this.checkLoginInfo();
    }

    checkLoginInfo = () => {
        const url = "/api/auth/loginInfo"
        const self = this;
        axios.get(url)
            .then(function (response) {
                const { data } = response;
                const { success, jwt } = data;
                if(success === true){
                    self.setState({
                        jwt,
                        showSignin: jwt == null
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
            })

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
                dogumYeri: '',

            }
        })
    }

    onSaveClick = () => {

        const { state } = this;
        const { modelOpened, jwt } = state;

        const formData = !modelOpened ? this.state.formData : this.state.windowFormData;
        var self = this;
        let config = {
            headers: {
                Authorization: 'Bearer ' + jwt,
            }
        }
        axios.post('/formData', formData, config)
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

    sendLogoutRequest = () => {
        const self = this;
        const url = "/api/auth/logout"
        axios.post(url)
            .then(function (response) {
                console.log(response);
                window.location.reload();
            })
            .catch(function (error) {
                console.log(error);
                self.notifyFailure("Hata Durum oluşmuştur. Lütfen Sistem Yöneticiniz ile görüşünüz");
            });
    }

    handleItemClick = (e, { name }) => {
        if(name === 'Listeleme'){
            this.sendListRequest();
        }
        this.setState({ activeItem: name })
        if(name === 'Çıkış'){
            this.sendLogoutRequest();
        }
    };

    sendListRequest = () => {
        var self = this;
        const url = '/formData';
        this.setState({loading: true})
        let config = {
            headers: {
                Authorization: 'Bearer ' + this.state.jwt,
            }
        };
        axios.get(url, config)
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
            axios.delete('/formData',
                {
                    data: windowFormData,
                    headers: {
                        Authorization: 'Bearer ' + this.state.jwt,
                    }
                }

            )
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
                    self.notifyFailure("HataonRenewClick Durum oluşmuştur. Lütfen Sistem Yöneticiniz ile görüşünüz");
                });
        }
    }

    onSignFormDataChanged = (field, event) => {
        const {id, value} = event;
        const obj = {};
        obj[id]=  value;
        this.setState(obj)
    }

    onOpenSignupFormClick= () => {
        this.setState({
            showSignup: true,
            showSignin: false,
        })
    }
    onSignupClick = () => {
        var self = this;
        const url = '/api/auth/signup';
        const signupRequest = {
            username: this.state.signupUsername,
            password: this.state.signupPassword,
            email: this.state.signupEmail,
            role:['ROLE_USER']
        }
        axios.post(url, signupRequest)
            .then(function (response) {
                const { data } = response;
                const { success, message, jwt } = data;
                if(success === true){
                    self.setState({
                        jwt,
                        showSignup: false
                    });
                }else{
                    self.notifyFailure(message);
                }
            })
            .catch(function (error) {
                console.log(error);
                self.notifyFailure("Hata Durum oluşmuştur. Lütfen Sistem Yöneticiniz ile görüşünüz");
            });
    }

    onSigninClick = () => {

        var self = this;
        const url = '/api/auth/signin';
        const signinRequest = {
            username: this.state.signinUsername,
            password: this.state.signinPassword,
        }
        axios.post(url, signinRequest)
            .then(function (response) {
                const { data } = response;
                const { success, message, jwt } = data;
                if(success === true){
                    self.setState({
                        jwt,
                        showSignin: false
                    });
                }else{
                    self.notifyFailure(message);
                }
            })
            .catch(function (error) {
                console.log(error);
                self.notifyFailure("Hata Durum oluşmuştur. Lütfen Sistem Yöneticiniz ile görüşünüz");
            });

    }

    render() {
        const {
            activeItem,
            formData,
            tableData,
            modelOpened,
            windowFormData,
            loading,
            confirmOpened,
            signinUsername,
            signinPassword,
            showSignin,
            signupUsername,
            signupPassword,
            showSignup,
        } = this.state
        const welcomPage = activeItem === 'Giriş';
        const newRecord = activeItem === 'Yeni Kayıt' ;
        const listing = activeItem === 'Listeleme';

        return (
            <div>
                <ToastContainer />
                {!showSignin && !showSignup && (<Grid>
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
                            <Menu.Item
                                name='Çıkış'
                                active={listing}
                                onClick={this.handleItemClick}
                            />
                        </Menu>
                    </Grid.Column>

                    <Grid.Column stretched width={12}>
                        <Segment>
                            {welcomPage && (<WelcomePage/>)}
                            {newRecord && (<NewRecordPage formData={formData} onFormDataChanged={this.onFormDataChanged}
                                                          onSaveClick={this.onSaveClick} modelOpened={modelOpened}
                                                          onRenewClick={this.onRenewClick}/>)}
                            {listing && (
                                <ListPage tableData={tableData} onIconClick={this.onIconClick} loading={loading}/>)}
                        </Segment>
                    </Grid.Column>
                </Grid>)
                }

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
                {showSignin && (<SinginPage
                    username={signinUsername}
                    password={signinPassword}
                    onSigninClick={this.onSigninClick}
                    onSignFormDataChanged={this.onSignFormDataChanged}
                    onOpenSignupFormClick={this.onOpenSignupFormClick}
                />)}

                {showSignup && (<SignupPage
                    username={signupUsername}
                    password={signupPassword}
                    onSignupClick={this.onSignupClick}
                    onSignFormDataChanged={this.onSignFormDataChanged}
                    onOpenSignupFormClick={this.onOpenSignupFormClick}
                />)}

            </div>

        );
    }

}

export default App;
