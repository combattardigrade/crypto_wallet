import { SAVE_LANGUAGE, SAVE_DEVICE_DATA } from '../actions/device'

export default function device(state = null, action) {
    switch (action.type) {
        case SAVE_LANGUAGE:
            return {             
                ...state,   
               language: action.language
            }
        case SAVE_DEVICE_DATA:
            return {
                ...state,
                ...action.deviceData,
            }
        default:
            return state
    }
}