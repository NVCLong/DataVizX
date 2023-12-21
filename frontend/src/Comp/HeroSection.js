import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';
import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <div className='hero-container'>
      <h1>DataVizX</h1>
      <p>Transform your Data into Insights</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick={console.log('hey')}
        >
         <Link to="/login">
           SIGN IN NOW <i className="fas fa-sign-in-alt" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
