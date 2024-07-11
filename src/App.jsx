import { Route, Routes } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
// Components
import Header from './components/Header'
import Home from './components/Home'
import Projects from './components/Projects'
import About from './components/About'
import Single from './components/Single'
import MusicNotesCanvas from './components/MusicNotesCanvas'
import SkipToContent from './components/SkipToContent';
import Footer from './components/Footer'
import Loading from './utilities/Loading';
// Styling
import './sass/styles.scss'

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust the timeout as needed

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <SkipToContent />
      <MusicNotesCanvas />
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/projects/:slug' element={<Single />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
