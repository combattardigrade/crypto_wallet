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
import { saveUserData } from '../actions/user'
import { saveTxs } from '../actions/transactions'
import { saveRankings } from '../actions/rankings'
import { saveTxReasons } from '../actions/txReasons'
import { saveContacts } from '../actions/contacts'
import { saveInbox } from '../actions/inbox'

// API
import { getUserData, getTxs, getRankings, getTxReasons, getContacts, getInbox } from '../utils/api'




class Main extends Component {
    state = {
        pageTitle: 'Wallet'
    }

    ionViewWillEnter() {
        
        const { token, dispatch } = this.props
        getUserData({ token })
            .then(data => data.json())
            .then((res) => {
                if (res.status == 'OK') {
                    console.log(res)
                    dispatch(saveUserData(res.payload))
                }
            })

        getTxs({ token })
            .then(data => data.json())
            .then((res) => {
                if (res.status == 'OK') {
                    console.log(res)
                    dispatch(saveTxs(res.payload))
                }
            })

        getRankings({ period: 'week', token })
            .then(data => data.json())
            .then((res) => {
                if (res.status == 'OK') {
                    console.log(res)
                    dispatch(saveRankings({ period: 'week', rankings: res.payload }))
                }
            })

        getRankings({ period: 'month', token })
            .then(data => data.json())
            .then((res) => {
                if (res.status == 'OK') {
                    console.log(res)
                    dispatch(saveRankings({ period: 'month', rankings: res.payload }))
                }
            })

        getRankings({ period: 'year', token })
            .then(data => data.json())
            .then((res) => {
                if (res.status == 'OK') {
                    console.log(res)
                    dispatch(saveRankings({ period: 'year', rankings: res.payload }))
                }
            })

        getTxReasons({ token })
            .then(data => data.json())
            .then((res) => {
                console.log(res)
                dispatch(saveTxReasons(res.payload))
            })

        getContacts({ token })
            .then(data => data.json())
            .then((res) => {
                console.log(res)
                dispatch(saveContacts(res.payload))
            })

        getInbox({ token })
            .then(data => data.json())
            .then((res) => {
                if(res.status === 'OK') {
                    console.log(res.payload)
                    dispatch(saveInbox(res.payload))
                }
            })

    }

    handleTabBtnClick = (page) => {
        this.setState({ pageTitle: page })
    }

    handleChangeTab = (tab) => {
        // this.tabs.current.getSelected().then(tab => console.log(tab))
        this.tabsRef.current.select(tab)
    }

    tabsRef = React.createRef()

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
                <IonContent scrollY={false} >
                    <ion-tabs ref={this.tabsRef} >
                        <ion-tab tab="tab-wallet">
                            <ion-nav><Wallet handleChangeTab={this.handleChangeTab} /></ion-nav>
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

function mapStateToProps({ auth, user }) {
    return {
        token: auth.token,
        user,
    }
}

export default connect(mapStateToProps)(withIonLifeCycle(Main))