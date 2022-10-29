import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,

    CONFIRM_REQUEST,
    CONFIRM_SUCCESS,
    CONFIRM_FAIL,
    CONFIRM_RESET,
    LOGIN_RESET,

    SELECTION_SET,
    SELECTION_GET,

    SUBMIT_REQUEST,
    SUBMIT_SUCCESS,
    SUBMIT_FAIL,
    SUBMIT_RESET,

} from '../constants/Constants'

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {loading: true}
        
        case LOGIN_SUCCESS:
            return {
                loading: false, 
                success: action.payload.success,
                member: action.payload.member,
                candidas: action.payload.candidas,
                msg: action.payload.msg,
                id: action.payload.id,
                mobile: action.payload.mobile,
                name: action.payload.name,
                family: action.payload.family
            }
        
        case LOGIN_FAIL:
            return {loading: false, error: action.payload, success: false}
        
        case LOGIN_RESET:
            return {}

        default:
            return state
    }
}

export const confirmSmsReducer = (state = {}, action) => {
    switch (action.type) {
        case CONFIRM_REQUEST:
            return {loading: true}
        
        case CONFIRM_SUCCESS:
            return {
                loading: false, 
                success: action.payload.success,
                msg: action.payload.msg,
                candidas: action.payload.candidas,
                member: action.payload.member
            }
        
        case CONFIRM_FAIL:
            return {loading: false, error: action.payload, success: false}
        
        case CONFIRM_RESET:
            return {}
        
        default:
            return state
    }
}

export const selectionReducer = (state = {selection: []}, action) => {
    switch (action.type) {
        case SELECTION_GET:
            return state
        
        case SELECTION_SET:
            console.log('in reducer', action.payload)
            return {
                selection: [...action.payload]
            }
        
        default:
            return state
    }
}


export const submitReducer = (state = {}, action) => {
    switch (action.type) {
        case SUBMIT_REQUEST:
            return {loading: true}
        
        case SUBMIT_SUCCESS:
            return {
                loading: false, 
                success: action.payload.success,
                msg: action.payload.msg,
            }
        
        case SUBMIT_FAIL:
            return {loading: false, error: action.payload, success: false}
        
        case SUBMIT_RESET:
            return {}
        
        default:
            return state
    }
}
