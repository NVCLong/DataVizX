import React from 'react';
import logoMain from '../images/DataVizX.png';

const Logo = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center drop-shadow-lg">
        <div className="py-6 px-5 ">
                <img
                    alt="DataVizX Logo"
                    className="h-24 w-24"
                    src={logoMain}/>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-10xl font-black text-white text-center">DataVizX</h1>

    </div>

  );
};

export default Logo;
