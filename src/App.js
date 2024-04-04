import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import MainPage from './pages/MainPage/MainPage'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route index element={<Login />} />
        <Route path="/mainPage" element={<MainPage />} />
        <Route path="/signUp" element={<SignUp/>} />
      </Routes>
    </BrowserRouter>
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