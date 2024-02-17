
import React from 'react';
import AddPrestationComponent from '../../../../../components/AddPrestation/AddPrestationComponent';
import Navbar from '../../../../../components/NavBar/Navbar';


const Page = ({params}) => {


    const etabId = params.idEtab ; 
    return (
        <div>
            <Navbar></Navbar>
            <h1>Ajouter  une prestation à l'établissement d'ID {etabId}</h1>
            <AddPrestationComponent idEtab={etabId}></AddPrestationComponent>
        </div>
    );
};

export default Page;