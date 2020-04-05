import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import {
    IonList, IonInput, IonSelect, IonSelectOption, IonItemDivider, IonPage, IonTitle, IonToolbar, IonIcon, IonButton,
    IonItem, IonLabel, IonTabs, IonTabBar, IonTabButton, IonTab, IonBadge, IonGrid, IonRow, IonCol, IonAlert, withIonLifeCycle, IonNav
} from '@ionic/react';
import {
    personCircleOutline, ellipsisVerticalOutline
} from 'ionicons/icons'


class Send extends Component {
    
    state = {
        reason: ''
    }

    render() {
        return (
            <Fragment>
                <IonList>
                    <IonItem>
                        <IonLabel position="stacked">Send To</IonLabel>
                        <IonInput placeholder="Username, Email or Ethereum Address"></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Amount</IonLabel>
                        <IonInput placeholder="Enter the amount to transfer"></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Reason</IonLabel>
                        <IonSelect value={this.state.reason} placeholder="Select reason" onIonChange={e => this.handleReasonChange(e.detail.value)}>
                            <IonSelectOption value="brown">Brown</IonSelectOption>
                            <IonSelectOption value="blonde">Blonde</IonSelectOption>
                            <IonSelectOption value="black">Black</IonSelectOption>
                            <IonSelectOption value="red">Red</IonSelectOption>
                        </IonSelect>
                    </IonItem>

                    <IonItem>
                        <IonLabel position="stacked">Description</IonLabel>
                        <IonInput placeholder="Enter a description"></IonInput>
                    </IonItem>

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
            </Fragment>

        )
    }
}

function mapStateToProps({ auth }) {
    return {
        token: auth.token,

    }
}

export default connect(mapStateToProps)(withIonLifeCycle(Send))