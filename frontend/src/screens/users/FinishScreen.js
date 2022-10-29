import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { LOGIN_RESET, CONFIRM_RESET, SUBMIT_RESET } from '../../constants/Constants'

function FinishScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        
        dispatch({ type: LOGIN_RESET })
        dispatch({ type: CONFIRM_RESET })
        dispatch({ type: SUBMIT_RESET })
    }, [])

    return (
        <div className="wrapper fadeInDown ">
            <div id="formContent">
                <div className="fadeIn first">
                    <img src="/images/logo.png" id="icon" alt="User Icon" className='w-25' />
                    <div className='m-5 h2'>
                        همکار گرامی
                    </div>
                    <div className='h3'>از شرکت شما در  این انتخابات متشکریم</div>
                </div>
                <div id="formFooter">
                    <div>اداره تعاون اداره کل آموزش و \رورش خراسان رضوی</div>
                    <Button className='btn btn-secondary m-5'
                    onClick={() => navigate('/')}
                    >
                        بازگشت به صفحه اول</Button>
                </div>
            </div>
        </div>)
}

export default FinishScreen