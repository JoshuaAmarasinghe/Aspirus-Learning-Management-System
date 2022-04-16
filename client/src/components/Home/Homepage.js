import React from 'react';
import Slider from "./Slider/Slider";
import About from "./About/About";
import Services from "./Services/Services";

function Homepage() {

    return (
        <div className="container">
            <Slider/>
            <About/>
            <Services/>
        </div>
    )
}

export default Homepage