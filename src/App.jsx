import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import AllLabs from './pages/AllLabs'
import History from './pages/History'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route for the Home page */}
        <Route path="/" element={<Home />} />
        
       
        <Route path="/alllabs" element={<AllLabs />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App