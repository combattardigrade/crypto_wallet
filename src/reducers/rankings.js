import { SAVE_RANKINGS } from '../actions/rankings'

export default function rankings(state = null, action) {
    switch (action.type) {
        case SAVE_RANKINGS:
            return {
                ...state,
                [action.rankings.period]: {
                    ...action.rankings.rankings
                }
            }
        default:
            return state
    }
}