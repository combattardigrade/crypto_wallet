import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import {
    IonSelect, IonSelectOption, IonItemDivider, IonItemOption, IonItemGroup, IonItemSliding, IonItemOptions, IonTitle, IonToolbar, IonIcon, IonButton,
    IonItem, IonLabel, IonTabs, IonTabBar, IonTabButton, IonTab, IonBadge, IonGrid, IonRow, IonCol, IonAlert, withIonLifeCycle, IonNav
} from '@ionic/react';
import {
    personCircleOutline
} from 'ionicons/icons'


class Rankings extends Component {
    state = {
        category: 'all'
    }

    ionViewWillEnter() {

    }

    handleCategoryChange = (value) => {
        this.setState({ category: value })
    }

    render() {
        return (
            <Fragment>
                <IonItem lines="none">

                    <IonLabel className="rankingsCategoryTitle">Category</IonLabel>

                    <IonSelect value={this.state.category} okText="Okay" cancelText="Dismiss" onIonChange={e => this.handleCategoryChange(e.detail.value)}>
                        <IonSelectOption value="all">All</IonSelectOption>

                    </IonSelect>

                </IonItem>

                <IonItem lines="none">
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <IonButton color="light" expand="full">YEAR</IonButton>
                            </IonCol>
                            <IonCol>
                                <IonButton color="light" expand="full">MONTH</IonButton>
                            </IonCol>
                            <IonCol>
                                <IonButton color="primary" expand="full">WEEK</IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonItem>

                <IonItemDivider>
                    <IonLabel>
                        Top
                    </IonLabel>
                </IonItemDivider>
                
                <IonItem>
                    <IonGrid>
                        <IonRow>
                            <IonCol size="1" style={{ textAlign: 'center' }}>
                                <IonLabel className="rankingsIndex">1</IonLabel>
                            </IonCol>
                            <IonCol size="2">
                                <IonIcon style={{ fontSize: '48px' }} color="primary" icon={personCircleOutline}></IonIcon>
                            </IonCol>
                            <IonCol size="7">
                                <IonLabel className="rankingsName">John Smith</IonLabel>
                            </IonCol>
                            <IonCol size="2" style={{ textAlign: 'center' }}>
                                <IonLabel className="rankingsAmount">88</IonLabel>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonItem>


            </Fragment>
        )
    }
}

function mapStateToProps({ auth }) {
    return {
        token: auth.token,

    }
}

export default connect(mapStateToProps)(withIonLifeCycle(Rankings))