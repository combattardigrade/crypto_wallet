import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonRow,
  IonCol,
  IonToggle,
  IonButton
} from '@ionic/react';

import { RouteComponentProps, withRouter } from 'react-router-dom';
import {
  peopleOutline, businessOutline,
   personCircleOutline,
  settingsOutline, cloudDownloadOutline, cloudUploadOutline
} from 'ionicons/icons';
import './Menu.css';
// import '../pages/styles.css'
import { menuController } from '@ionic/core';

// Actions
import { userLogout } from '../actions/auth'

//  Plugins
import { Plugins } from '@capacitor/core';
const { Browser } = Plugins;


class Menu extends Component {
  goToPage = (page) => {
    this.props.history.push(page)
    menuController.close()
    return
  }


  goToWebsite = async (url) => {
    await Browser.open({ url });
  }

  handleUserLogout = (e) => {
    e.preventDefault()
    const { dispatch } = this.props
    dispatch(userLogout())
    this.goToPage('login')
  }

  render() {
    const { user } = this.props


    return (
      <IonMenu contentId="main" type="overlay" disabled={this.props.location.pathname !== '/main' ? true : false}>
        <IonContent>
          <IonList id="inbox-list" >
            <IonRow>
              <IonCol size="2"><IonIcon style={{ fontSize: '50px' }} icon={personCircleOutline} /></IonCol>
              <IonCol size="8">
                <IonListHeader style={{ paddingTop: '0px' }}>{user ? user.firstName + ' ' + user.lastName : 'N/A'}</IonListHeader>
                <IonLabel className="dataField" style={{ paddingLeft: '10px' }}>Balance: {user ? parseFloat(user.balances[0].amount) : '0'} JWS</IonLabel>
              </IonCol>

            </IonRow>
          </IonList>

          <IonList id="labels-list">
            <IonListHeader>Menu</IonListHeader>
            <IonItem lines="full" button onClick={e => { e.preventDefault(); this.goToPage('contacts') }}>
              <IonIcon icon={peopleOutline}></IonIcon>
              <IonLabel style={{ marginLeft: '10px' }}>Contacts</IonLabel>
            </IonItem>
            <IonItem lines="full" button onClick={e => { e.preventDefault(); this.goToPage('receive') }}>
              <IonIcon icon={cloudDownloadOutline}></IonIcon>
              <IonLabel style={{ marginLeft: '10px' }}>Deposit</IonLabel>
            </IonItem>
            <IonItem lines="full" button onClick={e => { e.preventDefault(); this.goToPage('withdraw') }}>
              <IonIcon icon={cloudUploadOutline}></IonIcon>
              <IonLabel style={{ marginLeft: '10px' }}>Withdraw</IonLabel>
            </IonItem>
            <IonItem lines="full" button onClick={e => { e.preventDefault(); this.goToPage('settings') }}>
              <IonIcon icon={settingsOutline}></IonIcon>
              <IonLabel style={{ marginLeft: '10px' }}>Settings</IonLabel>
            </IonItem>
            <IonItem lines="full" button onClick={e => { e.preventDefault(); this.goToPage('settings') }}>
              <IonIcon icon={businessOutline}></IonIcon>
              <IonLabel style={{ marginLeft: '10px' }}>About</IonLabel>
            </IonItem>
          </IonList>

          <IonItem lines="none" button style={{ position: 'absolute', bottom: '20px', width: '100%' }} onClick={this.handleUserLogout} >
            <IonLabel style={{ textAlign: 'center' }}>Log out</IonLabel>
          </IonItem>
        </IonContent>
      </IonMenu>
    );
  }

};

function mapStateToProps({ user }) {
  return {
    user
  }
}
export default withRouter(connect(mapStateToProps)(Menu))
