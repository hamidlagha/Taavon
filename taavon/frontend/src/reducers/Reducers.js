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
    SELECTION_RESET,

    SUBMIT_REQUEST,
    SUBMIT_SUCCESS,
    SUBMIT_FAIL,
    SUBMIT_RESET,

    REPORT_ALL_ZONE_REQUEST,
    REPORT_ALL_ZONE_SUCCESS,
    REPORT_ALL_ZONE_FAIL,

    REPORT_ONE_ZONE_REQUEST,
    REPORT_ONE_ZONE_SUCCESS,
    REPORT_ONE_ZONE_FAIL,

    REPORT_ONE_CANDIDA_REQUEST,
    REPORT_ONE_CANDIDA_SUCCESS,
    REPORT_ONE_CANDIDA_FAIL,

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
            return {
                selection: [...action.payload]
            }
        case SELECTION_RESET:
            return {selection: []}
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

export const reportAllZonesReducer = (state = {}, action ) => {
    
    switch (action.type) {
        case REPORT_ALL_ZONE_REQUEST:
            return {loading: true}
        
        case REPORT_ALL_ZONE_SUCCESS:
            return {
                    loading: false, 
                    zones: action.payload.data, 
                    success: true
            }
        
        case REPORT_ALL_ZONE_FAIL:
            return {
                loading: false,
                success: false,
                error: action.payload
            }
        
        default:
            return state;

    }
}

export const reportCandidaReducer = (state = {}, action ) => {
    
    switch (action.type) {
        case REPORT_ONE_CANDIDA_REQUEST:
            return {loading: true}
        
        case REPORT_ONE_CANDIDA_SUCCESS:
            return {
                    loading: false,
                    name: action.payload.name,
                    family: action.payload.family,
                    code: action.payload.code,
                    prs: action.payload.prs,
                    zone: action.payload.zone,
                    votes: action.payload.votes,
                    success: true
            }
        
        case REPORT_ONE_CANDIDA_FAIL:
            return {
                loading: false,
                success: false,
                error: action.payload
            }
        
        default:
            return state;

    }
}
