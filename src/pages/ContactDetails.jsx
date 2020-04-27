import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import {
    IonList, IonInput, IonTextarea, IonSelectOption, IonItemDivider, IonPage, IonTitle, IonToolbar, IonIcon, IonButton,
    IonItem, IonLabel, IonHeader, IonMenuButton, IonButtons, IonContent, IonBadge, IonGrid, IonRow, IonCol, IonAlert, withIonLifeCycle, IonNav
} from '@ionic/react';
import {
    chevronBackOutline, personCircleOutline, ellipsisVerticalOutline
} from 'ionicons/icons'

// API
import { deleteContact, getContacts } from '../utils/api';

// Actions
import { saveContacts } from '../actions/contacts'

// Locales
import en from '../locales/en'
import fr from '../locales/fr'
import nl from '../locales/nl'
import es from '../locales/es'
import pt from '../locales/pt'
import ja from '../locales/ja'
import zh from '../locales/zh'
const LOCALES = { en, fr, nl, es, pt, ja, zh }

class ContactDetails extends Component {
    state = {
        showConfirmationAlert: false,
        showAlert: false
    }

    ionViewWillEnter() {

    }

    handleBackBtn = () => {
        this.props.history.goBack()
    }

    handleDeleteBtn = (e) => {
        e.preventDefault()
        this.setState({showConfirmationAlert: true})
    }

    handleDeleteContact = () => {
        const { token, dispatch } = this.props
        const { contactId } = this.props.match.params
        deleteContact({ contactId, token })
            .then(data => data.json())
            .then((res) => {
                console.log(res)
                if (res.status == 'OK') {
                    console.log('CONTACT_DELETED')
                    getContacts({ token })
                        .then(data => data.json())
                        .then((res2) => {
                            console.log(res2)
                            this.handleBackBtn()
                            dispatch(saveContacts(res2.payload))
                            return
                        })
                } else {
                    this.showAlert(res.message, 'Error')
                    return
                }
            })
            .catch((err) => {
                this.showAlert(err.message, 'Error')
                return
            })       
    }

    showAlert = (msg, title) => {
        this.setState({ showAlert: true, alertMsg: msg, alertTitle: title })
    }

    render() {
        const { contactId } = this.props.match.params
        const { contacts, lan } = this.props
        const contact = (Object.values(contacts).filter(c => c.contactId !== contactId))[0]

        if(!contactId || !contact) {
            return (
                <IonLabel>{LOCALES[lan]['contact_details']['loading']}</IonLabel>
            )
        }

        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar color="primary" className="jiwardsToolbar">
                        <IonButtons slot="start">
                            <IonButton onClick={e => { e.preventDefault(); this.handleBackBtn(); }}><IonIcon icon={chevronBackOutline}></IonIcon></IonButton>
                            <IonMenuButton />
                        </IonButtons>
                        <IonTitle>Contact Details</IonTitle>

                    </IonToolbar>
                </IonHeader>
                <IonContent scrollY={false}>
                    <IonList>
                        <IonItem>
                            <IonLabel className="formInputTitle" position="stacked">{LOCALES[lan]['contact_details']['user_id']}</IonLabel>
                            <IonInput className="formInput" readonly value={contact.contactId}></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel className="formInputTitle" position="stacked">{LOCALES[lan]['contact_details']['username']}</IonLabel>
                            <IonInput className="formInput" readonly value={contact.username}></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel className="formInputTitle" position="stacked">{LOCALES[lan]['contact_details']['full_name']}</IonLabel>
                            <IonInput className="formInput" readonly value={contact.firstName + ' ' + contact.lastName}></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel className="formInputTitle" position="stacked">{LOCALES[lan]['contact_details']['email']}</IonLabel>
                            <IonInput className="formInput" readonly value={contact.email}></IonInput>
                        </IonItem>

                    </IonList>

                    <IonGrid style={{ bottom: '20px', position: 'absolute', width: '100%' }}>
                        <IonRow>
                            <IonCol size="12" style={{ paddingBottom: '0px' }}>
                                <IonButton onClick={this.handleDeleteBtn} color="danger" expand="block" >{LOCALES[lan]['contact_details']['delete_contact_btn']}</IonButton>

                            </IonCol>
                        </IonRow>
                    </IonGrid>
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
                    <IonAlert
                        isOpen={this.state.showConfirmationAlert}
                        header={'Confirmation'}
                        message={'Are you sure you want to delte this contact?'}
                        buttons={[
                            {
                                text: 'Cancel',
                                role: 'cancel',
                                handler: () => {
                                    this.setState({ showConfirmationAlert: false })
                                }
                            },
                            {
                                text: 'OK',
                                handler: () => {
                                    this.setState({ showConfirmationAlert: false })
                                    // delete contact API call
                                    this.handleDeleteContact()

                                }
                            }
                        ]}
                    />
                </IonContent>
            </IonPage>

        )
    }
}

function mapStateToProps({ auth, contacts, device }) {
    return {
        token: auth.token,
        contacts,
        lan: device && device.language
    }
}

export default connect(mapStateToProps)(withIonLifeCycle(ContactDetails))