import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userLoginReducer, confirmSmsReducer } from './reducers/Reducers'


const reducer = combineReducers({
     userLogin: userLoginReducer,
     userConfirm: confirmSmsReducer,
})

// const userInfoFromStorage = localStorage.getItem('userInfo') ?
//      JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {

//     login: true
}

const middleware = [thunk]

const store = createStore(reducer, initialState,
     composeWithDevTools(applyMiddleware(...middleware)))

export default store