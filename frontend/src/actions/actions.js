import axios from 'axios'
import { 
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,

    CONFIRM_REQUEST,
    CONFIRM_SUCCESS,
    CONFIRM_FAIL,

 } from '../constants/Constants'

 export const loginAction = (member) => async (dispatch) => {
    try {
        dispatch({
            type: LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const  { data } = await axios.post(
            'http://127.0.0.1:8000/api/v1/login/', 
            member, 
            config
        )

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            success: false,
            payload: error.response && error.response.data.msg
                ? error.response.data.msg
                : error.message
        })

    }
 }

 export const confirmAction = (confirm) => async (dispatch) => {
    try {
        dispatch({
            type: CONFIRM_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const  { data } = await axios.post(
            'http://127.0.0.1:8000/api/v1/confirm/', 
            confirm, 
            config
        )

        dispatch({
            type: CONFIRM_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: CONFIRM_FAIL,
            success: false,
            payload: error.response && error.response.data.msg
                ? error.response.data.msg
                : error.message
        })

    }
 }