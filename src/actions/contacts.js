export const SAVE_CONTACTS = 'SAVE_CONTACTS'
export const ADD_NEW_CONTACT = 'ADD_NEW_CONTACT'

export function saveContacts(contacts) {
    return {
        type: SAVE_CONTACTS,
        contacts
    }
}

export function addNewContact(contact) {
    return {
        type: ADD_NEW_CONTACT,
        contact
    }
}