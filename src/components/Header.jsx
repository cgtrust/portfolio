import { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import WaveAnimation from './WaveAnimation';
import { restBase } from '../utilities/Utilities';

const Header = () => {
    const restPath = restBase + '/pages/12?acf_format=standard&_embed'
    const [isOpen, setIsOpen] = useState(false);
    const [logoUrl, setLogoUrl] = useState(null);
    const [hamburgerIconUrl, setHamburgerIconUrl] = useState(null);
    const [backgroundNoteUrl, setBackgroundNoteUrl] = useState(null);
    const [backgroundRestUrl, setBackgroundRestUrl] = useState(null);
    const menuRef = useRef(null);
    const hamburgerRef = useRef(null);

    useEffect(() => {
        const fetchAssets = async () => {
            try {
                const response = await fetch(restPath);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();

                // Check if data contains the fields you expect
                if (data.acf) {
                    // Fetch logo URL
                    if (data.acf.logo) {
                        const logoUrl = data.acf.logo.url;
                        setLogoUrl(logoUrl);
                    } else {
                        console.error('Logo field not found in response');
                    }

                    // Fetch hamburger menu icon URL
                    if (data.acf.hamburger_menu) {
                        const hamburgerIconUrl = data.acf.hamburger_menu.url;
                        setHamburgerIconUrl(hamburgerIconUrl);
                    } else {
                        console.error('Hamburger menu field not found in response');
                    }

                    // Fetch background note URL
                    if (data.acf.background_note) {
                        const backgroundNoteUrl = data.acf.background_note.url;
                        setBackgroundNoteUrl(backgroundNoteUrl);
                    } else {
                        console.error('Background note field not found in response');
                    }

                    // Fetch background rest URL
                    if (data.acf.background_rest) {
                        const backgroundRestUrl = data.acf.background_rest.url;
                        setBackgroundRestUrl(backgroundRestUrl);
                    } else {
                        console.error('Background rest field not found in response');
                    }
                } else {
                    console.error('ACF fields not found in response');
                }
            } catch (error) {
                console.error('Error fetching assets:', error);
            }
        };

        fetchAssets();
    }, [restPath]);
    
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
                        {logoUrl && <img src={logoUrl} alt="Logo" />}
                    </NavLink>
                    </div>
                        <nav className="main-nav">
                        <div className="desktop-nav">
                            <WaveAnimation />
                        </div>
                        <ul className={isOpen ? 'nav-links open' : 'nav-links'} ref={menuRef} onKeyDown={handleKeyDown}>
                            <li className="home">
                                <div className="image-container">
                                    <NavLink className="home-link" to='/' end onClick={closeMenu} ><img className="home-note" src={backgroundNoteUrl} alt="Music note" /><p>Home</p></NavLink>
                                </div>
                            </li>
                            <li className="projects">
                                <div className="image-container">
                                    <NavLink className="rest-link" to='/projects' end onClick={closeMenu} ><img className="music-rest" src={backgroundRestUrl} alt="Music half note rest" /><p>Projects</p></NavLink>
                                </div>
                            </li>
                            <li className="about">
                                <div className="image-container">
                                    <NavLink className="about-link" to='/about' end onClick={closeMenu} ><img className="about-note" src={backgroundNoteUrl} alt="Music note" /><p>About</p></NavLink>
                                </div>
                            </li>
                        </ul>
                    <div className="hamburger" onClick={toggleMenu} tabIndex="0" onKeyDown={handleKeyDown} ref={hamburgerRef} aria-label="Menu">
                        {hamburgerIconUrl && <img src={hamburgerIconUrl} alt="Menu" />}
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Header;