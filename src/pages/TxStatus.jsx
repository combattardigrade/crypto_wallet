import React, { Component } from 'react'

import {
    IonPage, IonIcon, IonGrid, IonRow, IonCol, withIonLifeCycle,
    IonItem, IonLabel, IonContent, 
} from '@ionic/react';

import {
    returnDownBackOutline, 
} from 'ionicons/icons'

const successIcon = require('../components/success_icon.png')
const errorIcon = require('../components/error_icon.png')

class TxStatus extends Component {    

    render() {

        const { status } = this.props.match.params

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
                                        <IonLabel style={{ color: 'white', fontWeight:'bold' }}>{status == 'OK' ? 'Transaction Completed' : 'Transaction'}</IonLabel>
                                        <IonLabel style={{ color: 'white', fontWeight:'bold' }}>{status == 'OK' ? 'Successfully' : 'Rejected'}</IonLabel>
                                        <IonLabel style={{color:'#d2d2d2', marginTop: '10px', fontSize:'12px',}}> Your transfer of x coins to</IonLabel>
                                        <IonLabel style={{color:'#d2d2d2', fontSize:'12px'}}>Name  {status == 'OK' ? 'completed successfully' : 'has been rejected'}</IonLabel>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonItem>
                    </div>
                    <IonGrid style={{ bottom: '20px', position: 'absolute', width: '100%' }}>
                        <IonRow>
                            <IonCol size="12" style={{ paddingBottom: '0px' }}>
                                <ion-button color="primary" expand="block" onClick={e => {e.preventDefault(); this.props.history.replace('/main'); }} >
                                    <IonIcon icon={returnDownBackOutline} style={{ marginRight: '5px' }}></IonIcon> Return
                                </ion-button>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonContent>
            </IonPage>
        )
    }
}

export default withIonLifeCycle(TxStatus)