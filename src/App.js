import React, { Component } from 'react';
// import './App.css';
import Aux from './hoc/Aux';
import { Switch, Route, Redirect } from 'react-router-dom';
// import Home from './View/Home/Home';
// import Login from './View/Forms/Login/Login';
import PageNotFound from './Component/PageNotFound/PageNotFound';
// import Register from './View/Forms/Register/Register';
import Layout from './Component/Common/Layout/Layout';
import { LanguageProvider } from './View/Language/Language';
// import { User } from './View/Forms/User/User';

class App extends Component {
  render() {
    return (
      <LanguageProvider>
        <Aux>
          <Switch>
            {/* <Route path="/application" exact name="Login" render={props => <Login {...props}/>} /> */}
            {/* <Route path="/" exact name="User" render={props => <User {...props}/>} /> */}
            <Route path="/404" exact name="404" render={props => <PageNotFound {...props} />} />
            <Route path="/" strict={true} name="Home" render={props => <Layout {...props} />} />
            {/* <Redirect to="/404" from="*" /> */}
          </Switch>
        </Aux>
      </LanguageProvider>
    );
  }
}

export default App;
