import './App.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { LoginPage } from './pages/Login/LoginPage'
import { RegistrationPage } from './pages/Registration/RegistrationPage'
import { AccountPage } from './pages/Account/AccountPage'
import Layout from './components/layout/Layout'
import { SchedulePage } from './pages/Schedule/SchedulePage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route index path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route element={<Layout/>}>
          <Route path='/account' element={<AccountPage />}/>
          <Route path='/calendar' element={<SchedulePage />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
