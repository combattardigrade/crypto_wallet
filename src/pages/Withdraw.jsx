import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import {
    IonList, IonInput, IonTextarea, IonSelectOption, IonItemDivider, IonPage, IonTitle, IonToolbar, IonIcon, IonButton,
    IonItem, IonLabel, IonHeader, IonMenuButton, IonButtons, IonContent, IonBadge, IonGrid, IonRow, IonCol, IonAlert, withIonLifeCycle, IonNav
} from '@ionic/react';
import {
    chevronBackOutline, personCircleOutline, ellipsisVerticalOutline
} from 'ionicons/icons'


class Withdraw extends Component {
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
                        <IonTitle>Withdraw</IonTitle>
                        <IonButtons slot="end">
                            <IonButton ><IonIcon icon={ellipsisVerticalOutline}></IonIcon></IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonList>
                        <IonItem>
                            <IonLabel className="formInputTitle" position="stacked">ETH Address:</IonLabel>
                            <IonInput className="formInput" placeholder="External Ethereum Address" ></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel className="formInputTitle" position="stacked">Amount</IonLabel>
                            <IonInput className="formInput" placeholder="Enter the amount to transfer"></IonInput>
                        </IonItem>

                    </IonList>
                   
                        <IonGrid style={{ bottom: '20px', position: 'absolute', width: '100%' }}>
                            <IonRow>
                                <IonCol size="12" style={{ paddingBottom: '0px' }}>
                                    <ion-button color="primary" expand="block" type="submit" >Withdraw</ion-button>
                                    <ion-button color="dark" expand="block" type="submit" >Cancel</ion-button>
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

export default connect(mapStateToProps)(withIonLifeCycle(Withdraw))