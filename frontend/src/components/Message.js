import React from 'react'
import { useAlert } from 'react-alert'

function Message({ variant, children }) {
    const alert = useAlert()
    if (variant === 'success') {
        alert.show(children)
    } else{
        if(variant === 'error'){
            alert.error(children)
        } else {
            alert.info(children)
        }
    }
    return (
        <span></span>
    )
}

export default Message
