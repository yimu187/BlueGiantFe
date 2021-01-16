import React, {Component} from 'react';
import './App.css';
import FilterComp from './components/FilterComp'
import RecordComp from './components/RecordComp'
import Heading from './components/Heading'
import {BrowserRouter as Router, Route, Redirect, NavLink, Switch} from 'react-router-dom';

const News =  (route) => {
    console.log(route);
    console.log(route.match.params.newsId);
    return (<h1>News {route.match.params.newsId}</h1>)
}

const Profile =  () => {
    return (<h1>Profile Page</h1>)
}

const Error =  () => {
    return (<h1>This Page Not Found</h1>)
}

class App extends Component {

  state = {
    list : []
  }

  constructor(){
    super();
    this.searchCallBack = this.searchCallBack.bind(this);
  }

  searchCallBack = (searchData) =>{
    console.log('searchCallBack');
    this.setState({
      list: searchData
    })
  }

  onClickButton = () =>{
    this.setState(prevState => ({
        login: !prevState.login
    }))
  }

  render() {
    return (
        <Router>

            <div>
                <NavLink activeClassName='activeLink' exact to="/">Home Page</NavLink> <br/>
                <NavLink activeClassName='activeLink' exact to="/Contact">Contact Page</NavLink> <br/>
                <NavLink activeClassName='activeLink' exact to="/news/15">News Page</NavLink> <br/>
                <NavLink activeClassName='activeLink' exact to="/profile">Profile</NavLink> <br/>

                <br/>
                <br/>

                <input type='button' onClick={this.onClickButton} value={this.state.login ? 'Log in' : 'Log out'}/>

                <Switch>

                    <Route path="/" exact render={
                        () => {
                            return <Heading/>
                        }
                    }/>

                    <Route path="/contact" exact render={
                        () => {
                            return <div>
                                <FilterComp
                                    searchCallBack = {this.searchCallBack}
                                    btnSilHidden={true}
                                />
                                <RecordComp list={this.state.list} recordSearchCallBack={this.searchCallBack}/>
                            </div>
                        }
                    }/>

                    <Route path="/news/:newsId" exact component={News}/>
                    <Route path="/profile" exact render={() => (
                        this.state.login ? (<Profile/>) : (<Redirect to="/"/>)
                    )}/>

                    <Route component={Error}/>

                </Switch>

            </div>

        </Router>
    );
  }
}

export default App;
