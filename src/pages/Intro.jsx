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



class Intro extends Component {

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

   
    render() {
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
                            <IonGrid style={{marginTop:'30px'}}>
                                <IonRow>
                                    <IonCol size="12" style={{ paddingBottom: '0px' }}>
                                        <ion-button onClick={e => { e.preventDefault(); this.goToPage('login')}} color="light" expand="block" >Log In</ion-button>
                                    </IonCol>
                                </IonRow>
                                <IonRow >
                                    <IonCol size="12" style={{marginTop:'-5px'}}>
                                        <ion-button onClick={e => { e.preventDefault(); this.goToPage('signup')}} style={{marginTop:'-1px !important'}} color="dark" expand="block" >Sign up</ion-button>
                                    </IonCol>
                                </IonRow>                                
                            </IonGrid>
                        </form>                        
                    </div>
                </IonContent>
                
            </IonPage>
        )
    }
}

function mapStateToProps() {
    return {

    }
}

export default connect(mapStateToProps)(Intro)