import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import {
    IonList, IonInput, IonTextarea, IonSelectOption, IonItemDivider, IonPage, IonTitle, IonToolbar, IonIcon, IonButton,
    IonItem, IonLabel, IonHeader, IonMenuButton, IonButtons, IonContent, IonBadge, IonGrid, IonRow, IonCol, IonAlert, withIonLifeCycle, IonNav
} from '@ionic/react';
import {
    chevronBackOutline, personCircleOutline, ellipsisVerticalOutline
} from 'ionicons/icons'


class TxDetails extends Component {
    state = {

    }

    ionViewWillEnter() {

    }

    handleBackBtn = () => {
        this.props.history.goBack()
    }

    render() {
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar color="primary" className="jiwardsToolbar">
                        <IonButtons slot="start">
                            <IonButton onClick={e => { e.preventDefault(); this.handleBackBtn(); }}><IonIcon icon={chevronBackOutline}></IonIcon></IonButton>
                            <IonMenuButton />
                        </IonButtons>
                        <IonTitle>Transaction Details</IonTitle>

                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonList>
                        <IonItem>
                            <IonLabel className="formInputTitle" position="stacked">Transaction ID</IonLabel>
                            <IonInput className="formInput" readonly value="123"></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel className="formInputTitle" position="stacked">From</IonLabel>
                            <IonInput className="formInput" readonly value="John Smith"></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel className="formInputTitle" position="stacked">To</IonLabel>
                            <IonInput className="formInput" readonly value="Emma Smith"></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel className="formInputTitle" position="stacked">Reason</IonLabel>
                            <IonInput className="formInput" readonly value="Task Completed"></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel className="formInputTitle" position="stacked">Amount</IonLabel>
                            <IonInput className="formInput" readonly value="500"></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel className="formInputTitle" position="stacked">Reason</IonLabel>
                            <IonTextarea className="formInput" readonly value="Task Completed"></IonTextarea >
                        </IonItem>
                        <IonItem>
                            <IonLabel className="formInputTitle" position="stacked">Date</IonLabel>
                            <IonInput readonly value="26/03/2020"></IonInput>
                        </IonItem>
                    </IonList>


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

export default connect(mapStateToProps)(withIonLifeCycle(TxDetails))