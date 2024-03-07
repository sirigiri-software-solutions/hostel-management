import React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Sidebar from './components/Sidebar/Sidebar'
// import Dashboard from './pages/Dashboard/Dashboard'
// import Rooms from './pages/Rooms/Rooms'
// import Beds from './pages/Beds/Beds'
// import Rent from './pages/Rent'
// import Tenants from './pages/Tenants'
// import Expenses from './pages/Expenses'
// import Settings from './pages/Settings'
import './App.css'

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Sidebar />} />
        
        {/* <Route path="/rooms" element={<Rooms/>} />
        <Route path="/beds" element={<Beds/>} />
        <Route path="/rent" element={<Rent/>} />
        <Route path="/tenants" element={<Tenants/>} />
        <Route path="/expenses" element={<Expenses/>} />
        <Route path="/settings" element={<Settings/>} /> */}
      </Routes>
    </HashRouter>
  )
}

export default App