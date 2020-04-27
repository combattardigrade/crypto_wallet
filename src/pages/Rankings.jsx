import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import {
    IonSelect, IonSelectOption, IonItemDivider, IonItemOption, IonItemGroup, IonItemSliding, IonItemOptions, IonTitle, IonToolbar, IonIcon, IonButton,
    IonItem, IonLabel, IonTabs, IonTabBar, IonTabButton, IonTab, IonBadge, IonGrid, IonRow, IonCol, IonAlert, withIonLifeCycle, IonNav
} from '@ionic/react';
import {
    personCircleOutline
} from 'ionicons/icons'

// Locales
import en from '../locales/en'
import fr from '../locales/fr'
import nl from '../locales/nl'
const LOCALES = { en, fr, nl }

class Rankings extends Component {
    state = {
        category: 'all',
        period: 'week',
    }

    ionViewWillEnter() {

    }

    handleCategoryChange = (value) => {
        this.setState({ category: value })
    }

    handlePeriodChange = (period) => this.setState({ period })

    render() {

        const { rankings, lan } = this.props
        const { period } = this.state

        if (!rankings || !period) {
            return <IonItem><IonLabel>Loading...</IonLabel></IonItem>
        }

        return (
            <Fragment>
                <IonItem lines="none">

                    <IonLabel className="rankingsCategoryTitle">{LOCALES[lan]['rankings']['category']}</IonLabel>

                    {/* <IonSelect value={this.state.category} okText="Okay" cancelText="Dismiss" onIonChange={e => this.handleCategoryChange(e.detail.value)}>
                        <IonSelectOption value="all">All</IonSelectOption>

                    </IonSelect> */}

                </IonItem>

                <IonItem lines="none">
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <IonButton onClick={e => { e.preventDefault(); this.handlePeriodChange('year') }} color={period === 'year' ? 'primary' : 'light'} expand="full">{LOCALES[lan]['rankings']['year']}</IonButton>
                            </IonCol>
                            <IonCol>
                                <IonButton onClick={e => { e.preventDefault(); this.handlePeriodChange('month') }} color={period === 'month' ? 'primary' : 'light'} expand="full">{LOCALES[lan]['rankings']['month']}</IonButton>
                            </IonCol>
                            <IonCol>
                                <IonButton onClick={e => { e.preventDefault(); this.handlePeriodChange('week') }} color={period === 'week' ? 'primary' : 'light'} expand="full">{LOCALES[lan]['rankings']['week']}</IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonItem>

                <IonItemDivider>
                    <IonLabel>
                        Top
                    </IonLabel>
                </IonItemDivider>

                {
                    rankings && Object.values(rankings[period]).length > 0
                        ?
                        Object.values(rankings[period]).map((r, i) => (
                            <IonItem key={i}>
                                <IonGrid>
                                    <IonRow>
                                        <IonCol size="1" style={{ textAlign: 'center' }}>
                                            <IonLabel className="rankingsIndex">{i + 1}</IonLabel>
                                        </IonCol>
                                        <IonCol size="2">
                                            <IonIcon style={{ fontSize: '48px' }} color="primary" icon={personCircleOutline}></IonIcon>
                                        </IonCol>
                                        <IonCol size="7">
                                            <IonLabel className="rankingsName">{r.user.firstName + ' ' + r.user.lastName}</IonLabel>
                                        </IonCol>
                                        <IonCol size="2" style={{ textAlign: 'center' }}>
                                            <IonLabel className="rankingsAmount">{parseInt(r.total_amount)}</IonLabel>
                                        </IonCol>
                                    </IonRow>
                                </IonGrid>
                            </IonItem>
                        ))
                        :
                        null
                }





            </Fragment>
        )
    }
}

function mapStateToProps({ auth, rankings, device }) {
    return {
        token: auth.token,
        rankings,
        lan: device && device.language
    }
}

export default connect(mapStateToProps)(withIonLifeCycle(Rankings))