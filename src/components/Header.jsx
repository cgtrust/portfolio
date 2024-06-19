import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../assets/lyre-logo.svg'
import hamburgerIcon from '../assets/hamburger-menu.svg'

const Header = () => {
    const [isOpen, setIsOpen] = useState(false)
    
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    const closeMenu = () => {
        setIsOpen(false);
    }

    return (
        <header>
            <div className="logo" >
                <NavLink to="/">
                    <img src={logo} alt="Logo" />
                </NavLink>
            </div>
            <nav className="main-nav">
                <div className ="hamburger" onClick={toggleMenu} >
                    <img src={hamburgerIcon} alt="Menu" />
                </div>
                <ul className={isOpen ? 'nav-links open' : 'nav-links'} >
                    <li>
                        <NavLink to='/' end onClick={closeMenu} >Home</NavLink>
                    </li>
                    <li>
                        <NavLink to='/projects' end onClick={closeMenu} >Projects</NavLink>
                    </li>
                    <li>
                        <NavLink to='/about' end onClick={closeMenu} >About</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;