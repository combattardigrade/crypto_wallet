import { SAVE_TX_REASONS } from '../actions/txReasons'

export default function txReasons(state = null, action) {
    switch (action.type) {
        case SAVE_TX_REASONS:
            return {
               ...state,
               ...action.txReasons
            }
        default:
            return state
    }
}