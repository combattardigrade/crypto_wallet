import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
    IonPage, IonIcon, IonGrid, IonRow, IonCol, withIonLifeCycle,
    IonItem, IonLabel, IonContent,
} from '@ionic/react';

import {
    returnDownBackOutline,
} from 'ionicons/icons'

// Locales
import en from '../locales/en'
import fr from '../locales/fr'
import nl from '../locales/nl'
const LOCALES = { en, fr, nl }

const successIcon = require('../components/success_icon.png')
const errorIcon = require('../components/error_icon.png')

class TxStatus extends Component {

    render() {

        const { status } = this.props.match.params
        const { lan } = this.props

        return (
            <IonPage>

                <IonContent className="dark2">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%', flexDirection: 'column', marginTop: '-5vh' }}>
                        <IonItem style={{ marginTop: '60px' }} lines="none">
                            <IonGrid>
                                <IonRow>
                                    <IonCol style={{ textAlign: 'center' }}>
                                        <img src={status == 'OK' ? successIcon : errorIcon} />
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonItem>
                        <IonItem lines="none">
                            <IonGrid>
                                <IonRow>
                                    <IonCol size="12" style={{ textAlign: 'center' }}>
                                        <IonLabel style={{ color: 'white', fontWeight: 'bold' }}>{status == 'OK' ? LOCALES[lan]['tx_status']['tx_completed'] : LOCALES[lan]['tx_status']['tx']}</IonLabel>
                                        <IonLabel style={{ color: 'white', fontWeight: 'bold' }}>{status == 'OK' ? LOCALES[lan]['tx_status']['successfully'] : LOCALES[lan]['tx_status']['rejected']}</IonLabel>
                                        <IonLabel style={{ color: '#d2d2d2', marginTop: '10px', fontSize: '12px', }}>{LOCALES[lan]['tx_status']['your_transfer']}</IonLabel>
                                        <IonLabel style={{ color: '#d2d2d2', fontSize: '12px' }}>  {status == 'OK' ? LOCALES[lan]['tx_status']['completed_successfully'] : LOCALES[lan]['tx_status']['has_been_rejected'] }</IonLabel>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonItem>
                    </div>
                    <IonGrid style={{ bottom: '20px', position: 'absolute', width: '100%' }}>
                        <IonRow>
                            <IonCol size="12" style={{ paddingBottom: '0px' }}>
                                <ion-button color="primary" expand="block" onClick={e => { e.preventDefault(); this.props.history.replace({ pathname: '/main', state: { txCompleted: true } }); }} >
                                    <IonIcon icon={returnDownBackOutline} style={{ marginRight: '5px' }}></IonIcon> {LOCALES[lan]['tx_status']['return_btn']}
                                </ion-button>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonContent>
            </IonPage>
        )
    }
}

function mapStateToProps({ user, device }) {
    return {
        user,
        lan: device ? device.language : 'en'
    }
}

export default connect(mapStateToProps)(withIonLifeCycle(TxStatus))