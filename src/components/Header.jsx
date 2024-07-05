import { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../assets/lyre-logo.svg'
import hamburgerIcon from '../assets/hamburger-menu.svg'
import WaveAnimation from './WaveAnimation';
import note from '../assets/note.svg'
import rest from '../assets/rest.svg'

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const hamburgerRef = useRef(null);
    
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    const closeMenu = () => {
        setIsOpen(false);
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            closeMenu();
            hamburgerRef.current.focus(); //Closes menu when user clicks on link
        }
    };

    return (
        <header>
            <div className="header-wrapper">
                <div className="logo" >
                    <NavLink to="/">
                        <img src={logo} alt="Logo" />
                    </NavLink>
                    </div>
                        <nav className="main-nav">
                        <div className="desktop-nav">
                            <WaveAnimation />
                        </div>
                        <ul className={isOpen ? 'nav-links open' : 'nav-links'} ref={menuRef} onKeyDown={handleKeyDown}>
                            <li className="home">
                                <div className="image-container">
                                    <NavLink className="home-link" to='/' end onClick={closeMenu} ><img className="home-note" src={note} alt="Music note" /><p>Home</p></NavLink>
                                </div>
                            </li>
                            <li className="projects">
                                <div className="image-container">
                                    <NavLink className="rest-link" to='/projects' end onClick={closeMenu} ><img className="music-rest" src={rest} alt="Music half note rest" /><p>Projects</p></NavLink>
                                </div>
                            </li>
                            <li className="about">
                                <div className="image-container">
                                    <NavLink className="about-link" to='/about' end onClick={closeMenu} ><img className="about-note" src={note} alt="Music note" /><p>About</p></NavLink>
                                </div>
                            </li>
                        </ul>
                    <div className="hamburger" onClick={toggleMenu} tabIndex="0" onKeyDown={handleKeyDown} ref={hamburgerRef} aria-label="Menu">
                        <img src={hamburgerIcon} alt="Menu" />
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Header;