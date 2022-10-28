import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Row } from 'react-bootstrap'
import Header from './components/Header'
import LoginScreen from './screens/users/LoginScreen'
import ConfirmScreen from './screens/users/ConfirmScreen'
import CandidaScreen from './screens/users/CandidaScreen'

function App() {
  return (
    <Router>
      <Row>
        <Header />
      </Row>
      <Routes>
        <Route path='/'  element={<LoginScreen />} exact />
        <Route path='/confirm/'  element={<ConfirmScreen />} />
        <Route path='/candidas/' element={<CandidaScreen />} />
        <Route path='*' element={<LoginScreen />} />
      </Routes>
    </Router>
  )
}

export default App