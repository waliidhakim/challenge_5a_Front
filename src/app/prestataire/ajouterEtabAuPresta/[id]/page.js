// src/app/pages/prestataire/become_prestataire/page.js
import React from 'react';
import EtabRegisterComponent from '../../../../../components/EtabRegister/etabRegister';

const Page = ({params}) => {


    const prestataireId = params.id ; 
    return (
        <div>
            <h1>Ajouter un établissement au prestataire d'ID {prestataireId}</h1>
            <EtabRegisterComponent idPresta={prestataireId}></EtabRegisterComponent>
        </div>
    );
};

export default Page;