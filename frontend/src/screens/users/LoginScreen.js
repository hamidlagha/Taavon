import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import { loginAction } from '../../actions/actions'
import { LOGIN_RESET } from '../../constants/Constants'
import Loader from '../../components/Loader'

function LoginScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const userLoginInfo = useSelector(state => state.userLogin)
  const { loading, success, error, id } = userLoginInfo

  const [prs, setPrs] = useState('');
  const [code, setCode] = useState('');
  const [mobile, setMobile] = useState('');
  const [hasError, setHasError] = useState(false)
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(loginAction({
      prs,
      code,
      mobile,
      id
    }))
  }

  useEffect(() => {
    if (success){
      // dispatch({type: LOGIN_RESET})
      navigate(`/confirm/`)
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
                <img src="/images/logo.png" id="icon" alt="User Icon" className='w-25' />
              </div>

              <Form>
                <Form.Control
                  required
                  type="text"
                  id="login"
                  className="fadeIn second"
                  name="login"
                  placeholder="شماره پرسنلی"
                  value={prs || ''}
                  onChange={(e) => setPrs(e.target.value)}
                />
                <input
                  type="text"
                  id="password"
                  className="fadeIn third"
                  name="login"
                  placeholder="شماره ملی"
                  value={code || ''}
                  onChange={(e) => setCode(e.target.value)}
                />
                <input
                  type="text"
                  id="mobile"
                  className="fadeIn fourth"
                  name="mobile"
                  placeholder="موبایل"
                  value={mobile || ''}
                  onChange={(e) => setMobile(e.target.value)}
                />
                <input
                  type="submit"
                  className="fadeIn fourth btn"
                  value="مرحله بعد"
                  onClick={submitHandler}
                  disabled={!prs.length || !code.length}
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

export default LoginScreen