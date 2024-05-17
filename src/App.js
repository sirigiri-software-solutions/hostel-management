import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import MainPage from './pages/MainPage/MainPage'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'
import { ToastContainer } from 'react-toastify'
import { FetchData } from './ApiData/FetchData' 
import { DataProvider } from './ApiData/ContextProvider'
import ProtectedRoute from './ProtectedRoute'


const App = () => {

  return (
    <div style={{fontSize:"16px"}}>
    <BrowserRouter >
      <DataProvider>
        <ToastContainer />
        <Routes>
          <Route index element={<Login />} />
          <Route path="/mainPage" element={
            <div style={{fontSize:"16px !important"}}>
            <ProtectedRoute >
              <MainPage />
            </ProtectedRoute></div>} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
      </DataProvider>
    </BrowserRouter>
    
    </div>
  )
}
export default App

// import React from 'react'
// import data from './data.json'
// console.log(data)

// const App = () => {
//   return (
//     <div>
//       {data.map(item => (
//         <div key={item.command}>
//           <h2>{item.command}</h2>
//           <p>{item.text}</p>
//         </div>
//       ))}
//     </div>
//   )
// }

// export default App