import { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../assets/lyre-logo.svg'
import hamburgerIcon from '../assets/hamburger-menu.svg'
import WaveAnimation from './WaveAnimation';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false)
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
            hamburgerRef.current.focus();
        }
    };

    useEffect(() => {
        if (isOpen) {
            menuRef.current?.querySelector('a')?.focus();
        }
    }, [isOpen]);

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
                    <div
                        className="hamburger"
                        onClick={toggleMenu}
                        tabIndex="0"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                toggleMenu();
                            }
                        }}
                        ref={hamburgerRef}
                        aria-label="Menu"
                    >
                        <img src={hamburgerIcon} alt="Menu" />
                    </div>
                    <ul
                        className={isOpen ? 'nav-links open' : 'nav-links'}
                        ref={menuRef}
                        onKeyDown={handleKeyDown}
                    >
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
            </div>
        </header>
    );
}

export default Header;