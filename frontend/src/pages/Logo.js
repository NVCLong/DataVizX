import React from 'react';
import logoMain from '../images/DataVizX.png';

const Logo = () => {
  return (
    <div className="flex flex-row">
        <div className="py-8">
                <img
                    alt="DataVizX Logo"
                    className="h-20 w-20"
                    src={logoMain}/>
        </div>

        <h1 className="text-10xl font-black text-white text-center">DataVizX</h1>

    </div>

  );
};

export default Logo;
