import { Route, Routes, NavLink } from 'react-router-dom'
import Home from './components/Home'
import './App.css'

function App() {

  return (
    <>
      <header>
        <nav>
          <ul>
            <li><NavLink to ='/' end>Home</NavLink></li>
          </ul>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </main>
    </>
  )
}

export default App
