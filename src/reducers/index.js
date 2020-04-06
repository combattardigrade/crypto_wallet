import { combineReducers } from 'redux'
import auth from './auth'
import user from './user'
import transactions from './transactions'
import storage from 'redux-persist/lib/storage'

const appReducer = combineReducers({    
    auth,
    user,
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