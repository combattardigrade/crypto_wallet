import { SAVE_CONTACTS, ADD_NEW_CONTACT } from '../actions/contacts'

export default function contacts(state = null, action) {
    switch (action.type) {
        case SAVE_CONTACTS:
            return {                
                ...action.contacts
            }
        case ADD_NEW_CONTACT:
            return {
                ...state,
                ...action.contact,
            }
        default:
            return state
    }
}