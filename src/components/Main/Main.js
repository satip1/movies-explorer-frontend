import React from 'react';

import Promo from '../Promo/Promo'
import NavTab from '../NavTab/NavTab'
import AboutProject from '../AboutProject/AboutProject'
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Footer from '../Footer/Footer';

function Main() {
    return (
        <div className="page">
        <Promo />
        <NavTab />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
        <Footer />
      </div>
    )
}

export default Main;




