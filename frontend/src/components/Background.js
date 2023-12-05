import React from 'react';
import MyBackgroundImage from './BG_main.png';

const Background = ({ children }) => {
    return (
        <div
            style={{
                backgroundImage: `url(${MyBackgroundImage})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                width: '100%',
                height: '100vh',
            }}
        >
            {children}
        </div>
    );
};

export default Background;
