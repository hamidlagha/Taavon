import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,

    CONFIRM_REQUEST,
    CONFIRM_SUCCESS,
    CONFIRM_FAIL,
    CONFIRM_RESET,
    LOGIN_RESET,
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