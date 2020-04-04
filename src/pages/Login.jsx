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

// Images
const logo = require('../images/logo.png')



class Login extends Component {

    state = {
        showAlert: false,
        alertMsg: '',
        alertTitle: ''
    }

    componentDidMount() {

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

        const username = e.target.username.value
        const password = e.target.password.value

        if (!username || !password) {
            this.showAlert('Ingresa todos los campos requeridos', 'Error')
            return
        }

        let response
        try {
            response = await (await login({ username: username, password: password })).json()
        }
        catch (err) {
            console.log(err)
            this.showAlert('Ocurrió un error al intentar realizar la acción. Por favor, inténtalo nuevamente.', 'Error')
            return
        }

        if (response.status != 'OK') {
            this.showAlert('message' in response ? response.message : 'Ocurrió un error al intentar realizar la acción. Por favor, inténtalo nuevamente.', 'Error')
            return
        }
        // save jwt
        this.props.dispatch(saveToken(response.token))

        // redirect to dashboard
        this.props.history.replace('/dashboard')
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
                                <img src={logo} style={{ height: '10em' }} />

                            </div>
                            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                                <IonLabel className='authTitle'>LOG IN</IonLabel>
                            </div>
                            <div style={{ padding: 15 }}>
                                <IonItem className="dark" lines="full">
                                    <ion-input type="text" placeholder="Email" name="username"></ion-input>
                                </IonItem>

                                <IonItem className="dark" lines="full">
                                    <ion-input type="password" placeholder="Password" name="password"></ion-input>
                                </IonItem>
                            </div>

                            <IonGrid>
                                <IonRow>
                                    <IonCol size="12" style={{ paddingBottom: '0px' }}>
                                        <ion-button color="light" expand="block" type="submit" >Log In</ion-button>
                                    </IonCol>
                                </IonRow>

                                <IonRow style={{ marginTop: '5px' }}>
                                    <IonCol style={{ textAlign: 'center' }}>
                                        <IonButton fill="clear" >
                                            <IonNote onClick={this.goToSignup} style={{ fontSize: '0.8em', color: 'white' }}>Forgot your password?</IonNote>
                                        </IonButton>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </form>
                        <div style={{ bottom: '20px', position: 'absolute' }}>
                            <IonNote onClick={e => {e.preventDefault(); this.goToPage('signup')}} style={{ fontSize: '0.8em', color: 'white' }}>Create a New Account</IonNote>
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

export default connect(mapStateToProps)(Login)