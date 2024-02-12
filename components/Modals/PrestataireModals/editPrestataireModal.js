import React, { useState } from 'react';
import styles from './editPrestaModale.module.css';

const EditPrestataireModal = ({ prestataire, onClose, onSave }) => {

    const [prestataireInfos, setPretataireInfos] = useState({
        name : prestataire.name,
        address : prestataire.address,  
        description : prestataire.description,
        contactInfos : prestataire.contactInfos,
        sector : prestataire.sector,
        kbis : prestataire.kbis,
        status : prestataire.status
    });
    

    const handleSubmit = () => {
        onSave(prestataire['@id'], prestataireInfos );
        onClose();
    };

    const handleChange = (e) => {
        //console.log(e);
        setPretataireInfos({ ...prestataireInfos, [e.target.name]: e.target.value });
      };

    return (
        <>  
            <div className={styles.modalBackground} onClick={onClose}></div>
            <div className={styles.modal}>
                <h2>Modifier le prestataire</h2>
                <label>
                    Nom:
                    <input type="text"  name="name" value={prestataireInfos.name} onChange={handleChange} />
                </label>
                <label>
                    Description:
                    <textarea
                        name="description"
                        value={prestataireInfos.description}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Adresse:
                    <textarea
                        name="address"
                        value={prestataireInfos.address}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Infos Contact:
                    <input type="text" name="contactInfos" value={prestataireInfos.contactInfos} onChange={handleChange} />
                </label>
                <label>
                    Secteur d'activité:
                    <input type="text" name="sector" value={prestataireInfos.sector} onChange={handleChange} />
                </label>
                <label>
                    Numéro Kbis:
                    <input type="text" name="kbis" value={prestataireInfos.kbis} onChange={handleChange} />
                </label>
                <label>
                    Statut de la demande d'approbation:
                    <input type="text" name="status" value={prestataireInfos.status} onChange={handleChange} />
                </label>
                <div className={styles.buttonContainer}>
                    <button onClick={handleSubmit}>Enregistrer</button>
                    <button onClick={onClose}>Annuler</button>
                </div>
            </div>

            
        
        </>
        
    );
};



export default EditPrestataireModal;