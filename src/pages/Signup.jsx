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
        const firstName = e.target.firstName.value
        const lastName = e.target.lastName.value
        const username = e.target.username.value
        const email = e.target.email.value
        const password = e.target.password.value
        const rpassword = e.target.rpassword.value

        if (!firstName || !lastName || !username || !email || !password || !rpassword || !password) {
            this.showAlert('Enter all the required fields', 'Error')
            return
        }

        if (!emailValidator.validate(email)) {
            this.showAlert('Enter a valid email', 'Error')
            return
        }

        if (password !== rpassword) {
            this.showAlert('The passwords do not match', 'Error')
            return
        }

        let response
        try {
            response = await (await signup({ firstName, lastName, username, email, password, rpassword })).json()
        }
        catch (err) {
            console.log(err)
            this.showAlert('An error occurred, please try again', 'Error')
            return
        }

        if (response.status != 'OK') {
            this.showAlert('message' in response ? response.message : 'An error occurred, please try again', 'Error')
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
        return (
            <IonPage>


                <IonContent className="dark">
                    <div className=' authPage'>

                        <form onSubmit={this.handleSubmit} style={{ width: '100%' }} >
                            <div style={{ textAlign: 'center' }}>
                                <img src={logo} style={{ height: '5em' }} />
                            </div>
                            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                                <IonLabel className='authTitle'>SIGN UP</IonLabel>
                            </div>
                            <div style={{ padding: 15 }}>
                                <IonItem className="dark" lines="full">
                                    <ion-input type="text" placeholder="First Name" name="firstName"></ion-input>
                                </IonItem>
                                <IonItem className="dark" lines="full">
                                    <ion-input type="text" placeholder="Last Name" name="lastName"></ion-input>
                                </IonItem>
                                <IonItem className="dark" lines="full">
                                    <ion-input type="text" placeholder="Username" name="username"></ion-input>
                                </IonItem>
                                <IonItem className="dark" lines="full">
                                    <ion-input type="email" placeholder="Email" name="email"></ion-input>
                                </IonItem>
                                <IonItem className="dark" lines="full">
                                    <ion-input type="password" placeholder="Password" name="password"></ion-input>
                                </IonItem>
                                <IonItem className="dark" lines="full">
                                    <ion-input type="password" placeholder="Repeat Password" name="rpassword"></ion-input>
                                </IonItem>
                            </div>

                            <IonGrid>
                                <IonRow>
                                    <IonCol size="12" style={{ paddingBottom: '0px' }}>
                                        <ion-button color="light" expand="block" type="submit" >Sign Up</ion-button>
                                    </IonCol>
                                </IonRow>

                                
                            </IonGrid>
                        </form>
                        <div slot="fixed" style={{ bottom: '20px', position: 'absolute' }}>
                            <IonNote onClick={e => { e.preventDefault(); this.goToPage('login') }} style={{ fontSize: '0.8em', color: 'white' }}>Already have an account? Log In</IonNote>
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

function mapStateToProps() {
    return {

    }
}

export default connect(mapStateToProps)(Signup)