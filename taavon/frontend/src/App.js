import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginScreen from './screens/users/LoginScreen'
import ConfirmScreen from './screens/users/ConfirmScreen'
import CandidaScreen from './screens/users/CandidaScreen'
import SubmitScreen from './screens/users/SubmitScreen'
import FinishScreen from './screens/users/FinishScreen'

import ReportAllZonesScreen from './screens/report/ReportAllZonesScreen'
import ReportCandidaScreen from './screens/report/ReportCandidaScreen'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/'  element={<LoginScreen />} exact />
        <Route path='/confirm/'  element={<ConfirmScreen />} />
        <Route path='/candidas/' element={<CandidaScreen />} />
        <Route path='/submit/' element={<SubmitScreen />} />
        <Route path='/finish/' element={<FinishScreen />} />
        
        <Route path='/reportall/' element={<ReportAllZonesScreen />} />
        <Route path='/report/candida/:id/'  element={<ReportCandidaScreen />} />
        <Route path='*' element={<LoginScreen />} />
      </Routes>
    </Router>
  )
}

export default App