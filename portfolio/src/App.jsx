import React from 'react'
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import NavBar from './components/navbar';
import Hero from './components/hero'
import About from './components/about'
import Projects from './components/projects'
import Contact from './components/contact'
import Footer from './components/footer'

function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <About />
              <Projects />
              <Contact />
            </>
          }
        />

        <Route
          path="/explore"
          element={
            <>
              <About />
              <Projects />
              <Contact />
            </>
          }
        />

        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App
