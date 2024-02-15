// src/app/pages/prestataire/become_prestataire/page.js
import React from 'react';
import PrestataireRegister from '../../../../components/PrestataireRegister/prestataireRegister';
import Navbar from '../../../../components/NavBar/Navbar';
import styles from './prestaToBe.css'

const BecomePrestatairePage = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className={styles.pagePresta}>
            <PrestataireRegister />
        </div>
        </div>
    );
};

export default BecomePrestatairePage;

