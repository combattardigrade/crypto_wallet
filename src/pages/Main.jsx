import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    IonSpinner, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonIcon, IonButton,
    IonItem, IonLabel, IonTabs, IonTabBar, IonTabButton, IonTab, IonBadge, IonGrid, IonRow, IonCol, IonAlert, withIonLifeCycle, IonNav
} from '@ionic/react';
import {
    refreshOutline, walletOutline, trophyOutline, sendOutline, fileTrayFullOutline, fileTrayOutline
} from 'ionicons/icons'

// Components
import Wallet from './Wallet'
import Rankings from './Rankings'
import Send from './Send'
import Inbox from './Inbox'

// Actions
import { saveDeviceData } from '../actions/device'

// Plugins
import { Plugins } from '@capacitor/core';
const { Device } = Plugins;

class Main extends Component {
    state = {
        pageTitle: 'Wallet'
    }

    ionViewWillEnter() {
        const { dispatch } = this.props
        Device.getInfo()
            .then((info) => {
                dispatch(saveDeviceData(info))
            })
    }

    handleTabBtnClick = (page) => {
        this.setState({ pageTitle: page })
    }

    render() {

        const { pageTitle } = this.state

        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar color="primary" className="jiwardsToolbar">
                        <IonButtons slot="start">
                            <IonMenuButton />
                        </IonButtons>
                        <IonTitle>{pageTitle}</IonTitle>
                        <IonButtons slot="end">
                            <IonButton ><IonIcon icon={refreshOutline}></IonIcon></IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <ion-tabs selectedIndex="2">
                        <ion-tab tab="tab-wallet">
                            <ion-nav><Wallet /></ion-nav>
                        </ion-tab>
                        <ion-tab tab="tab-rankings">
                            <ion-nav><Rankings /></ion-nav>
                        </ion-tab>
                        <ion-tab tab="tab-send">
                            <ion-nav><Send /></ion-nav>
                        </ion-tab>
                        <ion-tab tab="tab-inbox">
                            <ion-nav><Inbox /></ion-nav>
                        </ion-tab>
                        <ion-tab-bar slot="bottom">
                            <ion-tab-button tab="tab-wallet" onClick={e => { e.preventDefault(); this.handleTabBtnClick('Wallet') }}>
                                <IonIcon icon={walletOutline}></IonIcon>
                                <ion-label>Wallet</ion-label>
                            </ion-tab-button>
                            <ion-tab-button tab="tab-rankings" onClick={e => { e.preventDefault(); this.handleTabBtnClick('Rankings') }}>
                                <IonIcon icon={trophyOutline}></IonIcon>
                                <ion-label>Rankings</ion-label>
                            </ion-tab-button>
                            <ion-tab-button tab="tab-send" onClick={e => { e.preventDefault(); this.handleTabBtnClick('Send') }}>
                                <IonIcon icon={sendOutline}></IonIcon>
                                <ion-label>Send</ion-label>
                            </ion-tab-button>
                            <ion-tab-button tab="tab-inbox" onClick={e => { e.preventDefault(); this.handleTabBtnClick('Inbox') }}>
                                <IonIcon icon={fileTrayOutline}></IonIcon>
                                <ion-label>Inbox</ion-label>
                            </ion-tab-button>
                        </ion-tab-bar>
                    </ion-tabs>



                </IonContent>
            </IonPage>
        )
    }
}

function mapStateToProps({ auth }) {
    return {
        token: auth.token,

    }
}

export default connect(mapStateToProps)(withIonLifeCycle(Main))