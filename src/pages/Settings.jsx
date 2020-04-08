import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import {
    IonList, IonInput, IonTextarea, IonSelectOption, IonItemDivider, IonPage, IonTitle, IonToolbar, IonIcon, IonButton,
    IonItem, IonLabel, IonHeader, IonMenuButton, IonButtons, IonContent, IonBadge, IonGrid, IonRow, IonCol, IonAlert, withIonLifeCycle, IonNav
} from '@ionic/react';
import {
    chevronBackOutline, personCircleOutline, ellipsisVerticalOutline
} from 'ionicons/icons'

// Plugins
import { Plugins } from '@capacitor/core'
const { Device } = Plugins


class Settings extends Component {
    state = {
        info: '',
    }

    async ionViewWillEnter() {
        const info = await Device.getInfo()
        console.log(info)
        this.setState({info})
    }

    handleBackBtn = () => {
        this.props.history.goBack()
    }

    render() {

        const { user } = this.props
        const { info } = this.state

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
                                        <IonLabel className="formInput" >{user.firstName + ' ' + user.lastName}</IonLabel>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonItem>
                        <IonItem lines="full" button detail>
                            <IonGrid style={{ paddingLeft: '0px' }}>
                                <IonRow>
                                    <IonCol style={{ paddingLeft: '0px' }}>
                                        <IonLabel className="formInputTitle" >Username</IonLabel>
                                        <IonLabel >{user.username}</IonLabel>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonItem>
                        <IonItem lines="full" button detail>
                            <IonGrid style={{ paddingLeft: '0px' }}>
                                <IonRow>
                                    <IonCol style={{ paddingLeft: '0px' }}>
                                        <IonLabel className="formInputTitle" >Email</IonLabel>
                                        <IonLabel >{user.email}</IonLabel>
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
        <IonLabel className="formInputTitle" >{info.platform === 'ios' ? 'iOS' : 'Android'} v{info.appVersion ? info.appVersion : '1.0.0'}</IonLabel>
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

function mapStateToProps({ auth, user }) {
    return {
        token: auth.token,
        user,
    }
}

export default connect(mapStateToProps)(withIonLifeCycle(Settings))