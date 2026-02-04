import './App.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { LoginPage } from './pages/Login/LoginPage'
import { RegistrationPage } from './pages/Registration/RegistrationPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
