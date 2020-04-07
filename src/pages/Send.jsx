import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
    IonList, IonInput, IonSelect, IonSelectOption, IonItemDivider, IonPage, IonTitle, IonToolbar, IonIcon, IonButton,
    IonItem, IonLabel, IonTabs, IonTabBar, IonTabButton, IonTab, IonBadge, IonGrid, IonRow, IonCol, IonAlert, withIonLifeCycle, IonNav
} from '@ionic/react';
import {
    personCircleOutline, ellipsisVerticalOutline
} from 'ionicons/icons'

// Actions
import { saveTransfer } from '../actions/transfer';


class Send extends Component {

    state = {
        showAlert: false,
        alertTitle: '',
        alertMsg: '',
        to: '',
        amount: '',
        reason: '',
        descripion: '',
    }

    handleToChange = (e) => {
        e.preventDefault()
        const to = e.detail.value
        this.setState({ to })
    }

    handleAmountChange = (e) => {
        e.preventDefault()
        const amount = e.detail.value
        this.setState({ amount })
    }

    handleReasonChange = (e) => {
        e.preventDefault()
        const reason = e.detail.value
        this.setState({ reason: reason })
    }

    handleDescriptionChange = (e) => {
        e.preventDefault()
        const description = e.detail.value
        this.setState({ description })
    }

    handleVerifyBtn = (e) => {
        e.preventDefault()
        const { to, amount, reason, description } = this.state
        const { user, history, dispatch } = this.props

        if (!to || !amount || !reason || !description) {
            this.showAlert('Enter all the required fields', 'Error')
            return
        }
        
        if(parseFloat(user.balances[0].amount) < amount) {
            this.showAlert('You do not have enough balance', 'Error')
            return
        }
        
        const transfer = { to, amount, reason, description }
        dispatch(saveTransfer(transfer))
        history.push('/confirmTx')
    }

    showAlert = (msg, title) => {
        this.setState({ showAlert: true, alertMsg: msg, alertTitle: title })
    }

    render() {

        const { txReasons } = this.props

        return (
            <Fragment>
                <IonList>
                    <IonItem>
                        <IonLabel position="stacked">Send To</IonLabel>
                        <IonInput name="to" value={this.state.to} onIonChange={this.handleToChange} type="text" placeholder="Username or Email"></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Amount</IonLabel>
                        <IonInput name="amount" value={this.state.amount} onIonChange={this.handleAmountChange} type="number" placeholder="Enter the amount to transfer"></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Reason</IonLabel>
                        <IonSelect name="reason" value={this.state.reason} placeholder="Select reason" onIonChange={this.handleReasonChange}>

                            {
                                txReasons && Object.values(txReasons).length > 0
                                    ?
                                    Object.values(txReasons).map((reason, index) => (
                                        <IonSelectOption key={index} value={reason.reason}>{reason.reason}</IonSelectOption>
                                    ))
                                    :
                                    null
                            }
                        </IonSelect>
                    </IonItem>

                    <IonItem>
                        <IonLabel position="stacked">Description</IonLabel>
                        <IonInput name="description" value={this.state.description} onIonChange={this.handleDescriptionChange} type="text" placeholder="Enter a description"></IonInput>
                    </IonItem>

                    <IonGrid style={{ width: '100%', marginTop: '10px' }}>
                        <IonRow>
                            <IonCol size="12" style={{ paddingBottom: '0px' }}>
                                <ion-button onClick={this.handleVerifyBtn} color="primary" expand="block" type="submit" >Verify Transfer</ion-button>
                            </IonCol>
                        </IonRow>
                    </IonGrid>

                </IonList>

                <IonList>
                    <IonItemDivider>
                        <IonLabel>
                            All Contacts
                    </IonLabel>
                    </IonItemDivider>
                    <IonItem>
                        <IonGrid>
                            <IonRow>
                                <IonCol size="2">
                                    <IonIcon style={{ fontSize: '48px' }} color="primary" icon={personCircleOutline}></IonIcon>
                                </IonCol>
                                <IonCol size="9">
                                    <IonLabel className="txUsername">John Smith</IonLabel>
                                    <IonLabel className="txReason">Job Completed</IonLabel>
                                </IonCol>
                                <IonCol size="1">
                                    <IonIcon className="contactOptions" icon={ellipsisVerticalOutline}></IonIcon>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonItem>
                </IonList>
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
            </Fragment>

        )
    }
}

function mapStateToProps({ auth, user, txReasons }) {
    return {
        token: auth.token,
        txReasons,
        user,
    }
}

export default withRouter(connect(mapStateToProps)(withIonLifeCycle(Send)))