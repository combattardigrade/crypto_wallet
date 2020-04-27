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
import { approvePaymentRequest, rejectPaymentRequest, getInbox } from '../utils/api'

// Actions
import { saveInbox } from '../actions/inbox'

// Locales
import en from '../locales/en'
import fr from '../locales/fr'
import nl from '../locales/nl'
import es from '../locales/es'
import pt from '../locales/pt'
import ja from '../locales/ja'
import zh from '../locales/zh'
const LOCALES = { en, fr, nl, es, pt, ja, zh }

const moment = require('moment')

class PaymentRequest extends Component {
    state = {
        showAlert: false,
        alertTitle: '',
        alertMsg: '',
    }

    handleConfirmBtn = (e) => {
        e.preventDefault()
        const { requestId } = this.props.match.params
        const { token, dispatch } = this.props
        approvePaymentRequest({ requestId, token })
            .then(data => data.json())
            .then((res) => {
                if (res.status === 'OK') {
                    getInbox({ token })
                        .then(data => data.json())
                        .then((res2) => {
                            if (res2.status === 'OK') {
                                console.log(res2.payload)
                                dispatch(saveInbox(res2.payload))
                                this.handleBackBtn()
                            }
                        })
                } else {
                    this.showAlert(res.message, 'Error')
                    return
                }
            })
    }

    handleRejectBtn = (e) => {
        e.preventDefault()
        const { requestId } = this.props.match.params
        const { token, dispatch } = this.props
        rejectPaymentRequest({ requestId, token })
            .then(data => data.json())
            .then((res) => {
                if (res.status === 'OK') {
                    getInbox({ token })
                        .then(data => data.json())
                        .then((res2) => {
                            if (res2.status === 'OK') {
                                console.log(res2.payload)
                                dispatch(saveInbox(res2.payload))
                                this.handleBackBtn()
                            }
                        })
                } else {
                    this.showAlert(res.message, 'Error')
                    return
                }
            })
    }

    showAlert = (msg, title) => {
        this.setState({ showAlert: true, alertMsg: msg, alertTitle: title })
    }

    handleBackBtn = () => {
        this.props.history.goBack()
    }

    render() {
        const { requestId } = this.props.match.params
        const { inbox, lan } = this.props
        const paymentRequest = (Object.values(inbox).filter(r => r.id !== requestId))[0]

        if (!paymentRequest || !requestId) {
            return <IonLabel>Loading...</IonLabel>
        }

        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar color="primary" className="jiwardsToolbar">
                        <IonButtons slot="start">
                            <IonButton onClick={e => {e.preventDefault(); this.handleBackBtn(); }}><IonIcon icon={chevronBackOutline}></IonIcon></IonButton>
                            <IonMenuButton />
                        </IonButtons>
                        <IonTitle>{LOCALES[lan]['payment_request']['payment_request_title']}</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent >
                    <IonList>
                        <IonItem>
                            <IonLabel className="formInputTitle" position="stacked">{LOCALES[lan]['payment_request']['request_id']}</IonLabel>
                            <IonInput className="formInput" readonly value={requestId}></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel className="formInputTitle" position="stacked">{LOCALES[lan]['payment_request']['from']}</IonLabel>
                            <IonInput className="formInput" readonly value={paymentRequest.user.firstName + ' ' + paymentRequest.user.lastName}></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel className="formInputTitle" position="stacked">{LOCALES[lan]['payment_request']['amount']}</IonLabel>
                            <IonInput className="formInput" readonly value={parseFloat(paymentRequest.amount)}></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel className="formInputTitle" position="stacked">{LOCALES[lan]['payment_request']['reason']}</IonLabel>
                            <IonInput className="formInput" readonly value={paymentRequest.reason}></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel className="formInputTitle" position="stacked">{LOCALES[lan]['payment_request']['description']}</IonLabel>
                            <IonTextarea className="formInput" readonly value={paymentRequest.description}></IonTextarea >
                        </IonItem>
                        <IonItem>
                            <IonLabel className="formInputTitle" position="stacked">{LOCALES[lan]['payment_request']['date']}</IonLabel>
                            <IonInput readonly value={moment(paymentRequest.createdAt).format('DD/MM/YYYY')}></IonInput>
                        </IonItem>
                    </IonList>
                    <IonGrid style={{  width: '100%' }}>
                        <IonRow>
                            <IonCol size="12" style={{ paddingBottom: '0px' }}>
                                <IonButton onClick={this.handleConfirmBtn} color="primary" expand="block">{LOCALES[lan]['payment_request']['confirm_btn']}</IonButton>
                                <IonButton onClick={this.handleRejectBtn} color="dark" expand="block">{LOCALES[lan]['payment_request']['reject_btn']}</IonButton>
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

function mapStateToProps({ auth, inbox, device }) {
    return {
        token: auth.token,
        inbox,
        lan: device ? device.language : 'en'
    }
}

export default connect(mapStateToProps)(withIonLifeCycle(PaymentRequest))