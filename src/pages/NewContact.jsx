import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import {
    IonList, IonInput, IonSelectOption, IonItemDivider, IonPage, IonTitle, IonToolbar, IonIcon, IonButton,
    IonItem, IonLabel, IonHeader, IonMenuButton, IonButtons, IonContent, IonBadge, IonGrid, IonRow, IonCol, IonAlert, withIonLifeCycle, IonNav
} from '@ionic/react';
import {
    chevronBackOutline, personCircleOutline, close, addOutline
} from 'ionicons/icons'

// API
import { searchContact, addContact, getContacts } from '../utils/api'

// Actions
import { saveContacts } from '../actions/contacts'

// Locales
import en from '../locales/en'
import fr from '../locales/fr'
import nl from '../locales/nl'
const LOCALES = { en, fr, nl }

class NewContact extends Component {
    state = {
        searchValue: '',
        searchResults: [],
        selectedContact: '',
        showAlert: false,
        alertTitle: '',
        alertMsg: ''
    }

    ionViewWillEnter() {

    }

    handleSearchValueChange = (e) => {
        const { token } = this.props
        const searchValue = e.detail.value
        this.setState({ searchValue })
        searchContact({ searchValue, token })
            .then(data => data.json())
            .then((res) => {
                if (res.status == 'OK') {
                    console.log(res.payload)
                    this.setState({ searchResults: res.payload })
                }
            })
    }

    handleContactClick = (contactId) => {
        this.setState({ selectedContact: contactId })
    }

    handleAddContactBtn = (e) => {
        e.preventDefault()
        const { selectedContact } = this.state
        const { token, dispatch, lan } = this.props

        if (!selectedContact) {
            this.showAlert(LOCALES[lan]['error']['select_contact'], 'Error')
            return
        }

        // 
        addContact({ contactId: selectedContact, token })
            .then(data => data.json())
            .then((res) => {
                console.log(res)
                if (res.status == 'OK') {
                    console.log('CONTACT_ADDED')
                    getContacts({ token })
                        .then(data => data.json())
                        .then((res2) => {
                            console.log(res2)
                            dispatch(saveContacts(res2.payload))
                            this.handleBackBtn()
                        })
                } else {
                    this.showAlert(res.message, 'Error')
                }
            })
            .catch((err) => {
                console.log(err)
                this.showAlert(err.message, 'Error')
            })
    }

    showAlert = (msg, title) => {
        this.setState({ showAlert: true, alertMsg: msg, alertTitle: title })
    }

    handleBackBtn = () => {
        this.props.history.goBack()
    }

    render() {

        const { searchResults } = this.state
        const { lan } = this.props

        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar color="primary" className="jiwardsToolbar">

                        <IonTitle>{LOCALES[lan]['new_contact']['new_contact_title']}</IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={e => { e.preventDefault(); this.handleBackBtn() }}><IonIcon icon={close}></IonIcon></IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent scrollY={false}>
                    <IonList>
                        <IonItem lines="full">
                            <IonLabel position="stacked">{LOCALES[lan]['new_contact']['search']}</IonLabel>
                            <IonInput name="amount" value={this.state.searchValue} onIonChange={this.handleSearchValueChange} type="text" placeholder={LOCALES[lan]['new_contact']['input_search']}></IonInput>
                        </IonItem>

                    </IonList>
                    <IonItemDivider>
                        <IonLabel>{LOCALES[lan]['new_contact']['search_results']}</IonLabel>
                    </IonItemDivider>
                    <div style={{ height: '45vh', overflow: 'auto' }}>
                        <IonList style={{ padding: 0, margin: 0 }}>
                            {
                                searchResults && searchResults.length > 0
                                    ?
                                    searchResults.map((contact) => (
                                        <IonItem key={contact.id} color={contact.id === this.state.selectedContact ? 'primary' : 'white'} detail button onClick={e => { e.preventDefault(); this.handleContactClick(contact.id) }}>
                                            <IonGrid>
                                                <IonRow>
                                                    <IonCol size="2">
                                                        <IonIcon style={{ fontSize: '48px' }} color={contact.id !== this.state.selectedContact ? 'primary' : 'white'} icon={personCircleOutline}></IonIcon>
                                                    </IonCol>
                                                    <IonCol>
                                                        <IonLabel className="txUsername">{contact.firstName + ' ' + contact.lastName}</IonLabel>
                                                        <IonLabel className="txReason">{contact.username}</IonLabel>
                                                    </IonCol>

                                                </IonRow>
                                            </IonGrid>
                                        </IonItem>
                                    ))
                                    :
                                    <IonItem lines="none"><IonLabel>{LOCALES[lan]['new_contact']['no_results']}</IonLabel></IonItem>

                            }
                        </IonList>
                    </div>

                    <IonGrid style={{ bottom: '20px', position: 'absolute', width: '100%' }}>
                        <IonRow>
                            <IonCol size="12" style={{ paddingBottom: '0px' }}>
                                <IonButton onClick={this.handleAddContactBtn} color="primary" expand="block" >{LOCALES[lan]['new_contact']['add_contact_btn']}</IonButton>
                                <IonButton onClick={e => { e.preventDefault(); this.handleBackBtn(); }} color="dark" expand="block"  >{LOCALES[lan]['new_contact']['cancel_btn']}</IonButton>
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

export default connect(mapStateToProps)(withIonLifeCycle(NewContact))