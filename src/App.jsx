import { useState, lazy, Suspense } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BootScreen from './components/BootScreen'
import Cursor from './components/Cursor'
import ScrollManager from './components/ScrollManager'
import Home from './pages/Home'
// Subpages load on demand so the first visit only downloads Home
const IGNIS     = lazy(() => import('./pages/IGNIS'))
const Satellite = lazy(() => import('./pages/Satellite'))
const Ignitia   = lazy(() => import('./pages/Ignitia'))
const FRC       = lazy(() => import('./pages/FRC'))
const WGS       = lazy(() => import('./pages/WGS'))
const TECHO     = lazy(() => import('./pages/TECHO'))
const FIFAWC    = lazy(() => import('./pages/FIFAWC'))
const NotFound  = lazy(() => import('./pages/NotFound'))
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
          <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
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
            <Route path="*"                      element={<NotFound />} />
          </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </>
  )
}
