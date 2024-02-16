// src/app/pages/prestataire/become_prestataire/page.js
import React from 'react';
import EtabRegisterComponent from '../../../../../components/EtabRegister/etabRegister';
import Navbar from '../../../../../components/NavBar/Navbar';

const Page = ({params}) => {


    const prestataireId = params.id ; 
    return (
        <div>
            <Navbar></Navbar>
            <h1>Ajouter un établissement au prestataire d'ID {prestataireId}</h1>
            <EtabRegisterComponent idPresta={prestataireId}></EtabRegisterComponent>
        </div>
    );
};

export default Page;