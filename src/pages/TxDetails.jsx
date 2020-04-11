import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import {
    IonList, IonInput, IonTextarea, IonSelectOption, IonItemDivider, IonPage, IonTitle, IonToolbar, IonIcon, IonButton,
    IonItem, IonLabel, IonHeader, IonMenuButton, IonButtons, IonContent, IonBadge, IonGrid, IonRow, IonCol, IonAlert, withIonLifeCycle, IonNav
} from '@ionic/react';
import {
    chevronBackOutline, personCircleOutline, ellipsisVerticalOutline
} from 'ionicons/icons'

const moment = require('moment')

class TxDetails extends Component {
    state = {

    }

    ionViewWillEnter() {

    }

    handleBackBtn = () => {
        this.props.history.goBack()
    }

    render() {

        const { transactions } = this.props
        const { id } = this.props.match.params
        
        const tx = (Object.values(transactions).filter(tx => tx.id == id))[0]
        
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
                            <IonInput className="formInput" readonly value={tx.id}></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel className="formInputTitle" position="stacked">From</IonLabel>
                            <IonInput className="formInput" readonly value={tx.from.firstName + ' ' + tx.from.lastName}></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel className="formInputTitle" position="stacked">To</IonLabel>
                            <IonInput className="formInput" readonly value={tx.to.firstName + ' ' + tx.to.lastName}></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel className="formInputTitle" position="stacked">Reason</IonLabel>
                            <IonInput className="formInput" readonly value={tx.reason}></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel className="formInputTitle" position="stacked">Amount</IonLabel>
                            <IonInput className="formInput" readonly value={tx.amount}></IonInput>
                        </IonItem>
                        
                        <IonItem>
                            <IonLabel className="formInputTitle" position="stacked">Date</IonLabel>
                            <IonInput readonly value={moment(tx.createdAt).format("DD/MM/YYYY HH:mm:ss")}></IonInput>
                        </IonItem>
                    </IonList>


                </IonContent>
            </IonPage>

        )
    }
}

function mapStateToProps({ auth, transactions }) {
    return {
        token: auth.token,
        transactions,
    }
}

export default connect(mapStateToProps)(withIonLifeCycle(TxDetails))