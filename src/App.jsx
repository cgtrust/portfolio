import { Route, Routes, NavLink, Router } from 'react-router-dom'
import Home from './components/Home'
import Projects from './components/Projects'
import About from './components/About'
import Single from './components/Single'
import './sass/styles.scss'

function App() {

  return (
    <>
      <header>
        <nav>
          <ul>
            <NavLink to='/' end>Home</NavLink>
            <NavLink to='/projects' end>Projects</NavLink>
            <NavLink to='/about' end>About</NavLink>
          </ul>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/projects/:slug' element={<Single />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </main>
    </>
  )
}

export default App
