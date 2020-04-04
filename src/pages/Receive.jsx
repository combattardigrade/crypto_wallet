import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import {
    IonList, IonInput, IonTextarea, IonSelectOption, IonItemDivider, IonPage, IonTitle, IonToolbar, IonIcon, IonButton,
    IonItem, IonLabel, IonHeader, IonMenuButton, IonButtons, IonContent, IonBadge, IonGrid, IonRow, IonCol, IonAlert, withIonLifeCycle, IonNav
} from '@ionic/react';
import {
    chevronBackOutline, copyOutline, ellipsisVerticalOutline
} from 'ionicons/icons'

var QRCode = require('qrcode.react');


class Receive extends Component {
    state = {

    }

    ionViewWillEnter() {
        console.log('test')
    }

    render() {
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar color="primary" className="jiwardsToolbar">
                        <IonButtons slot="start">
                            <IonButton ><IonIcon icon={chevronBackOutline}></IonIcon></IonButton>
                            <IonMenuButton />
                        </IonButtons>
                        <IonTitle>Receive Payment</IonTitle>
                        <IonButtons slot="end">
                            <IonButton ><IonIcon icon={ellipsisVerticalOutline}></IonIcon></IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonItem style={{ marginTop: '60px' }} lines="none">
                        <IonGrid>
                            <IonRow>
                                <IonCol style={{ textAlign: 'center' }}>
                                    <QRCode style={{ width: '200px', height: '200px' }} value="http://facebook.github.io/react/" />
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonItem>
                    <IonItem lines="inset">
                        <IonGrid>
                            <IonRow>
                                <IonCol size="9">
                                    <IonInput type="number" style={{color:'#494ef7', fontSize:'1.5em'}}></IonInput>
                                </IonCol>
                                <IonCol size="3" style={{textAlign:'center',paddingTop:'20px',color:'#494ef7'}}>
                                    <IonLabel>COINS</IonLabel>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonItem>
                    <IonItem lines="none">
                        <IonGrid>
                            <IonRow>
                                <IonCol size="9">
                                    <IonLabel style={{fontSize:'10px', color: 'grey'}}>0x5eD8Cee6b63b1c6AFce3AD7c92f4fD7E1B8fAd9F</IonLabel>
                                    <IonLabel style={{fontSize:'12px', color: 'grey'}}>Your Ethereum Address</IonLabel>
                                </IonCol>
                                <IonCol size="3" style={{textAlign:'center',marginTop:'-5px'}}>
                                    <IonButton >
                                        <IonIcon style={{color:'white'}}  icon={copyOutline}></IonIcon>
                                    </IonButton>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonItem>
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

export default connect(mapStateToProps)(withIonLifeCycle(Receive))