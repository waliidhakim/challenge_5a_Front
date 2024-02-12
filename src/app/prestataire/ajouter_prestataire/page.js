// src/app/pages/prestataire/become_prestataire/page.js
import React from 'react';
import PrestataireRegister from '../../../../components/PrestataireRegister/prestataireRegister';
import Navbar from '../../../../components/NavBar/Navbar';

const BecomePrestatairePage = () => {
    return (
        <div>
            <Navbar></Navbar>
            <h1>Devenir Prestataire</h1>
            <PrestataireRegister />
        </div>
    );
};

export default BecomePrestatairePage;

