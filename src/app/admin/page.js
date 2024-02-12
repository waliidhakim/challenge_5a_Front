"use client"
import React, { useState, useEffect } from 'react';
import fetchData from './../lib/fetchData';
import EditUserModal from '../../../components/Modals/UserModals/editUserModal';
import UserDetailsModal from '../../../components/Modals/UserModals/userDetailsModal';
import CreateUserModal from '../../../components/Modals/UserModals/createUserModal';
import PrestataireDetailsModal from '../../../components/Modals/PrestataireModals/prestataireDetailsModal';
import EditPrestataireModal from '../../../components/Modals/PrestataireModals/editPrestataireModal';
import EtabDetailsModal from '../../../components/Modals/EtabModals/etabDetailsModal';
import EditEtabModal from '../../../components/Modals/EtabModals/editEtabModal';
import Navbar from '../../../components/NavBar/Navbar';
import { useAppContext } from '../../../components/contextTest2/context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuildingCircleArrowRight, faUser } from '@fortawesome/free-solid-svg-icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


import {extractId, extractRole} from './../lib/utils';


const Page = () => {
    const [users, setUsers] = useState([]);
    const [prestataires, setPrestataires] = useState([]);
    const [establishments, setEstablishments] = useState([]);

    const [loadingUsers, setLoadingUsers] = useState(true);
    const [loadingPrestas, setLoadingPrestas] = useState(true);
    const [loadingEtabs, setLoadingEtabs] = useState(true);

    const [errorUsers, setErrorUsers] = useState(null);
    const [errorPrestas, setErrorPrestas] = useState(null);
    const [errorEtabs, setErrorEtabs] = useState(null);

    const [editingUser, setEditingUser] = useState(null);
    const [editingPresta, setEditingPresta] = useState(null);
    // const [createUser, setCreateUser] = useState(null);

    const [detailUser, setDetailUser] = useState(null);
    const [detailPrestataire, setDetailPrestataire] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [detailEtablissement, setDetailEtablissement] = useState(null);
    const [editingEtab, setEditingEtab ] = useState(null);

    const context = useAppContext();

    //stats
    const [roleCounts, setRoleCounts] = useState({});

    //console.log("infos context from admin", context);
    const {user} = context;

    let graphData = {};

    const fetchUsers = async () => {
        try {
            const data = await fetchData(`${process.env.NEXT_PUBLIC_API_URL}/users`);
            console.log("data userssss:" , data['hydra:member']);

            const counts = {};
            data['hydra:member'].forEach(user => {
                user.roles.forEach(role => {
                    if (!counts[role]) {
                        counts[role] = 0;
                    }
                    counts[role]++;
                });
            });
            setRoleCounts(counts);
            graphData = Object.keys(roleCounts).map(role => ({
                name: role,
                count: roleCounts[role]
            }));

            setUsers(data['hydra:member']);
        } catch (error) {
            console.log('Error fetching users:', error);
            if (error = '403')
                setErrorUsers("Vous n'avez pas accès à cette section");
            else {
                setErrorUsers("Une erreur est survenue. Veuillez réessayer");
            }
        }
        finally{
            setLoadingUsers(false);
        }
    };

    const fetchPrestataires = async () => {
        try {
            const data = await fetchData(`${process.env.NEXT_PUBLIC_API_URL}/prestataires`);
            console.log("fetching data (presta) :" , data['hydra:member']);
            setPrestataires(data['hydra:member']);
        } catch (error) {
            console.log('Error fetching prestas:', error);
            if (error = '403')
                setErrorPrestas("Vous n'avez pas accès à cette section");
            else {
                setErrorPrestas("Une erreur est survenue. Veuillez réessayer");
            }
            
        }
        finally{
            setLoadingPrestas(false);
        }
    };

    const fetchEstablishments = async () => {
        try {
            const data = await fetchData(`${process.env.NEXT_PUBLIC_API_URL}/establishments`);
            console.log("data etabs :" , data['hydra:member']);
            setEstablishments(data['hydra:member']);
           
        } catch (error) {
            console.log('Error fetching users:', error);
            if (error = '403')
                setErrorEtabs("Vous n'avez pas accès à cette section");
            else {
                setErrorEtabs("Une erreur est survenue. Veuillez réessayer");
            }
            
        }
        finally{
            setLoadingEtabs(false);
        }
    };
    
    

    useEffect(() => {
        fetchUsers();
        fetchPrestataires();
        fetchEstablishments();
    }, []);

    const handleSaveEditedUser = async (userId, updatedData) => {
        console.log("handle save. user ID : ", extractId(userId), " updatedData : ", updatedData);
        try {
            const token = localStorage.getItem('jwtToken');
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${extractId(userId)}`, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/ld+json',
                    Authorization: token ? `Bearer ${token}` : '',
                    'Content-Type': 'application/merge-patch+json',
                },
                body: JSON.stringify(updatedData),
            });
            if (!response.ok) {
                throw new Error('Failed to update user');
            }
            //update users 
            await fetchUsers();
        } catch (error) {
            console.error('Error updating user:', error);
        }
        setEditingUser(null);
    };

    const handleSaveNewdUser = async (newUserData) => {
        console.log("handle create new user : ", newUserData );
        try {
            const token = localStorage.getItem('jwtToken');
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${extractId(userId)}`, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/ld+json',
                    Authorization: token ? `Bearer ${token}` : '',
                    'Content-Type': 'application/merge-patch+json',
                },
                body: JSON.stringify(updatedData),
            });
            if (!response.ok) {
                throw new Error('Failed to update user');
            }
            //update users 
            await fetchUsers();
        } catch (error) {
            console.error('Error updating user:', error);
        }
        setCreateUser(null);
    };

    const handleDeleteUser = async (userId) => {
        const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?");
        if (!confirmDelete) {
            return;
        }
    
        try {
            const token = localStorage.getItem('jwtToken');
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${extractId(userId)}`, {
                method: 'DELETE',
                headers: {
                    Authorization: token ? `Bearer ${token}` : '',
                },
            });
    
            if (!response.ok) {
                throw new Error('Failed to delete user');
            }
    
            const updatedUsers = await fetchUsers(); // Rafraîchir la liste des utilisateurs après la suppression
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleEditUserClick = (user) => {
        setEditingUser(user);
    };

    const handleUserDetailsClick = (user) => {
        setDetailUser(user);
    };

    const handlePrestaDetailsClick = (prestataire) => {
        console.log(prestataire);
        setDetailPrestataire(prestataire);
    };
    const handleEditPrestaClick = (prestataire) => {
        console.log("Prestataire to Edit : ",prestataire);
        setEditingPresta(prestataire);
    };

    const handleSaveEditedPresta = async (PrestaId, updatedData) => {
        const token = localStorage.getItem('jwtToken');
        const extractedPrestaId = extractId(PrestaId);

        const dataToSend = JSON.parse(JSON.stringify(updatedData));
        console.log("presta Id to update : ", extractedPrestaId);
        const apiEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/prestataires/${extractedPrestaId}`;
        try {
            
            
            console.log("handle updtate presta save. presta ID : ", extractId(PrestaId), " Data to send : ", dataToSend);
            const response = await fetch(apiEndpoint, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/ld+json',
                    Authorization: token ? `Bearer ${token}` : '',
                    'Content-Type': 'application/merge-patch+json',
                },
                body: JSON.stringify(dataToSend),
                // body: JSON.stringify({
                //     name: "stringddddddddddddd",
                //     address: "stringdddddddddddddddddd",
                //     description: "stringdddddddddddddddddd",
                //     contactInfos: "stringddddddddddddddddd",
                //     sector: "stringddddddddddddddddddddddd",
                //     kbis: "stringdddddddddddddddddd",
                //     status: "stringdddddddddddddddddd"
                //   }),
            });
            const responseBody = await response.json();
            console.log("Edit presta response:", response, responseBody);

            if (!response.ok) {
                throw new Error('Failed to update presta');
            }
             
            await fetchPrestataires();
        } catch (error) {
            console.error('Error updating presta:', error);
        }
        setEditingPresta(null);
    };

    const handleDeletePresta = async (prestaId) => {
        const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer ce prestataire ?");
        if (!confirmDelete) {
            return;
        }
    
        try {
            const token = localStorage.getItem('jwtToken');
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/prestataires/${extractId(prestaId)}`, {
                method: 'DELETE',
                headers: {
                    Authorization: token ? `Bearer ${token}` : '',
                },
            });
    
            if (!response.ok) {
                throw new Error('Failed to delete prestataire');
            }
    
            await fetchPrestataires(); 
            await fetchEstablishments(); 
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };


    const handleOpenModal = () => {
         setIsModalOpen(true);
    };EditEtabModal

    const handleCloseModal = () => {
         setIsModalOpen(false);
    };

    const handleCreateUserSubmit = async () => {
        console.log("admin section");
        setIsModalOpen(false);
        await fetchUsers();
    };
    // ---------------------

    const handleEtabDetailsClick = (establishment) => {
        console.log(establishment);
        setDetailEtablissement(establishment);
    };
    const handleEditEtabClick = (etablissement) => {
        console.log("Prestataire to Edit : ",etablissement);
        setEditingEtab(etablissement);
    };
    const handleSaveEditedEtab = async (EtabId, updatedData) => {
        const token = localStorage.getItem('jwtToken');
        const extractedEtabId = extractId(EtabId);

        const dataToSend = JSON.parse(JSON.stringify(updatedData));
        console.log("presta Id to update : ", extractedEtabId);
        const apiEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/establishments/${extractedEtabId}`;
        try {
            
            
            console.log("handle updtate presta save. presta ID : ", extractedEtabId , " Data to send : ", dataToSend);
            const response = await fetch(apiEndpoint, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/ld+json',
                    Authorization: token ? `Bearer ${token}` : '',
                    'Content-Type': 'application/merge-patch+json',
                },
                body: JSON.stringify(dataToSend),
            });
            const responseBody = await response.json();
            console.log("Edit Etab response:", response, responseBody);

            if (!response.ok) {
                throw new Error('Failed to update etab');
            }
             
            await fetchEstablishments();
        } catch (error) {
            console.error('Error updating etab:', error);
        }
        setEditingEtab(null);
    };

    const handleDeleteEtab = async (etabId) => {
        const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cet établissement ?");
        if (!confirmDelete) {
            return;
        }
    
        try {
            const token = localStorage.getItem('jwtToken');
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/establishments/${extractId(etabId)}`, {
                method: 'DELETE',
                headers: {
                    Authorization: token ? `Bearer ${token}` : '',
                },
            });
    
            if (!response.ok) {
                throw new Error('Failed to delete Establishment');
            }
    
            
            await fetchEstablishments(); 
        } catch (error) {
            console.error('Error deleting establishment:', error);
        }
    }
    // graphe users
    graphData = Object.keys(roleCounts).map(role => ({
        name: role,
        count: roleCounts[role]
    }));

    return (
        <>  
            <Navbar></Navbar>
            <div>
                <h1>Liste des utilisateurs</h1>
                {loadingUsers && <div>Chargement...</div> }
                {errorUsers != null ? <div>{errorUsers}</div>  : <button onClick={handleOpenModal}>Créer un Utilisateur</button> }
                
                <table>
                    <thead>
                        <tr>
                            <th>Identifiant</th>
                            <th>Prénom</th>
                            <th>Nom</th>
                            <th>Email</th>
                            <th>Rôle</th>
                            <th>Photo</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user['@id']}>
                                <td>{extractId(user['@id'])}</td>
                                <td>{user.firstname}</td>
                                <td>{user.lastname}</td>
                                <td>{user.email}</td>
                                <td>{user.roles.map(role => extractRole(role)).join(', ')}</td>
                                <td>
                                    {user.image ? (
                                            <img 
                                                src={user.image} 
                                                alt={`Image de ${user.name}`} 
                                                style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} 
                                            />
                                        ) : (
                                            
                                            <div style={{ fontSize: '40px' }}>
                                                <FontAwesomeIcon icon={faUser} />
                                            </div>)}
                                </td>
                                <td>    
                                    <button onClick={() => handleUserDetailsClick(user)}>Détails</button>
                                    <button onClick={() => handleEditUserClick(user)}>Modifier</button>  
                                    <button onClick={() => handleDeleteUser(user['@id'])}>Supprimer</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

         
                <BarChart width={800} height={300} data={graphData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
                
                <h1>Liste des prestataires</h1>
                {loadingPrestas && <div>Chargement...</div> }
                {errorPrestas != null ? <div>{errorPrestas}</div>  : <button onClick={handleOpenModal}>Créer un Prestataire</button> }
                <table>
                    <thead>
                        <tr>
                            <th>Identifiant</th>
                            <th>Nom du prestataire</th>
                            <th>Secteur d'activité</th>
                            <th>Statut</th>
                            <th>Propriétaire</th>
                            <th>Image</th>
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
                                    <button onClick={() => handlePrestaDetailsClick(prestataire)}>Détails</button>
                                    <button onClick={() => handleEditPrestaClick(prestataire)}>Modifier</button>  
                                    <button onClick={() => handleDeletePresta(prestataire['@id'])}>Supprimer</button>
                                </td>
                                
                                
                            </tr>
                        ))}
                    </tbody>
                </table>

                <h1>Liste des etablissements</h1>
                {loadingEtabs && <div>Chargement...</div> }
                {errorEtabs != null ? <div>{errorEtabs}</div>  : <button onClick={handleOpenModal}>Créer un Etablissement</button> }
                
                <table>
                    <thead>
                        <tr>
                            <th>Identifiant</th>
                            <th>Nom</th>
                            <th>Prestataire</th>
                        </tr>
                    </thead>
                    <tbody>
                        {establishments.map(establishment => (
                            <tr key={establishment['@id']}>
                                <td>{extractId(establishment['@id'])}</td>
                                <td>{establishment.name}</td>
                                <td>{establishment.relateTo ? establishment.relateTo.name : "Prestataire supprimé"}</td>
                                <td>    
                                    <button onClick={() => handleEtabDetailsClick(establishment)}>Détails</button>
                                    <button onClick={() => handleEditEtabClick(establishment)}>Modifier</button>  
                                    <button onClick={() => handleDeleteEtab(extractId(establishment['@id']))}>Supprimer</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {editingUser && (
                    <EditUserModal 
                        user={editingUser} 
                        onClose={() => setEditingUser(null)} 
                        onSave={handleSaveEditedUser}
                    />
                )}

                <CreateUserModal 
                    isOpen={isModalOpen} 
                    onClose={handleCloseModal} 
                    onSubmit={handleCreateUserSubmit} 
                />
                

                {detailUser && (
                    <UserDetailsModal 
                        user={detailUser} 
                        onClose={() => setDetailUser(null)} 
                    />
                )}
                {/* -------------------------------- */}
                {detailPrestataire && (
                    <PrestataireDetailsModal 
                        prestataire={detailPrestataire} 
                        onClose={() => setDetailPrestataire(null)} 
                    />
                )}      

                {editingPresta && (
                    <EditPrestataireModal 
                        prestataire={editingPresta} 
                        onClose={() => setEditingPresta(null)} 
                        onSave={handleSaveEditedPresta}
                    />
                )}

                {/* -------------------------------- */}
                {detailEtablissement && (
                    <EtabDetailsModal 
                        etablissement={detailEtablissement} 
                        onClose={() => setDetailEtablissement(null)} 
                    />
                )}

                {editingEtab && (
                    <EditEtabModal 
                        etablissement={editingEtab} 
                        onClose={() => setEditingEtab(null)} 
                        onSave={handleSaveEditedEtab}
                    />
                )}
            </div>
        </>
    );
};

export default Page;


