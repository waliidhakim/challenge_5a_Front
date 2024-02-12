"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import fetchData from '../../../lib/fetchData';
import Navbar from '../../../../../components/NavBar/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export default function EtablissementDetailsPage({params}) {
  const router = useRouter();
  const id = params.idEtab;

  const [etablissement, setEtablissement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;  // Ne rien faire si l'ID n'est pas encore chargé

    const fetchEtablissementData = async () => {
      setLoading(true);
      try {
        const data = await fetchData(`${process.env.NEXT_PUBLIC_API_URL}/establishments/${id}`);
        setEtablissement(data);
      } catch (error) {
        console.error('Error fetching etablissement:', error);
        setError('Une erreur est survenue lors de la récupération des données.');
      } finally {
        setLoading(false);
      }
    };

    fetchEtablissementData();
  }, [id]);

  const handleAddPrestationClick = () => {
    router.push(`/etablissement/${id}/ajouter_prestation`);
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error}</div>;
  if (!etablissement) return <div>Aucun établissement trouvé.</div>;

  return (
    <>  
      <Navbar></Navbar>
      <div style={{ padding: '20px' }}>
        <div style={{ borderBottom: '1px solid #ccc', paddingBottom: '20px', marginBottom: '20px' }}>
          <h1>{etablissement.name}</h1>
          <img src={etablissement.image} alt={etablissement.name} style={{ maxWidth: '200px', marginBottom: '20px' }} />
          <p><strong>Adresse :</strong> {etablissement.address}</p>
          <p><strong>Description :</strong> {etablissement.description}</p>
          <p><strong>Relatif à :</strong> {etablissement.relateTo.name}</p>
          {etablissement.manager && (
            <p><strong>Manager :</strong> {etablissement.manager.firstname} {etablissement.manager.lastname} ({etablissement.manager.email})</p>
          )}
        </div>
        <div style={{ borderBottom: '1px solid #ccc', paddingBottom: '20px', marginBottom: '20px' }}>
          <h2>Prestations</h2>
          <button onClick={handleAddPrestationClick} style={{ marginBottom: '20px' }}>
            Ajouter une nouvelle prestation
          </button>
          {etablissement.prestations.length > 0 ? (
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {etablissement.prestations.map((prestation, index) => (
                <li key={index} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc' }}>
                  <h3>Prestation {prestation.name}</h3>
                  <p><strong>Description :</strong> {prestation.description}</p>
                  <p><strong>Durée :</strong> {prestation.duration} minutes</p>
                  <p><strong>Catégorie :</strong> {prestation.category.name ?? ''}</p>
                  <p><strong>Prix :</strong> {prestation.price}€</p>
                  {/* <p><strong>Catégorie :</strong> {prestation.category.name}</p> */}
                </li>
              ))}
            </ul>
          ) : (
            <p>Aucune prestation trouvée pour cet établissement.</p>
          )}


        </div>
        <div>
          <h2>Employés</h2>
          <button onClick={() => {}} style={{ marginBottom: '20px' }}>
            Ajouter un nouvel employé
          </button>


          {etablissement.employees.length > 0 ? (
                <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f0f0f0' }}>
                      <th style={{ padding: '10px', border: '1px solid #ddd' }}>Image</th>
                      <th style={{ padding: '10px', border: '1px solid #ddd' }}>Prénom</th>
                      <th style={{ padding: '10px', border: '1px solid #ddd' }}>Nom</th>
                      <th style={{ padding: '10px', border: '1px solid #ddd' }}>Email</th>
                      <th style={{ padding: '10px', border: '1px solid #ddd' }}>Status</th>
                      <th style={{ padding: '10px', border: '1px solid #ddd' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {etablissement.employees.map((employee, index) => (
                      <tr key={index}>
                        <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>
                          {employee.image ? (
                            <img 
                              src={employee.image} 
                              alt={`Image de ${employee.firstname} ${employee.lastname}`} 
                              style={{ width: '50px', height: '50px', borderRadius: '50%' }} 
                            />
                          ) : (
                            <div 
                              style={{ fontSize: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#f0f0f0' }}
                            >
                              {/* Utilisez ici votre icône FontAwesome ou une autre icône */}
                            </div>
                          )}
                        </td>
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{employee.firstname}</td>
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{employee.lastname}</td>
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{employee.email}</td>
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{employee.status ? employee.status : 'N/A'}</td>
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                          <button style={{ marginRight: '10px' }}>Planning</button>
                          <button>Supprimer</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>Aucun employé trouvé pour cet établissement.</p>
              )}



              </div>
            </div>
    </>
  );
}
