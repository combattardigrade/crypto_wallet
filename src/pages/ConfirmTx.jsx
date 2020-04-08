import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import {
    IonPage, IonIcon, IonGrid, IonRow, IonCol, withIonLifeCycle, IonHeader, IonToolbar,
    IonItem, IonLabel, IonContent, IonButton, IonButtons, IonTitle, IonMenuButton
} from '@ionic/react';

import {
    returnDownBackOutline, chevronBackOutline, ellipsisVerticalOutline
} from 'ionicons/icons'

import Media from 'react-media';


// API
import { sendInternalTx, getTxs } from '../utils/api'

// Actions
import { saveNewTx, saveTxs } from '../actions/transactions'

const logoIcon = require('../components/logo_icon.png')

class ConfirmTx extends Component {

    handleBackBtn = () => {
        this.props.history.goBack()
    }

    handleSendBtn = () => {
        const { transfer, token, dispatch } = this.props
        
        const params = {
            toUserId: transfer.contact.contactId,
            amount: transfer.amount,
            currency: 'JWS',
            reason: transfer.reason,
            description: transfer.description,
            token
        }
        sendInternalTx(params)
            .then(data => data.json())
            .then((res) => {
                console.log(res)
                if (res.status == 'OK') {
                    getTxs({ token })
                        .then(data => data.json())
                        .then((res2) => {
                            if (res2.status == 'OK') {
                                console.log(res2)
                                dispatch(saveTxs(res2.payload))
                            }
                        })
                    // show tx status page
                    this.props.history.push('/txStatus/OK')
                    return
                } else {
                    this.props.history.push('/txStatus/ERROR')
                }
            })
            .catch((err) => {
                console.log(err)
                this.props.history.push('/txStatus/ERROR')
            })
    }

    render() {

        const { transfer } = this.props

        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar color="primary" className="jiwardsToolbar">
                        <IonButtons slot="start">
                            <IonButton onClick={e => { e.preventDefault(); this.handleBackBtn() }}><IonIcon icon={chevronBackOutline}></IonIcon></IonButton>
                            <IonMenuButton />
                        </IonButtons>
                        <IonTitle>Confirm Transfer</IonTitle>

                    </IonToolbar>
                </IonHeader>
                <IonContent scrollY={false}>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'start', height: '100%', width: '100%', flexDirection: 'column', marginTop: '5vh' }}>
                        <IonItem lines="none">
                            <IonGrid>
                                <Media
                                    queries={{
                                        small: "(min-height: 600px)"
                                    }}
                                >
                                    {
                                        matches => (
                                            <Fragment>
                                                {matches.small && (
                                                    <IonRow style={{ marginTop: '20px' }}>
                                                        <IonCol style={{ textAlign: 'center' }}>
                                                            <img src={logoIcon} />
                                                        </IonCol>
                                                    </IonRow>
                                                )}
                                            </Fragment>
                                        )
                                    }
                                </Media>
                                <IonRow style={{ marginTop: '2vh' }}>
                                    <IonCol>
                                        <IonLabel className="formInputTitle">Amount To Transfer</IonLabel>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol style={{ textAlign: 'center' }}>
                                        <IonLabel style={{ fontSize: '1.8em', color: '#0033CC', fontWeight: 'bold' }}>{transfer.amount}</IonLabel>
                                        <IonLabel style={{ color: '#0033CC', fontWeight: 'bold' }}>JWS</IonLabel>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol style={{ textAlign: 'center' }}>
                                        <IonLabel className="formInputTitle">Transfer To</IonLabel>
                                        <IonLabel>{transfer.contact.firstName + ' ' + transfer.contact.lastName}</IonLabel>
                                        <IonLabel>{transfer.contact.email}</IonLabel>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol style={{ textAlign: 'center' }}>
                                        <IonLabel className="formInputTitle">Reason</IonLabel>
                                        <IonLabel>{transfer.reason}</IonLabel>

                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol style={{ textAlign: 'center' }}>
                                        <IonLabel className="formInputTitle">Description</IonLabel>
                                        <IonLabel>{transfer.description}</IonLabel>

                                    </IonCol>
                                </IonRow>

                            </IonGrid>
                        </IonItem>

                    </div>
                    <IonGrid style={{ bottom: '20px', position: 'absolute', width: '100%' }}>
                        <IonRow>
                            <IonCol size="12" style={{ paddingBottom: '0px' }}>
                                <IonButton onClick={e => { e.preventDefault(); this.handleSendBtn(); }} color="primary" expand="block" >SEND</IonButton>
                                <IonButton onClick={e => { e.preventDefault(); this.handleBackBtn() }} color="dark" expand="block" >Cancel </IonButton>

                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonContent>
            </IonPage>
        )
    }
}

function mapStateToProps({ auth, transfer }) {
    return {
        token: auth.token,
        transfer
    }
}

export default connect(mapStateToProps)(withIonLifeCycle(ConfirmTx))