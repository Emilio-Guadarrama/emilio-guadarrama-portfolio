import { useState } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BootScreen from './components/BootScreen'
import Cursor from './components/Cursor'
import ScrollManager from './components/ScrollManager'
import Home from './pages/Home'
import IGNIS from './pages/IGNIS'
import Satellite from './pages/Satellite'
import Ignitia from './pages/Ignitia'
import FRC from './pages/FRC'
import WGS from './pages/WGS'
import TECHO from './pages/TECHO'
import FIFAWC from './pages/FIFAWC'
import './App.css'

export default function App() {
  const { pathname } = useLocation()
  // Boot screen: only on the IGNIS page, once per session, and never for
  // visitors who ask the system to reduce motion
  const [seen, setSeen] = useState(() =>
    !!sessionStorage.getItem('booted') ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
  const booted = seen || pathname !== '/projects/ignis'

  function handleBootDone() {
    sessionStorage.setItem('booted', '1')
    setSeen(true)
  }

  return (
    <>
      <ScrollManager />
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
            <Route path="/projects/ignis"      element={<IGNIS />} />
            <Route path="/projects/fc-2026"    element={<Navigate to="/projects/ignis" replace />} />
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
