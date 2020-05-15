import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login } from '../utils/api'
import { saveToken } from '../actions/auth'

import {
    IonGrid, IonRow, IonCol, IonNote, IonItem, IonIcon,
    IonContent, IonPage, IonTitle, IonToolbar, IonLabel, IonButton,
    IonAlert,
    IonText
} from '@ionic/react';
import { personCircleOutline } from 'ionicons/icons'


// Styles
import './styles-dark.css'

// Locales
import en from '../locales/en'
import fr from '../locales/fr'
import nl from '../locales/nl'
import es from '../locales/es'
import pt from '../locales/pt'
import ja from '../locales/ja'
import zh from '../locales/zh'
const LOCALES = { en, fr, nl, es, pt, ja, zh }

// Images
const logo = require('../components/logo.png')



class Intro extends Component {

    state = {
        showAlert: false,
        alertMsg: '',
        alertTitle: '',
       
    }

    componentDidMount() {
        try {
            if (this.props.location.state.logout === true) {
                const { state } = this.props.location
                const stateCopy = { ...state }
                delete stateCopy.logout
                this.props.history.replace({ state: stateCopy })
                setTimeout(() => {
                    window.location.reload()
                }, 100)
            }
        }
        catch (e) {
            console.log(e)
        }
    }

    goToPage = (page) => {
        this.props.history.push(page)
        return
    }


    render() {

        const { lan } = this.props

        return (
            <IonPage>
                <IonContent className="dark">
                    <div className=' authPage'>
                        <form style={{ width: '100%' }} >
                            <div style={{ textAlign: 'center' }}>
                                <img src={logo} style={{ height: '10em' }} />
                            </div>
                            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                                <IonLabel className='authTitle'>JIWARDS WALLET</IonLabel>
                            </div>
                            <IonGrid style={{ marginTop: '30px' }}>
                                <IonRow>
                                    <IonCol size="12" style={{ paddingBottom: '0px' }}>
                                        <ion-button onClick={e => { e.preventDefault(); this.goToPage('login') }} color="light" expand="block" >{LOCALES[lan]['intro']['login_btn']}</ion-button>
                                    </IonCol>
                                </IonRow>
                                {/* <IonRow>
                                    <IonCol size="12" style={{ marginTop: '-5px' }}>
                                        <ion-button onClick={e => { e.preventDefault(); this.goToPage('signup') }} style={{ marginTop: '-1px !important' }} color="dark" expand="block" >{LOCALES[lan]['intro']['signup_btn']}</ion-button>
                                    </IonCol>
                                </IonRow> */}
                            </IonGrid>
                        </form>
                    </div>
                </IonContent>
            </IonPage>
        )
    }
}

function mapStateToProps({ device }) {
    return {
        lan: device ? device.language : 'en'
    }
}

export default connect(mapStateToProps)(Intro)