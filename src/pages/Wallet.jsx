import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import {
    IonSpinner, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonIcon, IonButton,
    IonItem, IonLabel, IonTabs, IonTabBar, IonTabButton, IonTab, IonBadge, IonGrid, IonRow, IonCol, IonAlert, withIonLifeCycle, IonNav
} from '@ionic/react';
import {
    personCircleOutline, arrowUpOutline, arrowDownOutline, cloudUploadOutline, calendar, personCircle, map, informationCircle
} from 'ionicons/icons'



class Wallet extends Component {

    state = {
        selectedTxType: 'all'
    }

    ionViewWillEnter = () => {

    }

    handleSelectedTxType = (txType) => {
        this.setState({ selectedTxType: txType })
    }

    render() {

        const { selectedTxType } = this.state

        return (
            <Fragment>

                <IonItem className="walletBalanceContainer" lines="none" >
                    <div style={{ height: '35vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <IonGrid >
                            <IonRow style={{ marginTop: '0px' }}>
                                <IonCol style={{ textAlign: 'center' }}>
                                    <IonLabel style={{ fontSize: '3.2em' }}>4354.23</IonLabel>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol style={{ textAlign: 'center' }}>
                                    <IonLabel className="walletCoinSymbol">COINS</IonLabel>
                                </IonCol>
                            </IonRow>
                            <IonRow style={{ marginTop: '20px' }}>
                                <IonCol style={{ textAlign: 'center' }} size="3" offset="1.5">
                                    <a className="walletBtn" ><IonIcon icon={arrowUpOutline}></IonIcon></a>
                                    <IonLabel className="walletBtnSubtitle">Send</IonLabel>
                                </IonCol>
                                <IonCol style={{ textAlign: 'center' }} size="3">
                                    <a className="walletBtn" ><IonIcon icon={arrowDownOutline}></IonIcon></a>
                                    <IonLabel className="walletBtnSubtitle">Receive</IonLabel>
                                </IonCol>
                                <IonCol style={{ textAlign: 'center' }} size="3">
                                    <a className="walletBtn" ><IonIcon icon={cloudUploadOutline}></IonIcon></a>
                                    <IonLabel className="walletBtnSubtitle">Withdraw</IonLabel>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </div>
                </IonItem>
                <IonItem lines="full">
                    <IonGrid style={{ height: '100%', padding: '0px' }}>
                        <IonRow style={{ height: '100%' }}>
                            <IonCol size="4" style={{ textAlign: 'center' }}>
                                <IonLabel onClick={e => { e.preventDefault(); this.handleSelectedTxType('all') }} className={selectedTxType == 'all' ? 'walletTxSelectBtnActive' : 'walletTxSelectBtn'} >All</IonLabel>
                            </IonCol>
                            <IonCol size="4" style={{ textAlign: 'center' }}>
                                <IonLabel onClick={e => { e.preventDefault(); this.handleSelectedTxType('received') }} className={selectedTxType == 'received' ? 'walletTxSelectBtnActive' : 'walletTxSelectBtn'}>Received</IonLabel>
                            </IonCol>
                            <IonCol size="4" style={{ textAlign: 'center' }}>
                                <IonLabel onClick={e => { e.preventDefault(); this.handleSelectedTxType('sent') }} className={selectedTxType == 'sent' ? 'walletTxSelectBtnActive' : 'walletTxSelectBtn'}>Sent</IonLabel>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonItem>

                <IonItem detail button>
                    <IonGrid>
                        <IonRow>
                            <IonCol size="3" style={{textAlign:'center'}}>
                                <IonIcon style={{fontSize:'48px'}} color="primary" icon={personCircleOutline}></IonIcon>
                            </IonCol>
                            <IonCol size="5">
                                <IonLabel className="txUsername">John Smith</IonLabel>
                                <IonLabel className="txReason">Job Completed</IonLabel>
                            </IonCol>
                            <IonCol size="4" style={{textAlign:'right'}}>
                                <IonLabel className="txAmount">+1,350 JW</IonLabel>
                                <IonLabel className="txDate">23/03/2020</IonLabel>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonItem>


            </Fragment>
        )
    }
}

export default withIonLifeCycle(Wallet)
