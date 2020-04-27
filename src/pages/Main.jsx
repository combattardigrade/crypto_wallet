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
import {
    getUserData, getTxs, getRankings, getTxReasons, getContacts, getInbox,
    saveRegistrationKey,
} from '../utils/api'

// Locales
import en from '../locales/en'
import fr from '../locales/fr'
import nl from '../locales/nl'
import es from '../locales/es'
import pt from '../locales/pt'
import ja from '../locales/ja'
import zh from '../locales/zh'


// Plugins
import { Plugins } from '@capacitor/core'
const { PushNotifications } = Plugins
const LOCALES = { en, fr, nl, es, pt, ja, zh }


class Main extends Component {
    state = {
        pageTitle: 'Wallet',
        showAlert: false,
        alertTitle: '',
        alertMsg: '',
    }

    ionViewWillEnter() {

        const { token, lan, dispatch } = this.props
        this.setState({ pageTitle: LOCALES[lan]['wallet']['wallet_title'] })

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
                if (res.status === 'OK') {
                    console.log(res.payload)
                    dispatch(saveInbox(res.payload))
                }
            })

        // Push Notifications
        PushNotifications.register();

        PushNotifications.addListener('registration', (registrationId) => {
            console.log('Registration ID: ' + registrationId.value)
            // send token to server
            saveRegistrationKey({ registrationId: registrationId.value, token })
                .then(data => data.json())
                .then((res) => {
                    if (res.tatus === 'OK') {
                        console.log(res.payload)
                    }
                })
        })

        PushNotifications.addListener('registrationError', (error) => {
            console.log(error)
        })

        PushNotifications.addListener('pushNotificationReceived', (notification) => {
            console.log('Push notification received: ')
            console.log(notification)
        })

        PushNotifications.addListener('pushNotificationActionPerformed', (action) => {
            console.log('Push action performed: ')
            console.log(action)

            try {
                if (action.notification.data.type === 'PAYMENT_REQUEST') {
                    this.handleChangeTab('tab-inbox')
                }
            } catch (e) {
                console.log(e)
            }
        })

    }

    showAlert = (msg, title) => {
        this.setState({ showAlert: true, alertMsg: msg, alertTitle: title })
    }

    handleTabBtnClick = (page) => {
        this.setState({ pageTitle: page })
    }

    handleChangeTab = (tab) => {
        // this.tabs.current.getSelected().then(tab => console.log(tab))
        this.tabsRef.current.select(tab)
        const page = tab === 'tab-send' ? 'Send' : tab === 'tab-inbox' ? 'Inbox' : 'Wallet'
        this.setState({ pageTitle: page })
    }

    handleRefreshBtn = (e) => {
        e.preventDefault()
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
                if (res.status === 'OK') {
                    console.log(res.payload)
                    dispatch(saveInbox(res.payload))
                }
            })
    }

    tabsRef = React.createRef()

    render() {

        const { pageTitle } = this.state
        const { lan } = this.props

        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar color="primary" className="jiwardsToolbar">
                        <IonButtons slot="start">
                            <IonMenuButton />
                        </IonButtons>
                        <IonTitle>{pageTitle}</IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={this.handleRefreshBtn}><IonIcon icon={refreshOutline}></IonIcon></IonButton>
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
                            <ion-nav><Send handleChangeTab={this.handleChangeTab} /></ion-nav>
                        </ion-tab>
                        <ion-tab tab="tab-inbox">
                            <ion-nav><Inbox /></ion-nav>
                        </ion-tab>
                        <ion-tab-bar slot="bottom">
                            <ion-tab-button tab="tab-wallet" onClick={e => { e.preventDefault(); this.handleTabBtnClick(LOCALES[lan]['main']['tab_wallet_btn']) }}>
                                <IonIcon icon={walletOutline}></IonIcon>
                                <ion-label>{LOCALES[lan]['main']['tab_wallet_btn']}</ion-label>
                            </ion-tab-button>
                            <ion-tab-button tab="tab-rankings" onClick={e => { e.preventDefault(); this.handleTabBtnClick(LOCALES[lan]['main']['tab_rankings_btn']) }}>
                                <IonIcon icon={trophyOutline}></IonIcon>
                                <ion-label>{LOCALES[lan]['main']['tab_rankings_btn']}</ion-label>
                            </ion-tab-button>
                            <ion-tab-button tab="tab-send" onClick={e => { e.preventDefault(); this.handleTabBtnClick(LOCALES[lan]['main']['tab_send_btn']) }}>
                                <IonIcon icon={sendOutline}></IonIcon>
                                <ion-label>{LOCALES[lan]['main']['tab_send_btn']}</ion-label>
                            </ion-tab-button>
                            <ion-tab-button tab="tab-inbox" onClick={e => { e.preventDefault(); this.handleTabBtnClick(LOCALES[lan]['main']['tab_inbox_btn']) }}>
                                <IonIcon icon={fileTrayOutline}></IonIcon>
                                <ion-label>{LOCALES[lan]['main']['tab_inbox_btn']}</ion-label>
                            </ion-tab-button>
                        </ion-tab-bar>
                    </ion-tabs>

                    <IonAlert
                        isOpen={this.state.showAlert}
                        header={this.state.alertTitle}
                        message={this.state.alertMsg}
                        buttons={[{
                            text: 'OK',
                            handler: () => {
                                this.setState({ showAlert: false })
                            }
                        }]}
                    />

                </IonContent>
            </IonPage>
        )
    }
}

function mapStateToProps({ auth, user, device }) {
    return {
        token: auth.token,
        user,
        lan: device && device.language
    }
}

export default connect(mapStateToProps)(withIonLifeCycle(Main))