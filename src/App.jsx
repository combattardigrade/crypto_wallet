import Menu from './components/Menu.jsx';

import React, { Component } from 'react'
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux'
import { Plugins } from '@capacitor/core';



/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import Intro from './pages/Intro'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Main from './pages/Main'
import TxDetails from './pages/TxDetails'
import Withdraw from './pages/Withdraw'
import Settings from './pages/Settings'
import Receive from './pages/Receive'
import TxStatus from './pages/TxStatus'
import ConfirmTx from './pages/ConfirmTx'
import Contacts from './pages/Contacts'
import NewContact from './pages/NewContact'
import ContactDetails from './pages/ContactDetails'
import PaymentRequest from './pages/PaymentRequest'

class App extends Component {

  state = {
    selectedPage: '',
    setSelectedPage: ''
  }

  render() {
    const { selectedPage, setSelectedPage } = this.state
    const { auth } = this.props

    return (
      <IonApp>
        <IonReactRouter>
          <IonSplitPane contentId="main">
            <Menu selectedPage={selectedPage} />
            <IonRouterOutlet id="main">
              <Route path="/" render={() => <Redirect to="/login" />} exact={true} />
              <Route path="/intro" component={Intro} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <PrivateRoute path='/main' component={Main} auth={auth}/>
              <PrivateRoute path='/withdraw' component={Withdraw} auth={auth}/>
              <PrivateRoute path='/settings' component={Settings} auth={auth}/>
              <PrivateRoute path='/tx/:id' component={TxDetails} auth={auth} />
              <PrivateRoute path="/receive" component={Receive} auth={auth} />
              <PrivateRoute path='/txStatus/:status' component={TxStatus} auth={auth} />
              <PrivateRoute path='/confirmTx' component={ConfirmTx} auth={auth} />
              <PrivateRoute path='/contacts' component={Contacts} auth={auth} />
              <PrivateRoute path='/newContact' component={NewContact} auth={auth} />
              <PrivateRoute path='/contact/:contactId' component={ContactDetails} auth={auth} />
              <PrivateRoute path='/paymentRequest/:requestId' component={PaymentRequest} auth={auth} />
            </IonRouterOutlet>
          </IonSplitPane>
        </IonReactRouter>
      </IonApp>
    );
  }
};

function PrivateRoute({ component: Component, ...rest }) {
  const { auth } = rest
  return (
    <Route
      {...rest}
      render={props =>
        auth !== null ? (
          <Component {...props} />
        )
          : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location.pathname } // thanks a lot of the suggestion :)
              }}
            />
          )
      }
    />
  )
}

function mapStateToProps({ device, auth }) {
  return {
    device,
    auth
  }
}

export default connect(mapStateToProps)(App)
