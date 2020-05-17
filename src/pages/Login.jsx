import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
    IonGrid, IonRow, IonCol, IonNote, IonItem, IonIcon,
    IonContent, IonPage, IonTitle, IonToolbar, IonLabel, IonButton,
    IonAlert,
    IonText
} from '@ionic/react';
import { personCircleOutline } from 'ionicons/icons'

// Styles
import './styles-dark.css'

// API
import { login, getKeycloakToken, keycloakLogin } from '../utils/api'

// Actions
import { saveToken } from '../actions/auth'

// Plugins
import { HTTP } from '@ionic-native/http'

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

class Login extends Component {

    state = {
        showAlert: false,
        alertMsg: '',
        alertTitle: ''
    }

    componentDidMount() {
        const { token } = this.props

        if (token) {
            this.props.history.replace('/main')
            return
        }
    }

    goToPage = (page) => {
        this.props.history.push(page)
        return
    }

    showAlert = (msg, title) => {
        this.setState({ showAlert: true, alertMsg: msg, alertTitle: title })
    }

    handleSubmit = async (e) => {
        e.preventDefault()

        const { lan } = this.props

        const email = e.target.email.value
        const password = e.target.password.value

        if (!email || !password) {
            this.showAlert(LOCALES[lan]['error']['missing_required'], 'Error')
            return
        }

        getKeycloakToken({ email, password })
            .then(data => data.json())
            .then((res) => {
                if (res.status === 'OK') {
                    keycloakLogin({ token: res.token })
                        .then(data => data.json())
                        .then((res2) => {
                            if (res2.status != 'OK') {
                                this.showAlert('message' in res2 ? res2.message : LOCALES[lan]['error']['general'], 'Error')
                                return
                            }
                            // save jwt
                            this.props.dispatch(saveToken(res2.token))

                            // redirect to dashboard
                            this.props.history.replace('/main')
                        })
                        .catch((err) => {
                            console.log(err)
                            this.showAlert(LOCALES[lan]['error']['general'], 'Error')
                            return
                        })
                } else {                   
                    this.showAlert('message' in res ? res.message : LOCALES[lan]['error']['general'], 'Error')
                    return
                }
            })
            .catch((err) => {
                console.log(err)
                this.showAlert(LOCALES[lan]['error']['general'], 'Error')
                return
            })
    }

    goToSignup = (e) => {
        e.preventDefault()
        this.props.history.replace('/signup')
    }


    render() {

        const { lan } = this.props

        if(!lan) return

        return (
            <IonPage>


                <IonContent className="dark">
                    <div className='authPage'>
                        <form onSubmit={this.handleSubmit} style={{ width: '100%' }} >
                            <div style={{ textAlign: 'center' }}>
                                <img src={logo} style={{ height: '10em' }} />

                            </div>
                            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                                <IonLabel className='authTitle'>{LOCALES[lan]['login']['login_title']}</IonLabel>
                            </div>
                            <div style={{ padding: 15 }}>
                                <IonItem className="dark" lines="full">
                                    <ion-input type="email" placeholder={LOCALES[lan]['login']['email']} name="email"></ion-input>
                                </IonItem>

                                <IonItem className="dark" lines="full">
                                    <ion-input type="password" placeholder={LOCALES[lan]['login']['password']} name="password"></ion-input>
                                </IonItem>
                            </div>

                            <IonGrid>
                                <IonRow>
                                    <IonCol size="12" style={{ paddingBottom: '0px' }}>
                                        <ion-button color="light" expand="block" type="submit" >{LOCALES[lan]['login']['login_btn']}</ion-button>
                                    </IonCol>
                                </IonRow>

                                {/* <IonRow style={{ marginTop: '5px' }}>
                                    <IonCol style={{ textAlign: 'center' }}>
                                        <IonButton fill="clear" >
                                            <IonNote onClick={this.goToSignup} style={{ fontSize: '0.8em', color: 'white' }}>{LOCALES[lan]['login']['forgot_password']}</IonNote>
                                        </IonButton>
                                    </IonCol>
                                </IonRow> */}
                            </IonGrid>
                        </form>
                        {/* <div style={{ bottom: '20px', position: 'absolute' }}>
                            <IonNote onClick={e => { e.preventDefault(); this.goToPage('signup') }} style={{ fontSize: '0.8em', color: 'white' }}>{LOCALES[lan]['login']['create_account']}</IonNote>
                        </div> */}
                    </div>
                </IonContent>
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
            </IonPage>
        )
    }
}

function mapStateToProps({ auth, device }) {
    return {
        token: auth && auth.token,
        lan: device ? device.language : 'en'
    }
}

export default connect(mapStateToProps)(Login)