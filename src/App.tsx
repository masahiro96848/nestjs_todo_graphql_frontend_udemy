import './App.css'
import { Signin } from './components/Signin'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './components/Signup'
import { Main } from './components/Main'
import { NotFound } from './components/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Main />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
