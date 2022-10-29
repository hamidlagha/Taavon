import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import { confirmAction } from '../../actions/actions'
import Loader from '../../components/Loader'

function ConfirmScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [password, setPassword] = useState('');
    const [hasError, setHasError] = useState(false)

    const userLoginInfo = useSelector(state => state.userLogin)
    const { success: successLogin, id, mobile, name, family } = userLoginInfo

    const userConfirmInfo = useSelector(state => state.userConfirm)
    const { loading, success, error } = userConfirmInfo

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(confirmAction({
            mobile,
            password,
            id
        }))
    }

    useEffect(() => {
        if (!successLogin || !id || !mobile){
            console.log('redirecting to /')
            navigate('/')
        }

        if (success) {
            navigate(`/candidas/`)
        }
    }, [success])

    return (
        <div className="wrapper fadeInDown">
            {loading ?
                <Loader />
                : error && !hasError ?
                    setHasError(true)
                    : (
                        <div id="formContent">

                            <div className="fadeIn first">
                                <img src="/images/logo.png" id="icon" alt="User Icon" className='w-25'/>
                            </div>
                            <div className='m-3'>
                                همکار محترم
                                &nbsp;
                                {name} {family}
                                <br />
                                لطفا کد دریافتی را وارد نمایید
                            </div>
                            <Form>
                                <Form.Control
                                    required
                                    type="text"
                                    id="password"
                                    className="fadeIn second"
                                    name="login"
                                    placeholder="کد دریافت شده توسط پیامک"
                                    value={password || ''}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <input
                                    type="submit"
                                    className="fadeIn second btn"
                                    value="مرحله بعد"
                                    onClick={submitHandler}
                                    disabled={password.length < 6}
                                />
                            </Form>

                            <div id="formFooter">
                                {hasError ?
                                    <span className='error'>{error}</span>
                                    : null
                                }
                            </div>

                        </div>
                    )}
        </div>
    )
}

export default ConfirmScreen