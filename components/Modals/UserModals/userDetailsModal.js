import React from 'react';
import styles from './userDetailsModal.module.css'; 
import {extractId} from '../../../src/app/lib/utils';

const UserDetailsModal = ({ user, onClose }) => {
    return (
        <>

            <div className={styles.modalBackground} onClick={onClose}></div>
            <div className={styles.modal}>
                <h2>Détails de l'Utilisateur</h2>
                <p><strong>ID:</strong> { extractId(user['@id']) }</p>
                <p><strong>Prénom:</strong> {user.firstname}</p>
                <p><strong>Nom:</strong> {user.lastname}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <button onClick={onClose}>Fermer</button>
            </div>

        </>
    );
};


export default UserDetailsModal;