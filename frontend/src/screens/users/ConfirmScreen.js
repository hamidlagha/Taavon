import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { confirmAction } from '../../actions/actions'
import { CONFIRM_RESET } from '../../constants/Constants'
import Loader from '../../components/Loader'

function ConfirmScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const location = useLocation();
    const { pathname } = location;
    const mobile = pathname.split('/')[2]
    console.log(mobile)
    const [password, setPassword] = useState('');
    const [hasError, setHasError] = useState(false)

    const userConfirmInfo = useSelector(state => state.userConfirm)
    const { loading, success, error } = userConfirmInfo

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(confirmAction({
            mobile,
            password
        }))
    }

    useEffect(() => {
        if (success) {
            // dispatch({type: CONFIRM_RESET})
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
                                <img src="/images/logo.png" id="icon" alt="User Icon" />
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