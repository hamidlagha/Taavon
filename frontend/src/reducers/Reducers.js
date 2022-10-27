import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,

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
                // userInfo: action.payload
            }
        
        case LOGIN_FAIL:
            return {loading: false, error: action.payload, success: false}

        default:
            return state
    }
}