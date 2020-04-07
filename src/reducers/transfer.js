import { SAVE_TRANSFER } from '../actions/transfer'

export default function transfer(state = null, action) {
    switch (action.type) {
        case SAVE_TRANSFER:
            return {
                ...action.transfer
            }
        default:
            return state
    }
}