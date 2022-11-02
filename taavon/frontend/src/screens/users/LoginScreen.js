import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Col, Row, Button } from 'react-bootstrap'
import { loginAction } from '../../actions/actions'
import Loader from '../../components/Loader'

function LoginScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const userLoginInfo = useSelector(state => state.userLogin)
  const { loading, success, error, msg } = userLoginInfo

  const [prs, setPrs] = useState('');
  const [code, setCode] = useState('');
  const [mobile, setMobile] = useState('');
  const [hasError, setHasError] = useState(false)
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(loginAction({
      prs,
      code,
      mobile
    }))
  }

  useEffect(() => {
    if (success) {
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

              <div className='p-3'>
                <Row className='m-1'>
                  <Col sm={3} md={3} lg={3}>
                    <span>
                      شماره پرسنلی
                    </span>
                  </Col>
                  <Col sm={9} md={9} lg={9}>
                    <input
                      required
                      type="text"
                      id="login"
                      className="fadeIn second w-100 num-space"
                      name="login"
                      value={prs || ''}
                      onChange={(e) => setPrs(e.target.value.replace(/\D/g, ''))}
                    />
                  </Col>
                </Row>

                <Row className='m-1'>
                  <Col sm={3} md={3} lg={3}>
                    <span>
                      شماره ملی
                    </span>
                  </Col>
                  <Col sm={9} md={9} lg={9}>
                    <input
                      required
                      type="text"
                      id="password"
                      className="fadeIn third w-100 num-space"
                      name="login"
                      value={code || ''}
                      onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                    />
                  </Col>
                </Row>
                <Row className='m-1'>
                  <Col sm={3} md={3} lg={3}>
                    <span>
                      شماره موبایل
                    </span>
                  </Col>
                  <Col sm={9} md={9} lg={9}>
                    <input
                      required
                      type="text"
                      id="mobile"
                      className="fadeIn fourth w-100 num-space"
                      name="mobile"
                      value={mobile || ''}
                      onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                    />
                  </Col>
                </Row>
                <Row className='m-1'>
                  <Col sm={3} md={3} lg={3}>

                  </Col>
                  <Col sm={9} md={9} lg={9} className='d-flex justify-content-center'>
                    <Button
                      className='btn btn-info'
                      onClick={submitHandler}
                      disabled={prs.length !== 8 || code.length !== 10 || mobile.length !== 11}
                    >
                      ادامه <i className="fa fa-arrow-left"></i>
                    </Button>
                  </Col>
                </Row>
              </div>

              <div id="formFooter d-flex">
                {hasError ?
                  <span className='error'>{error}</span>
                  : null
                }
              </div>

              {prs.length !== 8 ?
              <div className='error d-flex'>
                شماره پرسنلی باید ۸ رقم باشد
              </div> : null}

              {code.length !== 10 ?
                <div className='error d-flex'>
                  شماره ملی باید ۱۰ رقم با صفر اول باشد
                </div> : null}

              {mobile.length !== 11 ?
                <div className='error d-flex'>
                  شماره موبایل باید ۱۱ رقم باشد و باصفر اول شروع شود
                </div> : null}

                {/* {!success ?
                <div className='error d-flex'>
                  {msg}
                </div> : null} */}
            </div>
          )
      }
    </div >
  )
}

export default LoginScreen