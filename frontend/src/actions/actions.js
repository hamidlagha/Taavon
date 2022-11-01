import axios from 'axios'
import { 
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,

    CONFIRM_REQUEST,
    CONFIRM_SUCCESS,
    CONFIRM_FAIL,
    SELECTION_GET,
    SELECTION_SET,

    SUBMIT_REQUEST,
    SUBMIT_SUCCESS,
    SUBMIT_FAIL,

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
            '/api/v1/login/', 
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
            '/api/v1/confirm/', 
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

 export const selectionGetAction = () => (dispatch) =>{
    dispatch({type: SELECTION_GET})
 }

 export const selectionSetAction = (list) => async (dispatch) => {
    console.log('in action', list)
    dispatch({
        type: SELECTION_SET,
        payload: [...list]
    })
 }


 export const submitAction = (selection) => async (dispatch) => {
    try {
        dispatch({
            type: SUBMIT_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const  { data } = await axios.post(
            '/api/v1/vote/', 
            selection, 
            config
        )

        dispatch({
            type: SUBMIT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: SUBMIT_FAIL,
            success: false,
            payload: error.response && error.response.data.msg
                ? error.response.data.msg
                : error.message
        })

    }
 }