import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Register from './Pages/Register'
import Login from './Pages/Login'
import MainPage from './Pages/MainPage'
import "react-toastify/dist/ReactToastify.css"

export default function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route exact path="/register" element={<Register/>}/>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/" element={<MainPage/>}/>
        </Routes>
    </BrowserRouter>
  )
}
