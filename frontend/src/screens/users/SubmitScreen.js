import React, { useEffect } from 'react'
import { Button, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Form, useNavigate } from 'react-router-dom'
import { submitAction } from '../../actions/actions'

function SubmitScreen() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const selectionInfo = useSelector(state => state.selectionList)
    const { selection } = selectionInfo

    const userLoginInfo = useSelector(state => state.userLogin)
    const { id, mobile, name, family } = userLoginInfo

    const userConfirmInfo = useSelector(state => state.userConfirm)
    const { candidas } = userConfirmInfo

    const userSubmitInfo = useSelector(state => state.userSubmit)
    const { success } = userSubmitInfo

    useEffect(() => {
        if (!selection || !id) {
            navigate('/')
        }
        if(success){
            navigate('/finish/')
        }
    }, [success])

    const submitHandler = () => {
        dispatch(submitAction({
            id,
            selection
        }))
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
                    <Button
                        className='btn btn-success'
                        onClick={submitHandler}
                    > ثبت نهایی و خروج</Button>

                    <Button
                        className='btn btn-warning'
                        onClick={() => navigate('/candidas/')}
                    >
                        بازگشت و ویرایش آراء
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default SubmitScreen