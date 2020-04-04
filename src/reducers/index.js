import { combineReducers } from 'redux'
import auth from './auth'
import device from './device'
import network from './network'
import alert from './alert'
import storage from 'redux-persist/lib/storage'

const appReducer = combineReducers({
    alert,
    auth,
    device,    
    network,
    alert,    
})

const rootReducer = (state , action) => {    
    if(action.type == 'USER_LOGOUT') {
        storage.removeItem('persist:root')
        state = undefined
    }
    return appReducer(state, action)
}

export default rootReducer