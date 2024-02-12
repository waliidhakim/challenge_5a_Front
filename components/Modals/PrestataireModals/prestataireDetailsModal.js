import React , { useState } from 'react';
import styles from './pretataireDetailsModal.module.css'; 
import {extractId} from '../../../src/app/lib/utils';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppContext } from '../../contextTest2/context';

const PrestataireDetailsModal = ({ prestataire, onClose }) => {
    const router = useRouter();  
    const [isLoading, setIsLoading] = useState(false);

    const context = useAppContext();


    const {user} = context;

    const handleAction = async (action) => {
        setIsLoading(true);
        const prestataireId = extractId(prestataire['@id']);
        const token = localStorage.getItem('jwtToken');
        const endpoint = action === 'approve' ? 'approve' : 'reject';
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/prestataires/${prestataireId}/${endpoint}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/ld+json',
                Authorization: token ? `Bearer ${token}` : '',
                'Content-Type': 'application/ld+json',
            },
            body: JSON.stringify({})
        });

        if (response.ok) {
            setIsLoading(false); 
            toast.success("Opération réussie.",{autoClose: 1000});
            setTimeout(() => {
                onClose();
                window.location.href = '/admin';
            }, 1000); 
            router.push('/admin');
        } else {
            // Gérez l'erreur ici
            console.error("Erreur lors de l'opération");
            setIsLoading(false); 
            toast.error("Une erreur est survenue. Veuillez réessayer.");
        }
    };
    return (
        <>
            <ToastContainer />
            <div className={styles.modalBackground} onClick={onClose}></div>
            <div className={styles.modal}>
                <h2>Détails du prestataire</h2>
                <p><strong>ID: </strong> { extractId(prestataire['@id']) }</p>
                <p><strong>Nom: </strong> {prestataire.name}</p>
                <p><strong>Description: </strong> {prestataire.description}</p>
                <p><strong>Adresse: </strong> {prestataire.address}</p>
                <p><strong>Contact email: </strong> {prestataire.contactInfos}</p>
                <p><strong>Numéro kbis: </strong> {prestataire.kbis}</p>
                <p><strong>Secteur d'activité: </strong> {prestataire.sector}</p>
                <p><strong>Statut de la demande d'approbation : </strong> {prestataire.status}</p>
                <p><strong>Propriétaire : </strong> {prestataire.owner.firstname} {prestataire.owner.lastname} </p>
                <button onClick={onClose}>Fermer</button>
                {prestataire.status === 'waiting for approval' & user.role == "ROLE_ADMIN" ?
                    
                <>
                    <button onClick={() => handleAction('approve')}>Approuver</button>
                    <button onClick={() => handleAction('reject')}>Rejeter</button>
                </> : ''
                }
                {isLoading && <div>Chargement...</div> }
            </div>

        </>
    );
};


export default PrestataireDetailsModal;