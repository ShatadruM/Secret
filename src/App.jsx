import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import AllLabs from './pages/AllLabs'
import History from './pages/History'
import FireflyBackground from './pages/FireflyBackground'

function App() {
  return (
    <BrowserRouter>

    <FireflyBackground />
      <Routes>
        
        <Route path="/" element={<Home />} />
        
       
        <Route path="/alllabs" element={<AllLabs />} />
        <Route path="/history" element={<History />} />
        //<Route path="/test" element={<FireflyBackground />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App