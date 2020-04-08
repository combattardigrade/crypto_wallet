import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import {
    IonList, IonInput, IonTextarea, IonSelectOption, IonItemDivider, IonPage, IonTitle, IonToolbar, IonIcon, IonButton,
    IonItem, IonLabel, IonHeader, IonMenuButton, IonButtons, IonContent, IonBadge, IonGrid, IonRow, IonCol, IonAlert, withIonLifeCycle, IonNav
} from '@ionic/react';
import {
    chevronBackOutline, personCircleOutline, ellipsisVerticalOutline
} from 'ionicons/icons'


class Settings extends Component {
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
                        <IonTitle>Settings</IonTitle>
                        
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonList>
                        <IonItem lines="full" button detail>
                            <IonGrid style={{ paddingLeft: '0px' }}>
                                <IonRow>
                                    <IonCol style={{ paddingLeft: '0px' }}>
                                        <IonLabel className="formInputTitle" >Name</IonLabel>
                                        <IonLabel className="formInput" >John Smith</IonLabel>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonItem>
                        <IonItem lines="full" button detail>
                            <IonGrid style={{ paddingLeft: '0px' }}>
                                <IonRow>
                                    <IonCol style={{ paddingLeft: '0px' }}>
                                        <IonLabel className="formInputTitle" >Username</IonLabel>
                                        <IonLabel >john123</IonLabel>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonItem>
                        <IonItem lines="full" button detail>
                            <IonGrid style={{ paddingLeft: '0px' }}>
                                <IonRow>
                                    <IonCol style={{ paddingLeft: '0px' }}>
                                        <IonLabel className="formInputTitle" >Email</IonLabel>
                                        <IonLabel >john@email.com</IonLabel>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonItem>
                        <IonItem lines="full" button detail>
                            <IonGrid style={{ paddingLeft: '0px' }}>
                                <IonRow>
                                    <IonCol style={{ paddingLeft: '0px' }}>
                                        <IonLabel className="formInputTitle" >Change Profile Picture</IonLabel>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonItem>
                        <IonItem lines="full" button detail>
                            <IonGrid style={{ paddingLeft: '0px' }}>
                                <IonRow>
                                    <IonCol style={{ paddingLeft: '0px' }}>
                                        <IonLabel className="formInputTitle" >Change Mobile PIN</IonLabel>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonItem>
                        <IonItem lines="full" button detail>
                            <IonGrid style={{ paddingLeft: '0px' }}>
                                <IonRow>
                                    <IonCol style={{ paddingLeft: '0px' }}>
                                        <IonLabel className="formInputTitle" >Android v1.0.0</IonLabel>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
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

export default connect(mapStateToProps)(withIonLifeCycle(Settings))