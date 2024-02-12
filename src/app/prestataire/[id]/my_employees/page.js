"use client";
import fetchData from '@/app/lib/fetchData';
import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../../../../../components/NavBar/Navbar';
import { extractId, extractRole } from '@/app/lib/utils';


const Page = ({params}) => {

    const [users, setUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [errorUsers, setErrorUsers] = useState(null);
    const [editingUser, setEditingUser] = useState(null);
    const prestataireId = params.id ; 

    const fetchUsers = async () => {
        try {
            const data = await fetchData(`${process.env.NEXT_PUBLIC_API_URL}/prestataire/employees`);
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

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <Navbar></Navbar>
            <h1>Les employées du prestataire d'ID {prestataireId}</h1>
            {loadingUsers && <div>Chargement...</div> }
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
                <tr style={{ backgroundColor: '#f4f4f4', borderBottom: '1px solid #ddd', textAlign: 'left' }}>
                <th style={{ padding: '8px', color : "black" }}>Identifiant</th>
                <th style={{ padding: '8px', color : "black" }}>Prénom</th>
                <th style={{ padding: '8px', color : "black" }}>Nom</th>
                <th style={{ padding: '8px', color : "black" }}>Email</th>
                <th style={{ padding: '8px', color : "black" }}>Rôle</th>
                <th style={{ padding: '8px', color : "black" }}>Statut</th>
                <th style={{ padding: '8px', color : "black" }}>Photo</th>
                <th style={{ padding: '8px', color : "black" }}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                <tr key={user['@id']} style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>
                    <td style={{ padding: '8px' }}>{extractId(user['@id'])}</td>
                    <td style={{ padding: '8px' }}>{user.firstname}</td>
                    <td style={{ padding: '8px' }}>{user.lastname}</td>
                    <td style={{ padding: '8px' }}>{user.email}</td>
                    <td style={{ padding: '8px' }}>{user.roles.map(role => extractRole(role)).join(', ')}</td>
                    <td style={{ padding: '8px' }}>{user.status ?? 'N/A'}</td>
                    <td style={{ padding: '8px' }}>
                    {user.image ? (
                        <img 
                        src={user.image} 
                        alt={`Image de ${user.name}`} 
                        style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} 
                        />
                    ) : (
                        <div style={{ fontSize: '40px' }}>
                        <FontAwesomeIcon icon={faUser} />
                        </div>
                    )}
                    </td>
                    <td style={{ padding: '8px' }}>    
                    <button onClick={() => handleEditUserClick(user)}>Modifier</button>  
                    <button onClick={() => handleDeleteUser(user['@id'])}>Supprimer</button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    );
};

export default Page;