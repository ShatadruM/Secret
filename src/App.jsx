import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { ReactLenis } from 'lenis/react'
import Home from './pages/Home'
import AllLabs from './pages/AllLabs'
import History from './pages/History'
import FireflyBackground from './pages/FireflyBackground'
import Tesla from './pages/Tesla'
import Test from './pages/Test'

function App() {
  return (
    <BrowserRouter>
  <ReactLenis root options={{
    lerp: 0.05, 
  }}>
    <FireflyBackground />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/alllabs" element={<AllLabs />} />
        <Route path="/history" element={<History />} />
        <Route path="/test" element={<Test />} />
        <Route path="/tesla" element={<Tesla />} />

      </Routes>
      </ReactLenis>
    </BrowserRouter>
  )
}

export default App