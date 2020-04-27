import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import {
    IonList, IonInput, IonTextarea, IonSelectOption, IonItemDivider, IonPage, IonTitle, IonToolbar, IonIcon, IonButton,
    IonItem, IonLabel, IonHeader, IonMenuButton, IonButtons, IonContent, IonBadge, IonGrid, IonRow, IonCol, IonAlert, withIonLifeCycle, IonNav
} from '@ionic/react';
import {
    chevronBackOutline, personCircleOutline, ellipsisVerticalOutline
} from 'ionicons/icons'

// Locales
import en from '../locales/en'
import fr from '../locales/fr'
import nl from '../locales/nl'

// Plugins
import { Plugins } from '@capacitor/core'
const { Device } = Plugins
const LOCALES = { en, fr, nl }

class Settings extends Component {
    state = {
        info: '',
    }

    async ionViewWillEnter() {
        const info = await Device.getInfo()
        console.log(info)
        this.setState({ info })
    }

    handleBackBtn = () => {
        this.props.history.goBack()
    }

    render() {

        const { user, lan } = this.props
        const { info } = this.state

        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar color="primary" className="jiwardsToolbar">
                        <IonButtons slot="start">
                            <IonButton onClick={e => { e.preventDefault(); this.handleBackBtn(); }}><IonIcon icon={chevronBackOutline}></IonIcon></IonButton>
                            <IonMenuButton />
                        </IonButtons>
                        <IonTitle>{LOCALES[lan]['settings']['settings_title']}</IonTitle>

                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonList>
                        <IonItem lines="full" button detail>
                            <IonGrid style={{ paddingLeft: '0px' }}>
                                <IonRow>
                                    <IonCol style={{ paddingLeft: '0px' }}>
                                        <IonLabel className="formInputTitle" >{LOCALES[lan]['settings']['name']}</IonLabel>
                                        <IonLabel className="formInput" >{user.firstName + ' ' + user.lastName}</IonLabel>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonItem>
                        <IonItem lines="full" button detail>
                            <IonGrid style={{ paddingLeft: '0px' }}>
                                <IonRow>
                                    <IonCol style={{ paddingLeft: '0px' }}>
                                        <IonLabel className="formInputTitle" >{LOCALES[lan]['settings']['username']}</IonLabel>
                                        <IonLabel >{user.username}</IonLabel>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonItem>
                        <IonItem lines="full" button detail>
                            <IonGrid style={{ paddingLeft: '0px' }}>
                                <IonRow>
                                    <IonCol style={{ paddingLeft: '0px' }}>
                                        <IonLabel className="formInputTitle" >{LOCALES[lan]['settings']['email']}</IonLabel>
                                        <IonLabel >{user.email}</IonLabel>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonItem>

                        {/* <IonItem lines="full" button detail>
                            <IonGrid style={{ paddingLeft: '0px' }}>
                                <IonRow>
                                    <IonCol style={{ paddingLeft: '0px' }}>
                                        <IonLabel className="formInputTitle" >Change Mobile PIN</IonLabel>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonItem> */}
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

function mapStateToProps({ auth, user, device }) {
    return {
        token: auth.token,
        user,
        lan: device ? device.language : 'en'
    }
}

export default connect(mapStateToProps)(withIonLifeCycle(Settings))