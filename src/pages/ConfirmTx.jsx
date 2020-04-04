import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    IonPage, IonIcon, IonGrid, IonRow, IonCol, withIonLifeCycle, IonHeader, IonToolbar,
    IonItem, IonLabel, IonContent, IonButton, IonButtons, IonTitle, IonMenuButton
} from '@ionic/react';

import {
    returnDownBackOutline, chevronBackOutline, ellipsisVerticalOutline
} from 'ionicons/icons'

const logoIcon = require('../components/logo_icon.png')


class ConfirmTx extends Component {

    render() {

        const { status } = this.props.match.params

        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar color="primary" className="jiwardsToolbar">
                        <IonButtons slot="start">
                            <IonButton ><IonIcon icon={chevronBackOutline}></IonIcon></IonButton>
                            <IonMenuButton />
                        </IonButtons>
                        <IonTitle>Confirm Transfer</IonTitle>

                    </IonToolbar>
                </IonHeader>
                <IonContent >

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'start', height: '100%', width: '100%', flexDirection: 'column', marginTop: '5vh' }}>
                        <IonItem lines="none">
                            <IonGrid>
                                <IonRow style={{ marginTop: '20px' }}>
                                    <IonCol style={{ textAlign: 'center' }}>
                                        <img src={logoIcon} />
                                    </IonCol>
                                </IonRow>
                                <IonRow style={{marginTop:'2vh'}}>
                                    <IonCol>
                                        <IonLabel className="formInputTitle">Amount To Transfer</IonLabel>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol style={{ textAlign: 'center' }}>
                                        <IonLabel style={{ fontSize: '1.8em', color: '#494ef7', fontWeight: 'bold' }}>434.32</IonLabel>
                                        <IonLabel style={{ color: '#494ef7', fontWeight: 'bold' }}>COINS</IonLabel>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol style={{ textAlign: 'center' }}>
                                        <IonLabel className="formInputTitle">Transfer To</IonLabel>
                                        <IonLabel>John Smith</IonLabel>
                                        <IonLabel>test@gmail.com</IonLabel>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol style={{ textAlign: 'center' }}>
                                        <IonLabel className="formInputTitle">Reason</IonLabel>
                                        <IonLabel>Job Completed</IonLabel>

                                    </IonCol>
                                </IonRow>

                            </IonGrid>
                        </IonItem>

                    </div>
                    <IonGrid style={{ bottom: '20px', position: 'absolute', width: '100%' }}>
                        <IonRow>
                            <IonCol size="12" style={{ paddingBottom: '0px' }}>
                                <IonButton color="primary" expand="block" type="submit" >SEND</IonButton>
                                <IonButton color="dark" expand="block" type="submit" >Cancel </IonButton>

                            </IonCol>
                        </IonRow>
                    </IonGrid>
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

export default connect(mapStateToProps)(withIonLifeCycle(ConfirmTx))