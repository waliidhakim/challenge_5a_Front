"use client"
import React, {useState, useEffect} from 'react';
import fetchData from '../../../lib/fetchData';
import { extractId } from '@/app/lib/utils';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuildingCircleArrowRight, faUser } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../../../../../components/NavBar/Navbar';



export default function page({params}) {

  const router = useRouter();
  const idPresta = params.id;  
  const [loading, setLoading] = useState(true);
  const [prestataires, setPrestataires] = useState([]);
  const [error, setError] = useState(null);

  const handleAddPrestataire = () => {
    router.push('/prestataire/ajouter_prestataire');
  };

  const handleEmployeesButtonClick  = () => {
    router.push(`/prestataire/${idPresta}/my_employees`);
  };
  
  const fetchPrestataires = async () => {
    try {
        const data = await fetchData(`${process.env.NEXT_PUBLIC_API_URL}/prestataires`);
        console.log("fetching data (presta from my_section) :" , data['hydra:member']);
        setPrestataires(data['hydra:member']);
        setLoading(false)
    } catch (error) {
        console.error('Error fetching prestataires:', error);
        setError(error);
        setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchPrestataires();
}, []);
  

  return (
    <>  
        <Navbar></Navbar>
        <h1>Prestataire Section</h1>
        <button onClick={handleEmployeesButtonClick}>Mes employées</button>
        <h2>Liste de mes prestataires</h2>
                <button onClick={handleAddPrestataire}>Ajouter un nouveau prestataire</button>
                <table>
                    <thead>
                        <tr>
                            <th>Identifiant</th>
                            <th>Nom du prestataire</th>
                            <th>Secteur d'activité</th>
                            <th>Statut</th>
                            <th>Propriétaire</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {prestataires.map(prestataire => (
                            <tr key={prestataire['@id']}>
                                <td>{extractId(prestataire['@id'])}</td>
                                <td>{prestataire.name}</td>
                                <td>{prestataire.sector}</td>
                                <td>{prestataire.status}</td>
                                <td>{prestataire.owner.lastname}</td>
                                <td>
                                    {prestataire.image ? (
                                            <img 
                                                src={prestataire.image} 
                                                alt={`Image de ${prestataire.name}`} 
                                                style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} 
                                            />
                                        ) : (
                                            
                                            <div style={{ fontSize: '45px', color: 'gray' }}>
                                                <FontAwesomeIcon icon={faBuildingCircleArrowRight} />
                                            </div>)}
                                </td>
                                <td>    
                                    {/* <button onClick={() => handlePrestaDetailsClick(prestataire)}>Détails</button> */}
                                    <button onClick={() => {router.push(`/prestataire/details/${extractId(prestataire['@id'])}`)}}>Détails</button>
                                    <button onClick={() => handleEditPrestaClick(prestataire)}>Modifier</button>  
                                    <button onClick={() => {}}>Supprimer</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
    </>
  )
}


