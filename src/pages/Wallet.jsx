import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {
    IonList, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonIcon, IonButton,
    IonItem, IonLabel, IonTabs, IonTabBar, IonTabButton, IonTab, IonBadge, IonGrid, IonRow, IonCol, IonAlert, withIonLifeCycle, IonNav
} from '@ionic/react';
// Icons
import {
    personCircleOutline, arrowUpOutline, arrowDownOutline, cloudUploadOutline, calendar, personCircle, map, informationCircle
} from 'ionicons/icons'
import { MdCallMade, MdCallReceived } from 'react-icons/md'

const moment = require('moment')

class Wallet extends Component {

    state = {
        selectedTxType: 'all'
    }

    ionViewWillEnter = () => {

    }

    handleSelectedTxType = (txType) => {
        this.setState({ selectedTxType: txType })
    }

    handleTxClick = (txId) => {
        console.log(txId)
        this.props.history.push('/tx/' + txId)
    }

    render() {

        const { selectedTxType } = this.state
        const { user, transactions, handleChangeTab } = this.props

        const balance = user ? 'balances' in user ? parseFloat(user.balances[0].amount) : 0.0 : 0.0

        return (
            <Fragment>

                <IonItem className="walletBalanceContainer" lines="none" >
                    <div style={{ height: '35vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <IonGrid >
                            <IonRow style={{ marginTop: '0px' }}>
                                <IonCol style={{ textAlign: 'center' }}>
                                    <IonLabel style={{ fontSize: '2.5em' }}>{balance}</IonLabel>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol style={{ textAlign: 'center' }}>
                                    <IonLabel className="walletCoinSymbol">JWS</IonLabel>
                                </IonCol>
                            </IonRow>
                            <IonRow style={{ marginTop: '20px' }}>
                                <IonCol style={{ textAlign: 'center' }} size="3" offset="1.5">
                                    <a className="walletBtn" onClick={e => {e.preventDefault(); handleChangeTab('tab-send'); }}><MdCallMade style={{ paddingTop: '10px', fontSize: '28px' }} color="white" /></a>
                                    <IonLabel className="walletBtnSubtitle">Send</IonLabel>
                                </IonCol>
                                <IonCol style={{ textAlign: 'center' }} size="3">
                                    <a className="walletBtn" onClick={e => { e.preventDefault(); this.props.history.push('/receive')}}><MdCallReceived style={{ paddingTop: '10px', fontSize: '28px' }} color="white" /></a>
                                    <IonLabel className="walletBtnSubtitle">Receive</IonLabel>
                                </IonCol>
                                <IonCol style={{ textAlign: 'center' }} size="3">
                                    <a onClick={e => {e.preventDefault(); this.props.history.push('/withdraw')}} className="walletBtn" ><IonIcon icon={cloudUploadOutline}></IonIcon></a>
                                    <IonLabel className="walletBtnSubtitle">Withdraw</IonLabel>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </div>
                </IonItem>


                <IonItem lines="full" color="white">
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
                <div style={{height:'100%',backgroundColor:'white'}}>
                <div  style={{ height: '45vh', overflow: 'auto'}}>
                    
                        {
                            transactions && Object.values(transactions).length > 0 && user
                                ?
                                Object.values(transactions).filter((tx) => {
                                    let operation = tx.userId === user.id ? 'sent' : 'received'
                                    if (selectedTxType != operation && selectedTxType != 'all') {
                                        return false
                                    }
                                    return true
                                })
                                    .map((tx, index, arr) => {
                                        
                                        let operation = tx.userId === user.id ? 'sent' : 'received'
                                        let name = operation === 'sent' ? tx.to.firstName + ' ' + tx.to.lastName : tx.from.firstName + ' ' + tx.from.lastName

                                        return (
                                            <IonItem onClick={e => {e.preventDefault(); this.handleTxClick(tx.id); }} color="white" detail button key={tx.id} style={arr.length - 1 == index ? {marginBottom:'30px'} : {}}>
                                                <IonGrid>
                                                    <IonRow>
                                                        <IonCol size="3" style={{ textAlign: 'center' }}>
                                                            <IonIcon style={{ fontSize: '48px' }} color="primary" icon={personCircleOutline}></IonIcon>
                                                        </IonCol>
                                                        <IonCol size="5">
                                                            <IonLabel className="txUsername">{name}</IonLabel>
                                                            <IonLabel className="txReason">{tx.reason}</IonLabel>
                                                            <IonLabel className="txDate">{moment(tx.createdAt).format('DD/MM/YYYY')}</IonLabel>
                                                        </IonCol>
                                                        <IonCol size="4" style={{ textAlign: 'right' }}>
                                                            {
                                                                operation === 'received'
                                                                    ?
                                                                    <IonLabel className="txAmount">+{parseFloat(tx.amount).toFixed(2)} <span>{tx.currency}</span> </IonLabel>
                                                                    :
                                                                    <IonLabel className="txAmount" style={{ color: 'red' }}>-{parseFloat(tx.amount).toFixed(2)} <span>{tx.currency}</span></IonLabel>
                                                            }
                                                            <IonLabel className="txDate">{operation === 'received' ? 'Payment Received' : 'Payment Sent'}</IonLabel>
                                                        </IonCol>
                                                    </IonRow>
                                                </IonGrid>
                                            </IonItem>
                                        )
                                    })
                                :
                                null

                        }

                        

                        

                </div>
                </div>

            </Fragment>
        )
    }
}

function mapStateToProps({ auth, user, transactions }) {
    return {
        token: auth.token,
        user,
        transactions,
    }
}

export default withRouter(connect(mapStateToProps)(withIonLifeCycle(Wallet)))