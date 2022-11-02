import React, { useEffect, useState } from 'react'
import { Button, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { submitAction } from '../../actions/actions'
import { LOGIN_RESET, CONFIRM_RESET, SUBMIT_RESET, SELECTION_RESET } from '../../constants/Constants'

function SubmitScreen() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const selectionInfo = useSelector(state => state.selectionList)
    const { selection } = selectionInfo

    const userLoginInfo = useSelector(state => state.userLogin)
    const { id, mobile, name, family } = userLoginInfo

    const [voted, setVoted] = useState(false)
    const userConfirmInfo = useSelector(state => state.userConfirm)
    const { candidas } = userConfirmInfo

    const userSubmitInfo = useSelector(state => state.userSubmit)
    const { success, msg } = userSubmitInfo

    useEffect(() => {
        if (!selection || !id) {
            navigate('/')
        }
        if (success) {
            navigate('/finish/')
        } else if (success === false){
            setVoted(true)
        }
    }, [success])

    const submitHandler = () => {
        dispatch(submitAction({
            id,
            selection
        }))
    }

    const clearState = () => {
        dispatch({ type: LOGIN_RESET })
        dispatch({ type: CONFIRM_RESET })
        dispatch({ type: SUBMIT_RESET })
        dispatch({ type: SELECTION_RESET })
    }
    return (
        <div className="wrapper fadeInDown ">
            <div id="formContent">
                <div className="fadeIn first">
                    <img src="/images/logo.png" id="icon" alt="User Icon" className='w-25' />
                    <div className='m-5'>
                        {name} {family} -
                        <span className='m-2'>آراء شما</span>:
                    </div>
                    <div>
                        {candidas && candidas.map((candida) => {
                            return (
                                selection.includes(candida.id) ?
                                    <div className='m-2 d-flex justify-content-start'>
                                        <span className='h5 text-primary'>{candida.name} {candida.family}</span>
                                    </div>
                                    : null
                            )
                        })}
                    </div>
                </div>
                <div id="formFooter" className='d-flex justify-content-between'>
                    {!voted && <Button
                        className='btn btn-success'
                        onClick={submitHandler}
                    >
                        <i className='fas fa-arrow-right m-2'></i>
                        ثبت نهایی و خروج
                    </Button>}

                    {!voted && <Button
                        className='btn btn-warning'
                        onClick={() => navigate('/candidas/')}
                    >
                        بازگشت و ویرایش آراء
                        <i className='fas fa-arrow-left m-2'></i>
                    </Button>}
                    {voted && <div className='error'>
                        <Button
                            className='btn btn-danger'
                            onClick={clearState}
                        >
                            {msg} {error}<i className='fas fa-exclamation-triangle m-3'></i>
                        </Button>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default SubmitScreen