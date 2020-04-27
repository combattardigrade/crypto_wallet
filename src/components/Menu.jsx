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

// Locales
import en from '../locales/en'
import fr from '../locales/fr'
import nl from '../locales/nl'
import es from '../locales/es'
import pt from '../locales/pt'
import ja from '../locales/ja'
import zh from '../locales/zh'


//  Plugins
import { Plugins } from '@capacitor/core';
const { Browser } = Plugins;
const LOCALES = { en, fr, nl, es, pt, ja, zh }

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
    // this.goToPage('login')
  }

  render() {
    const { user, lan } = this.props

    if(!lan) {
      return 'Loading...'
    }

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
              <IonLabel style={{ marginLeft: '10px' }}>{LOCALES[lan]['menu']['contacts']}</IonLabel>
            </IonItem>
            <IonItem lines="full" button onClick={e => { e.preventDefault(); this.goToPage('receive') }}>
              <IonIcon icon={cloudDownloadOutline}></IonIcon>
              <IonLabel style={{ marginLeft: '10px' }}>{LOCALES[lan]['menu']['deposit']}</IonLabel>
            </IonItem>
            <IonItem lines="full" button onClick={e => { e.preventDefault(); this.goToPage('withdraw') }}>
              <IonIcon icon={cloudUploadOutline}></IonIcon>
              <IonLabel style={{ marginLeft: '10px' }}>{LOCALES[lan]['menu']['withdraw']}</IonLabel>
            </IonItem>
            <IonItem lines="full" button onClick={e => { e.preventDefault(); this.goToPage('settings') }}>
              <IonIcon icon={settingsOutline}></IonIcon>
              <IonLabel style={{ marginLeft: '10px' }}>{LOCALES[lan]['menu']['settings']}</IonLabel>
            </IonItem>
            {/* <IonItem lines="full" button onClick={e => { e.preventDefault(); this.goToPage('settings') }}>
              <IonIcon icon={businessOutline}></IonIcon>
              <IonLabel style={{ marginLeft: '10px' }}>About</IonLabel>
            </IonItem> */}
          </IonList>

          <IonItem lines="none" button style={{ position: 'absolute', bottom: '20px', width: '100%' }} onClick={this.handleUserLogout} >
            <IonLabel style={{ textAlign: 'center' }}>{LOCALES[lan]['menu']['logout']}</IonLabel>
          </IonItem>
        </IonContent>
      </IonMenu>
    );
  }

};

function mapStateToProps({ user, device }) {
  return {
    user,
    lan: device && device.language
  }
}
export default withRouter(connect(mapStateToProps)(Menu))
