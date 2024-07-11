import { useState, useEffect } from 'react';
import { restBase } from '../utilities/Utilities';
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
    const [linkedInUrl, setLinkedinUrl] = useState('')
    const restPath = restBase + '/pages/12?acf_format=standard&_embed'
    
    useEffect(() => {
        const fetchLinkedInUrl = async () => {
            try {
                const response = await fetch(restPath);
                if (response.ok) {
                    const data = await response.json();
                    if (data.acf && data.acf.linkedin_profile) {
                        setLinkedinUrl(data.acf.linkedin_profile);
                    }
                } else {
                    console.error('Failed to fetch LinkedIn URL', response.statusText)
                }
            } catch (error) {
                console.error('Error fetching LinkedIn URL:', error);
            }
        };

        fetchLinkedInUrl();
    }, [restPath]);

    return (
        <footer className="footer">
            <a href={linkedInUrl} target="_blank" rel="noopener noreferrer">
                <FaLinkedin style={{ color: "#f9f7f3" }} />
            </a>
            <p>&copy; 2024</p>
        </footer>
    );
};

export default Footer;