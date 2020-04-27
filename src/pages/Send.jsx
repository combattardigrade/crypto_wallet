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

// Locales
import en from '../locales/en'
import fr from '../locales/fr'
import nl from '../locales/nl'
const LOCALES = { en, fr, nl }

class Send extends Component {

    state = {
        showAlert: false,
        alertTitle: '',
        alertMsg: '',
        contact: '',
        amount: '',
        reason: '',
        description: '',
        selectedContact: ''
    }

    handleContactChange = (e) => {
        e.preventDefault()
        const contact = e.detail.value
        this.setState({ contact })
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
        const { contact, amount, reason, description } = this.state
        const { user, contacts, history, dispatch } = this.props

        if (!contact || !amount || !reason || !description) {
            this.showAlert('Enter all the required fields', 'Error')
            return
        }

        if (parseFloat(user.balances[0].amount) < amount) {
            this.showAlert('You do not have enough balance', 'Error')
            return
        }

        if (isNaN(amount) || amount < 0) {
            this.showAlert('Enter a valid amount', 'Error')
            return
        }

        let contactDetails = Object.values(contacts).filter(c => c.contactId == contact)

        const transfer = { contact: contactDetails[0], amount, reason, description }
        dispatch(saveTransfer(transfer))
        history.push('/confirmTx')
    }

    showAlert = (msg, title) => {
        this.setState({ showAlert: true, alertMsg: msg, alertTitle: title })
    }

    ionViewWillEnter = () => {
        const { location } = this.props
        const { handleChangeTab } = this.props

        if ('state' in location && typeof location.state !== 'undefined') {
            if ('txCompleted' in location.state && location.state.txCompleted) {
                console.log('tx completed')
                this.setState({
                    contact: '',
                    amount: '',
                    reason: '',
                    description: '',
                    selectedContact: ''
                })
                handleChangeTab('tab-wallet');
            }
        }
    }

    render() {

        const { txReasons, contacts, lan } = this.props

        return (
            <Fragment>
                <IonList>
                    <IonItem>
                        <IonLabel position="stacked">{LOCALES[lan]['send']['send_to']}</IonLabel>
                        {/* <IonInput name="to" value={this.state.to} onIonChange={this.handleToChange} type="text" placeholder="Username or Email"></IonInput> */}
                        <IonSelect value={this.state.contact} name="contact" placeholder={LOCALES[lan]['send']['input_send']} onIonChange={this.handleContactChange}>
                            {
                                contacts && Object.values(contacts).length > 0
                                    ?
                                    Object.values(contacts).map((contact, index) => (
                                        <IonSelectOption key={index} value={contact.contactId}>{contact.firstName + ' ' + contact.lastName}</IonSelectOption>
                                    ))
                                    :
                                    null
                            }
                        </IonSelect>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">{LOCALES[lan]['send']['amount']}</IonLabel>
                        <IonInput name="amount" value={this.state.amount} onIonChange={this.handleAmountChange} type="number" placeholder={LOCALES[lan]['send']['input_amount']}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">{LOCALES[lan]['send']['reason']}</IonLabel>
                        <IonSelect name="reason" value={this.state.reason} placeholder={LOCALES[lan]['send']['input_reason']} onIonChange={this.handleReasonChange}>

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
                        <IonLabel position="stacked">{LOCALES[lan]['send']['description']}</IonLabel>
                        <IonInput name="description" value={this.state.description} onIonChange={this.handleDescriptionChange} type="text" placeholder={LOCALES[lan]['send']['input_description']}></IonInput>
                    </IonItem>

                    <IonGrid style={{ width: '100%', marginTop: '10px' }}>
                        <IonRow>
                            <IonCol size="12" style={{ paddingBottom: '0px' }}>
                                <ion-button onClick={this.handleVerifyBtn} color="primary" expand="block" type="submit" >{LOCALES[lan]['send']['verify_transfer']}</ion-button>
                            </IonCol>
                        </IonRow>
                    </IonGrid>

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

function mapStateToProps({ auth, user, txReasons, contacts, device }) {
    return {
        token: auth.token,
        txReasons,
        user,
        contacts,
        lan: device && device.language
    }
}

export default withRouter(connect(mapStateToProps)(withIonLifeCycle(Send)))