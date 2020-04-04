import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import {
    IonList, IonInput, IonSelect, IonSelectOption, IonItemDivider, IonPage, IonTitle, IonToolbar, IonIcon, IonButton,
    IonItem, IonLabel, IonTabs, IonTabBar, IonTabButton, IonTab, IonBadge, IonGrid, IonRow, IonCol, IonAlert, withIonLifeCycle, IonNav
} from '@ionic/react';
import {
    personCircleOutline, ellipsisVerticalOutline
} from 'ionicons/icons'


class Inbox extends Component {
    state = {

    }

    ionViewWillEnter() {
        console.log('test')
    }

    render() {
        return (
            <Fragment>               

                <IonList>
                    <IonItemDivider>
                        <IonLabel>
                            Transactions Pending Approval
                    </IonLabel>
                    </IonItemDivider>
                    <IonItem button detail>
                        <IonGrid>
                            <IonRow>
                                <IonCol size="2">
                                    <IonIcon style={{ fontSize: '48px' }} color="primary" icon={personCircleOutline}></IonIcon>
                                </IonCol>
                                <IonCol size="6">
                                    <IonLabel className="txUsername">John Smith</IonLabel>
                                    <IonLabel className="txReason">Job Completed</IonLabel>
                                </IonCol>
                                <IonCol size="4" style={{textAlign:'right'}}>
                                <IonLabel className="txAmount">+1,350 JW</IonLabel>
                                <IonLabel className="txDate">23/03/2020</IonLabel>
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

export default connect(mapStateToProps)(withIonLifeCycle(Inbox))