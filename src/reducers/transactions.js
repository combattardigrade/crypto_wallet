import { SAVE_TXS, SAVE_NEW_TX } from '../actions/transactions'

export default function transaction(state = null, action) {
    switch (action.type) {
        case SAVE_TXS:
            return {                
                ...action.txs
            }
        case SAVE_NEW_TX:
            return {
                ...state,
                ...action.tx
            }
        default:
            return state
    }
}