import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    IonGrid, IonRow, IonCol, IonNote, IonItem, IonIcon,
    IonContent, IonPage, IonTitle, IonToolbar, IonLabel, IonButton,
    IonAlert,
    IonText
} from '@ionic/react';
import { personCircleOutline } from 'ionicons/icons'

// API
import { signup } from '../utils/api'

// Actions
import { saveToken } from '../actions/auth'

// Styles
import './styles-dark.css'

// Locales
import en from '../locales/en'
import fr from '../locales/fr'
import nl from '../locales/nl'
const LOCALES = { en, fr, nl }

// Images
const logo = require('../components/logo.png')

// Libraries
const emailValidator = require('email-validator')


class Signup extends Component {

    state = {
        showAlert: false,
        alertMsg: '',
        alertTitle: '',
        step: 1,
    }

    showAlert = (msg, title) => {
        this.setState({ showAlert: true, alertMsg: msg, alertTitle: title })
    }

    goToPage = (page) => {
        this.props.history.push(page)
        return
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        const { lan } = this.props
        const firstName = e.target.firstName.value
        const lastName = e.target.lastName.value
        const username = e.target.username.value
        const email = e.target.email.value
        const password = e.target.password.value
        const rpassword = e.target.rpassword.value

        if (!firstName || !lastName || !username || !email || !password || !rpassword || !password) {
            this.showAlert(LOCALES[lan]['error']['missing_required'], 'Error')
            return
        }

        if (!emailValidator.validate(email)) {
            this.showAlert(LOCALES[lan]['error']['enter_valid_email'], 'Error')
            return
        }

        if (password !== rpassword) {
            this.showAlert(LOCALES[lan]['error']['passwords_dont_match'], 'Error')
            return
        }

        let response
        try {
            response = await (await signup({ firstName, lastName, username, email, password, rpassword })).json()
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

        // redirect to main page
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
                    <div className=' authPage'>

                        <form onSubmit={this.handleSubmit} style={{ width: '100%' }} >
                            <div style={{ textAlign: 'center' }}>
                                <img src={logo} style={{ height: '5em' }} />
                            </div>
                            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                                <IonLabel className='authTitle'>{LOCALES[lan]['signup']['signup_title']}</IonLabel>
                            </div>
                            <div style={{ padding: 15 }}>
                                <IonItem className="dark" lines="full">
                                    <ion-input type="text" placeholder={LOCALES[lan]['signup']['first_name']} name="firstName"></ion-input>
                                </IonItem>
                                <IonItem className="dark" lines="full">
                                    <ion-input type="text" placeholder={LOCALES[lan]['signup']['last_name']} name="lastName"></ion-input>
                                </IonItem>
                                <IonItem className="dark" lines="full">
                                    <ion-input type="text" placeholder={LOCALES[lan]['signup']['username']} name="username"></ion-input>
                                </IonItem>
                                <IonItem className="dark" lines="full">
                                    <ion-input type="email" placeholder={LOCALES[lan]['signup']['email']} name="email"></ion-input>
                                </IonItem>
                                <IonItem className="dark" lines="full">
                                    <ion-input type="password" placeholder={LOCALES[lan]['signup']['password']} name="password"></ion-input>
                                </IonItem>
                                <IonItem className="dark" lines="full">
                                    <ion-input type="password" placeholder={LOCALES[lan]['signup']['rpassword']} name="rpassword"></ion-input>
                                </IonItem>
                            </div>

                            <IonGrid>
                                <IonRow>
                                    <IonCol size="12" style={{ paddingBottom: '0px' }}>
                                        <ion-button color="light" expand="block" type="submit" >{LOCALES[lan]['signup']['signup_btn']}</ion-button>
                                    </IonCol>
                                </IonRow>

                                
                            </IonGrid>
                        </form>
                        <div slot="fixed" style={{ bottom: '20px', position: 'absolute' }}>
                            <IonNote onClick={e => { e.preventDefault(); this.goToPage('login') }} style={{ fontSize: '0.8em', color: 'white' }}>{LOCALES[lan]['signup']['login_btn']}</IonNote>
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

function mapStateToProps({ device }) {
    return {
        lan: device ? device.language : 'en'
    }
}

export default connect(mapStateToProps)(Signup)