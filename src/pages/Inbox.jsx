import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {
    IonList, IonInput, IonSelect, IonSelectOption, IonItemDivider, IonPage, IonTitle, IonToolbar, IonIcon, IonButton,
    IonItem, IonLabel, IonTabs, IonTabBar, IonTabButton, IonTab, IonBadge, IonGrid, IonRow, IonCol, IonAlert, withIonLifeCycle, IonNav
} from '@ionic/react';
import {
    personCircleOutline, ellipsisVerticalOutline
} from 'ionicons/icons'

// Locales
import en from '../locales/en'
import fr from '../locales/fr'
import nl from '../locales/nl'
const LOCALES = { en, fr, nl }

const moment = require('moment')

class Inbox extends Component {
    state = {

    }

    handlePaymentRequestClick = (requestId) => {
        // console.log(requestId)
        this.props.history.push('/paymentRequest/' + requestId)
    }

    render() {

        const { inbox, lan } = this.props

        return (
            <Fragment>

                <IonList>
                    <IonItemDivider>
                        <IonLabel>
                            {LOCALES[lan]['inbox']['transactions_pending_approval']}
                        </IonLabel>
                    </IonItemDivider>
                    {
                        inbox && Object.values(inbox).length > 0
                            ?
                            Object.values(inbox).map((t, i) => (
                                <IonItem onClick={e => { e.preventDefault(); this.handlePaymentRequestClick(t.id) }} key={i} button detail>
                                    <IonGrid>
                                        <IonRow>
                                            <IonCol size="2">
                                                <IonIcon style={{ fontSize: '48px' }} color="primary" icon={personCircleOutline}></IonIcon>
                                            </IonCol>
                                            <IonCol size="6">
                                                <IonLabel className="txUsername">{t.user.firstName + ' ' + t.user.lastName}</IonLabel>
                                                <IonLabel className="txReason">{t.reason}</IonLabel>
                                            </IonCol>
                                            <IonCol size="4" style={{ textAlign: 'right' }}>
                                                <IonLabel className="txAmount">{parseFloat(t.amount).toFixed(2)} JWS</IonLabel>
                                                <IonLabel className="txDate">{moment(t.createdAt).format('DD/MM/YYYY')}</IonLabel>
                                            </IonCol>
                                        </IonRow>
                                    </IonGrid>
                                </IonItem>
                            ))
                            :
                            <IonItem lines="none">
                                <IonLabel>{LOCALES[lan]['inbox']['no_payments']}</IonLabel>
                            </IonItem>
                    }
                </IonList>
            </Fragment>

        )
    }
}

function mapStateToProps({ auth, inbox, device }) {
    return {
        token: auth.token,
        inbox,
        lan: device && device.language
    }
}

export default withRouter(connect(mapStateToProps)(withIonLifeCycle(Inbox)))