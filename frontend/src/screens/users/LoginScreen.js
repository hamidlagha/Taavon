import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { loginAction } from '../../actions/actions'
import Loader from '../../components/Loader'
function LoginScreen() {
  const dispatch = useDispatch();

  const userLoginInfo = useSelector(state => state.userLogin)
  const {loading, success, error, member, candidas} = userLoginInfo

  const [prs, setPrs] = useState('');
  const [code, setCode] = useState('');

  const submitHandler = (e) =>{
    e.preventDefault()
    dispatch(loginAction({
      prs,
      code
    }))
  }

  return (

    <div className="wrapper fadeInDown">
      <Loader />
      <div id="formContent">

        <div className="fadeIn first">
          <img src="/images/logo.png" id="icon" alt="User Icon" />
        </div>

        <Form>
          <Form.Control
            required
            type="text"
            id="login" 
            className="fadeIn second" 
            name="login" 
            placeholder="شماره رسنلی"
            value= {prs || ''}
            onChange={(e) => setPrs(e.target.value)}
            />
          <input 
            type="text" 
            id="password" 
            className="fadeIn third" 
            name="login" 
            placeholder="شماره ملی" 
            value= {code || ''}
            onChange={(e) => setCode(e.target.value)}            
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
          <a className="underlineHover" href="#">فراموش کرده ام</a>
        </div>

      </div>
    </div>
  )
}

export default LoginScreen