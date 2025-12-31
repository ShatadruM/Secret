import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import AllLabs from './pages/AllLabs'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route for the Home page */}
        <Route path="/" element={<Home />} />
        
        {/* Route for the AllLabs page */}
        <Route path="/alllabs" element={<AllLabs />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App