import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import Sidebar from './Components/Sidebar/Sidebar'
// import Dashboard from './pages/Dashboard/Dashboard'
// import Rooms from './pages/Rooms/Rooms'
// import Beds from './pages/Beds/Beds'
// import Rent from './pages/Rent'
// import Tenants from './pages/Tenants'
// import Expenses from './pages/Expenses'
// import Settings from './pages/Settings'
import './App.css'
import MainPage from './pages/MainPage/MainPage'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/mainPage" element={<MainPage />} />
        <Route path="/" element={<Login />} />
        <Route path="/signUp" element={<SignUp/>} />

        {/* <Route path="/rooms" element={<Rooms/>} />
        <Route path="/beds" element={<Beds/>} />
        <Route path="/rent" element={<Rent/>} />
        <Route path="/tenants" element={<Tenants/>} />
        <Route path="/expenses" element={<Expenses/>} />
        <Route path="/settings" element={<Settings/>} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App