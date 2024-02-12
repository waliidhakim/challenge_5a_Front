import React from 'react';
import styles from './etabDetailsModal.module.css'; 
import {extractId} from '../../../src/app/lib/utils';

const EtabDetailsModal = ({ etablissement, onClose }) => {
    return (
        <>

            <div className={styles.modalBackground} onClick={onClose}></div>
            <div className={styles.modal}>
                <h2>Détails de l'établissement</h2>
                <p><strong>ID: </strong> { extractId(etablissement['@id']) }</p>
                <p><strong>Nom: </strong> {etablissement.name}</p>
                <p><strong>Adresse: </strong> {etablissement.address}</p>
                <p><strong>Description: </strong> {etablissement.description}</p>
                <p><strong>Appartient au prestataire: </strong> {etablissement.relateTo.name}</p>
                <p><strong>Responsable: </strong> {etablissement.manager.firstname} {etablissement.manager.lastname }</p>
                <p><strong>Email du Responsable: </strong> {etablissement.manager.email }</p>
                <button onClick={onClose}>Fermer</button>
            </div>

        </>
    );
};


export default EtabDetailsModal;