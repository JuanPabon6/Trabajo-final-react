import { useState } from 'react'
import { Router } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Rutas } from './Routes/Rutas'
import { Footer } from './components/Footer'
import { ToastContainer } from 'react-toastify'

function App() {

  return (
    <>
      {/* <Router> */}
        <main style={{ minHeight: "80vh" }}>
          <Rutas />
          <ToastContainer />
        </main>
        <Footer />
      {/* </Router> */}
    </>
  )
}

export default App
