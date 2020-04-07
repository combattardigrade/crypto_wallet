import { combineReducers } from 'redux'
import auth from './auth'
import user from './user'
import transactions from './transactions'
import rankings from './rankings'
import txReasons from './txReasons'
import transfer from './transfer'
import contacts from './contacts'
import inbox from './inbox'
import storage from 'redux-persist/lib/storage'

const appReducer = combineReducers({    
    auth,
    user,
    rankings,
    txReasons,
    transfer,
    contacts,
    inbox,
    transactions,
})

const rootReducer = (state , action) => {    
    if(action.type == 'USER_LOGOUT') {
        storage.removeItem('persist:root')
        state = undefined
    }
    return appReducer(state, action)
}

export default rootReducer