import React from "react";
import '../App.css';
import HeroSection from '../Comp_homepage/HeroSection';
import NarBav from '../Comp_homepage/Navbar'

function Home(){
    return(
        <>
            <NarBav/>
            <HeroSection/>
        </>
    )
}

export default Home;
