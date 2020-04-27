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
const LOCALES = { en, fr, nl }

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

        if(token) {
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

        let response
        try {
            response = await (await login({ email, password })).json()
        }
        catch (err) {
            console.log(err)
            this.showAlert(LOCALES[lan]['error']['general'], 'Error')
            return
        }

        if (response.status != 'OK') {
            this.showAlert('message' in response ? response.message : LOCALES[lan]['error']['general'], 'Error')
            return
        }
        // save jwt
        this.props.dispatch(saveToken(response.token))

        // redirect to dashboard
        this.props.history.replace('/main')
    }

    goToSignup = (e) => {
        e.preventDefault()
        this.props.history.replace('/signup')
    }


    render() {

        const { lan } = this.props

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

                                <IonRow style={{ marginTop: '5px' }}>
                                    <IonCol style={{ textAlign: 'center' }}>
                                        <IonButton fill="clear" >
                                            <IonNote onClick={this.goToSignup} style={{ fontSize: '0.8em', color: 'white' }}>{LOCALES[lan]['login']['forgot_password']}</IonNote>
                                        </IonButton>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </form>
                        <div style={{ bottom: '20px', position: 'absolute' }}>
                            <IonNote onClick={e => {e.preventDefault(); this.goToPage('signup')}} style={{ fontSize: '0.8em', color: 'white' }}>{LOCALES[lan]['login']['create_account']}</IonNote>
                        </div>
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