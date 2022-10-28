import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Row } from 'react-bootstrap'
import Header from './components/Header'
import LoginScreen from './screens/users/LoginScreen'
import ConfirmScreen from './screens/users/ConfirmScreen'

function App() {
  return (
    <Router>
      <Row>
        <Header />
      </Row>
      <Routes>
        <Route path='/'  element={<LoginScreen />} exact />
        <Route path='/confirm/:mobile/'  element={<ConfirmScreen />} />
      </Routes>
    </Router>
  )
}

export default App