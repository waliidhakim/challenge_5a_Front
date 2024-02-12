import React, { useState } from 'react';
import styles from './editUserModale.module.css';

const EditUserModal = ({ user, onClose, onSave }) => {
    const [firstname, setFirstname] = useState(user.firstname);
    const [lastname, setLastname] = useState(user.lastname);

    const handleSubmit = () => {
        onSave(user['@id'], { firstname, lastname });
        onClose();
    };

    return (
        <>  
            <div className={styles.modalBackground} onClick={onClose}></div>
            <div className={styles.modal}>
                <h2>Modifier l'Utilisateur</h2>
                <label>
                    Prénom:
                    <input type="text" value={firstname} onChange={e => setFirstname(e.target.value)} />
                </label>
                <label>
                    Nom:
                    <input type="text" value={lastname} onChange={e => setLastname(e.target.value)} />
                </label>
                <button onClick={handleSubmit}>Enregistrer</button>
                <button onClick={onClose}>Annuler</button>
            </div>
        
        </>
        
    );
};



export default EditUserModal;