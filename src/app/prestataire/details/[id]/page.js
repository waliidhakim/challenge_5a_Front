"use client"

import React, { useState, useEffect } from 'react';
import fetchData from '../../../lib/fetchData';
import {extractId, extractRole} from '../../../lib/utils';
import { useRouter } from 'next/navigation';
import Navbar from '../../../../../components/NavBar/Navbar';
import CreateUserModal from '../../../../../components/Modals/UserModals/createUserModal';
import AssignMangerModal from '../../../../../components/Modals/AssignManagerModal/assignManagerModal';

export default function PrestatairePage({params}) {

  const router = useRouter();

  const prestataireId = params.id ; 
  const [prestataire, setPrestataire] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [etabToAssignManager, setEtabToAssignManager] = useState(null);

  const fetchPrestaData = async () => {
    setLoading(true);
    try {
      // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/prestataires/${prestataireId}`);
      const data = await fetchData(`${process.env.NEXT_PUBLIC_API_URL}/prestataires/${prestataireId}`);
      console.log("Data after petch",data)
      setPrestataire(data);
    } catch (error) {
      console.error('Error fetching prestataire:', error);
      setError('Une erreur est survenue lors de la récupération des données.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrestaData();
  }, [prestataireId]);

  const handleAddEtabClick = () => {
    router.push(`/prestataire/ajouterEtabAuPresta/${prestataireId}`);
  };

  const handleEtabDetailsClick = (etabId) => {
    router.push(`/etablissement/${etabId}/details`);
  };


  const handleOpenModal = (etabId) => {
    setEtabToAssignManager(etabId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAssignManagerSubmit = async () => {

    setIsModalOpen(false);
    //await fetchUsers();
    fetchPrestaData();
};

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error}</div>;
  if (!prestataire) return <div>Aucun prestataire trouvé.</div>;

  return (
    <>
      <Navbar></Navbar>
      <div style={{ padding: '20px' }}>
      <div style={{ borderBottom: '1px solid #ccc', paddingBottom: '20px', marginBottom: '20px' }}>
        <h1>Détails du prestataire {prestataire.name}</h1>
        <img src={prestataire.image} alt={prestataire.name} style={{ maxWidth: '200px', marginBottom: '20px' }} />
        <p><strong>Adresse :</strong> {prestataire.address}</p>
        <p><strong>Description :</strong> {prestataire.description}</p>
        <p><strong>Contact :</strong> {prestataire.contactInfos}</p>
        <p><strong>Secteur :</strong> {prestataire.sector}</p>
        <p><strong>Kbis :</strong> {prestataire.kbis}</p>
      </div>
      <div>
        <h2>Établissements</h2>
        <button onClick={handleAddEtabClick}>Ajouter un nouvel établissement</button>
        {prestataire.establishments.length > 0 ? (
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {prestataire.establishments.map((etab, index) => (
              <li key={index} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc' }}>
                <h3>{etab.name}</h3>
                <h4>Identifiant : {extractId(etab['@id'])}</h4>
                <img src={etab.image} alt={etab.name} style={{ maxWidth: '100px', marginBottom: '10px' }} />
                <p><strong>Adresse :</strong> {etab.address}</p>
                <p>
                    <strong>Manager :</strong> 
                        {etab.manager != null ? (
                          <p>{etab.manager.firstname} {etab.manager.lastname}</p>
                        ) : (
                          <>
                            <p>Pas de manager</p> 
                            <button onClick={() => handleOpenModal(extractId(etab['@id']))}>Attribuer un Manager</button>
                          </>
                        )}
                </p>

                <button onClick={() => handleEtabDetailsClick(extractId(etab['@id']))}>
                  Voir Détails
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucun établissement trouvé pour ce prestataire.</p>
        )}
      </div>
      </div>

      <AssignMangerModal
                    isOpen={isModalOpen} 
                    onClose={handleCloseModal} 
                    onSubmit={handleAssignManagerSubmit} 
                    etabId={etabToAssignManager}
      />

    </>
  );
}
