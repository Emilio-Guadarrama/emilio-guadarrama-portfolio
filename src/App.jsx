import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BootScreen from './components/BootScreen'
import Cursor from './components/Cursor'
import Home from './pages/Home'
import FC2026 from './pages/FC2026'
import Satellite from './pages/Satellite'
import Ignitia from './pages/Ignitia'
import FRC from './pages/FRC'
import WGS from './pages/WGS'
import TECHO from './pages/TECHO'
import FIFAWC from './pages/FIFAWC'
import './App.css'

export default function App() {
  const [booted, setBooted] = useState(() => {
    // Only show boot screen once per session
    if (sessionStorage.getItem('booted')) return true
    return false
  })

  function handleBootDone() {
    sessionStorage.setItem('booted', '1')
    setBooted(true)
  }

  return (
    <>
      <Cursor />
      {!booted && <BootScreen onDone={handleBootDone} />}

      <div style={{
        display: 'flex', flexDirection: 'column', minHeight: '100vh',
        // Prevent scroll while boot screen is active
        overflow: booted ? 'unset' : 'hidden',
        maxHeight: booted ? 'unset' : '100vh',
      }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/"                    element={<Home />} />
            <Route path="/projects/fc-2026"    element={<FC2026 />} />
            <Route path="/projects/satellite"  element={<Satellite />} />
            <Route path="/projects/ignitia"    element={<Ignitia />} />
            <Route path="/projects/frc"        element={<FRC />} />
            <Route path="/projects/wgs"        element={<WGS />} />
            <Route path="/volunteering/techo"    element={<TECHO />} />
            <Route path="/volunteering/fifa-wc"  element={<FIFAWC />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  )
}
