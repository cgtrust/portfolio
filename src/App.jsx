import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import Projects from './components/Projects'
import About from './components/About'
import Single from './components/Single'
import MusicNotesCanvas from './components/MusicNotesCanvas'
import Footer from './components/Footer'
import './sass/styles.scss'

function App() {

  return (
    <>
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
