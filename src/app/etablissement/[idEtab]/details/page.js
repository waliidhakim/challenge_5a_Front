"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import fetchData from '../../../lib/fetchData';
import Navbar from '../../../../../components/NavBar/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import styles from './detailsEtab.module.css';

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
      <div className={styles.container}>
        <div className={styles.detailsContainer}>
          <h1 className={styles.title} >{etablissement.name}</h1>
          <img className={styles.img} src={etablissement.image} alt={etablissement.name}  />
          <p><strong>Adresse :</strong> {etablissement.address}</p>
          <p><strong>Description :</strong> {etablissement.description}</p>
          <p><strong>Relatif à :</strong> {etablissement.relateTo.name}</p>
          {etablissement.manager && (
            <p><strong>Manager :</strong> {etablissement.manager.firstname} {etablissement.manager.lastname} ({etablissement.manager.email})</p>
          )}
        </div>
        <div className={styles.prestationsContainer}>
          <h2>Prestations</h2>
          <button onClick={handleAddPrestationClick} className={styles.addButton}>
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
        <div className={styles.employeesContainer}>
          <h2>Employés</h2>
          <button className={styles.addButton} onClick={() => {}} >
            Ajouter un nouvel employé
          </button>


          {etablissement.employees.length > 0 ? (
                <table className={styles.tableClass} >
                  <thead>
                    <tr className={styles.thClass}>
                      <th className={styles.thClass}>Image</th>
                      <th className={styles.thClass}>Prénom</th>
                      <th className={styles.thClass}>Nom</th>
                      <th className={styles.thClass}>Email</th>
                      <th className={styles.thClass}>Status</th>
                      <th className={styles.thClass}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {etablissement.employees.map((employee, index) => (
                      <tr key={index}>
                        <td className={styles.thClass}>
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
                        <td className={styles.thClass}>{employee.firstname}</td>
                        <td className={styles.thClass}>{employee.lastname}</td>
                        <td className={styles.thClass}>{employee.email}</td>
                        <td className={styles.thClass}>{employee.status ? employee.status : 'N/A'}</td>
                        <td className={styles.thClass}>
                          <button className={styles.addButton}>Planning</button>
                          <button className={styles.addButton}>Supprimer</button>
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
