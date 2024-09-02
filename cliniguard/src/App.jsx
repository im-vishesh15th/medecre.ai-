import { useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import VideoCallJoin from './pages/VideoCallJoin'
import VideoCall from './pages/VideoCall'
import DashBoard from './pages/DashBoard'
import Home from './pages/Home'
import './App.css'

function App() {
  

  return (
    <>
    <Routes>
    <Route path='/' element={<Home/>}></Route>
    <Route path='/dashboard' element={<DashBoard/>}></Route>
      <Route path='/call' element={<VideoCallJoin/>}></Route>
      <Route path='/call/:roomId' element={<VideoCall/>}></Route>
    </Routes> 
    </>
  )
}

export default App
