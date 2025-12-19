import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import './App.css'
import Dashboard from './Dashboard/Dashboard'
import Prompt from './Prompt/Prompt'
import History from './History/History'
import { ToastContainer } from 'react-toastify';


function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Dashboard/>} />
      <Route path='/prompt' element={<Prompt/>} />
      <Route path='/history' element={<History/>} />
    </Routes>
      <ToastContainer position="top-center" />
      
    </>
  )
}

export default App
