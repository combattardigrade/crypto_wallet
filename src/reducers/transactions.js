import { SAVE_TXS } from '../actions/transactions'

export default function transaction(state = null, action) {
    switch (action.type) {
        case SAVE_TXS:
            return {
                ...state,
                ...action.txs
            }
        default:
            return state
    }
}