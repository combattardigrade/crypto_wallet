import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import {
    IonList, IonInput, IonTextarea, IonSelectOption, IonItemDivider, IonPage, IonTitle, IonToolbar, IonIcon, IonButton,
    IonItem, IonLabel, IonHeader, IonMenuButton, IonButtons, IonContent, IonBadge, IonGrid, IonRow, IonCol, IonAlert, withIonLifeCycle, IonNav
} from '@ionic/react';
import {
    chevronBackOutline, personCircleOutline, ellipsisVerticalOutline
} from 'ionicons/icons'

// API
import { withdrawTokens } from '../utils/api'

class Withdraw extends Component {
    state = {
        address: '',
        amount: '',
        showAlert: false,
        alertTitle: '',
        alertMsg: '',
    }

    ionViewWillEnter() {

    }

    handleBackBtn = () => {
        this.props.history.goBack()
    }

    showAlert = (msg, title) => {
        this.setState({ showAlert: true, alertMsg: msg, alertTitle: title })
    }

    handleAddressChange = (e) => {
        const address = e.detail.value
        this.setState({ address })
    }

    handleAmountChange = (e) => {
        const amount = e.detail.value
        this.setState({ amount })
    }

    handleWithdrawBtn = (e) => {
        e.preventDefault()
        const { address, amount } = this.state
        const { token, dispatch } = this.props

        if (!address || !amount) {
            this.showAlert('Enter all the required fields', 'Error')
            return
        }

        if(isNaN(amount) || amount < 0) {
            this.showAlert('Enter a valid amount', 'Error')
            return
        }

        withdrawTokens({toAddress: address, amount, token })
            .then(data => data.json())
            .then((res) => {
                console.log(res)
                if(res.status === 'OK') {
                    this.props.history.push('/txStatus/OK')
                    return
                } else {
                    this.showAlert(res.message, 'Error')
                    return
                }
            })
                .catch((err) => {
                    this.showAlert(err.message, 'Error')
                    return
                })
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
                        <IonTitle>Withdraw</IonTitle>

                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonList>
                        <IonItem lines="full">
                            <IonLabel className="formInputTitle" position="stacked">ETH Address:</IonLabel>
                            <IonInput value={this.state.address} onIonChange={this.handleAddressChange} className="formInput" placeholder="External Ethereum Address" ></IonInput>
                        </IonItem>
                        <IonItem lines="full">
                            <IonLabel className="formInputTitle" position="stacked">Amount</IonLabel>
                            <IonInput value={this.state.amount} onIonChange={this.handleAmountChange} className="formInput" placeholder="Enter the amount to transfer"></IonInput>
                        </IonItem>

                    </IonList>

                    <IonGrid style={{ bottom: '20px', position: 'absolute', width: '100%' }}>
                        <IonRow>
                            <IonCol size="12" style={{ paddingBottom: '0px' }}>
                                <ion-button onClick={this.handleWithdrawBtn} color="primary" expand="block" >Withdraw</ion-button>
                                <ion-button color="dark" onClick={e => { e.preventDefault(); this.handleBackBtn(); }} expand="block" type="submit" >Cancel</ion-button>
                            </IonCol>
                        </IonRow>
                    </IonGrid>

                    <IonAlert
                        isOpen={this.state.showAlert}
                        header={this.state.alertTitle}
                        message={this.state.alertMsg}
                        buttons={[{
                            text: 'OK',
                            handler: () => {
                                this.setState({ showAlert: false })
                            }
                        }]}
                    />

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