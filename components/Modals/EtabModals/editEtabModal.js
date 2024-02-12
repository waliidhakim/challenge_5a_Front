import React, { useState } from 'react';
import styles from './editEtabModale.module.css';

const EditEtabModal = ({ etablissement, onClose, onSave }) => {

    const [etabInfos, setEtabInfos] = useState({
        name : etablissement.name,
        address : etablissement.address,  
        description : etablissement.description,
    });
    

    const handleSubmit = () => {
        onSave(etablissement['@id'], etabInfos );
        onClose();
    };

    const handleChange = (e) => {
        setEtabInfos({ ...etabInfos, [e.target.name]: e.target.value });
      };

    return (
        <>  
            <div className={styles.modalBackground} onClick={onClose}></div>
            <div className={styles.modal}>
                <h2>Modifier l'établissement</h2>
                <label>
                    Nom:
                    <input type="text"  name="name" value={etabInfos.name} onChange={handleChange} />
                </label>
                <label>
                    Description:
                    <textarea
                        name="description"
                        value={etabInfos.description}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Adresse:
                    <textarea
                        name="address"
                        value={etabInfos.address}
                        onChange={handleChange}
                    />
                </label>
    
                <div className={styles.buttonContainer}>
                    <button onClick={handleSubmit}>Enregistrer</button>
                    <button onClick={onClose}>Annuler</button>
                </div>
            </div>

            
        
        </>
        
    );
};



export default EditEtabModal;