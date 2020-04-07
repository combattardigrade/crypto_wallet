import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import {
    IonList, IonInput, IonTextarea, IonSelectOption, IonItemDivider, IonPage, IonTitle, IonToolbar, IonIcon, IonButton,
    IonItem, IonLabel, IonHeader, IonMenuButton, IonButtons, IonContent, IonBadge, IonGrid, IonRow, IonCol, IonAlert, withIonLifeCycle, IonNav
} from '@ionic/react';
import {
    chevronBackOutline, personCircleOutline, ellipsisVerticalOutline, addOutline
} from 'ionicons/icons'


class Contacts extends Component {
    state = {

    }

    ionViewWillEnter() {

    }

    handleBackBtn = () => {
        this.props.history.goBack()
    }

    handleContactDetailsClick = (contactId) => {        
        console.log(contactId)
        this.props.history.push('/contact/' + contactId)
    }

    render() {

        const { contacts } = this.props        

        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar color="primary" className="jiwardsToolbar">
                        <IonButtons slot="start">
                            <IonButton onClick={e => {e.preventDefault(); this.handleBackBtn()}}><IonIcon icon={chevronBackOutline}></IonIcon></IonButton>
                            <IonMenuButton />
                        </IonButtons>
                        <IonTitle>Contacts</IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={e => {e.preventDefault(); this.props.history.push('/newContact')}}><IonIcon icon={addOutline}></IonIcon></IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonList >
                        <IonItemDivider>
                            <IonLabel>All Contacts</IonLabel>
                        </IonItemDivider>
                        {
                            contacts && Object.values(contacts).length > 0
                                ?
                                Object.values(contacts).map((contact, i) => (
                                    <IonItem key={i} color="white" detail button onClick={ e => { e.preventDefault(); this.handleContactDetailsClick(contact.contactId);}}>
                                        <IonGrid>
                                            <IonRow>
                                                <IonCol size="2">
                                                    <IonIcon style={{ fontSize: '48px' }} color="primary" icon={personCircleOutline}></IonIcon>
                                                </IonCol>
                                                <IonCol >
                                                    <IonLabel className="txUsername">{contact.firstName + ' ' + contact.lastName}</IonLabel>
                                                    <IonLabel className="txReason">{contact.username}</IonLabel>
                                                </IonCol>                                                
                                            </IonRow>
                                        </IonGrid>
                                    </IonItem>
                                ))
                                : 
                                <IonItem lines="none" color="white">
                                    <IonLabel>No contacts found</IonLabel>
                                </IonItem>
                        }
                    </IonList>
                </IonContent>
            </IonPage>

        )
    }
}

function mapStateToProps({ auth, contacts }) {
    return {
        token: auth.token,
        contacts,
    }
}

export default connect(mapStateToProps)(withIonLifeCycle(Contacts))