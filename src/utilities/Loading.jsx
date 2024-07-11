import React, { useState, useEffect } from 'react';
import loading from '../assets/loading.gif'

const Loading = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000); 

        return () => clearTimeout(timer);
    }, []);

    if (!isLoading) {
        return; 
    }

    // The css file is loading after the loading file. 
    // This is the reason for the in-line styling.
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#191c19',
        }}>
            <img 
                src={loading} 
                alt="Loading" 
                className="loading" 
                id="loading"
                style={{
                    display: 'block',
                    margin: 'auto'
                }}
            />
        </div>
    )
}

export default Loading