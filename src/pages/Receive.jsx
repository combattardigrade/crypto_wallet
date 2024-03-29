import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import {
    IonList, IonInput, IonTextarea, IonSelectOption, IonItemDivider, IonPage, IonTitle, IonToolbar, IonIcon, IonButton,
    IonItem, IonLabel, IonHeader, IonMenuButton, IonButtons, IonContent, IonBadge, IonGrid, IonRow, IonCol, IonAlert, withIonLifeCycle, IonNav
} from '@ionic/react';
import {
    chevronBackOutline, copyOutline, ellipsisVerticalOutline
} from 'ionicons/icons'

// Locales
import en from '../locales/en'
import fr from '../locales/fr'
import nl from '../locales/nl'
import es from '../locales/es'
import pt from '../locales/pt'
import ja from '../locales/ja'
import zh from '../locales/zh'


// Plugins
import { Plugins } from '@capacitor/core'
const { Clipboard } = Plugins
const LOCALES = { en, fr, nl, es, pt, ja, zh }
const QRCode = require('qrcode.react');


class Receive extends Component {
    state = {

    }

    ionViewWillEnter() {

    }

    handleBackBtn = () => {
        this.props.history.goBack()
    }

    handleCopyToClipboardBtn = async (e) => {
        e.preventDefault()
        const { user } = this.props
        Clipboard.write({ string: user.userAddress.address})
       
    }

    render() {

        const { user, lan } = this.props

        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar color="primary" className="jiwardsToolbar">
                        <IonButtons slot="start">
                            <IonButton onClick={e => { e.preventDefault(); this.handleBackBtn(); }}><IonIcon icon={chevronBackOutline}></IonIcon></IonButton>
                            <IonMenuButton />
                        </IonButtons>
                        <IonTitle>{LOCALES[lan]['deposit']['deposit_title']}</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent scrollY={false}>
                    <IonItem style={{ marginTop: '60px' }} lines="none">
                        <IonGrid>
                            <IonRow>
                                <IonCol style={{ textAlign: 'center' }}>
                                    <QRCode style={{ width: '200px', height: '200px' }} value={user.userAddress.address} />
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonItem>
                    <IonItem lines="inset">
                        <IonGrid>
                            <IonRow>
                                <IonCol size="9">
                                    <IonLabel style={{ fontSize: '12px', color: 'grey' }}>{LOCALES[lan]['deposit']['ethereum_address']}: </IonLabel>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol size="9">
                                    <IonInput readonly value={user.userAddress.address} style={{ color: '#0033CC', fontSize:'0.8em'}}></IonInput>
                                </IonCol>
                                <IonCol size="3" style={{ textAlign: 'center', color: '#0033CC' }}>
                                    <IonButton onClick={this.handleCopyToClipboardBtn}>
                                        <IonIcon style={{ color: 'white' }} icon={copyOutline}></IonIcon>
                                    </IonButton>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonItem>
                    <IonItem lines="none">
                        <IonGrid>

                        </IonGrid>
                    </IonItem>
                </IonContent>
            </IonPage>

        )
    }
}

function mapStateToProps({ auth, user, device }) {
    return {
        token: auth.token,
        user,
        lan: device && device.language
    }
}

export default connect(mapStateToProps)(withIonLifeCycle(Receive))