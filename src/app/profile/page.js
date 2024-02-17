'use client';
import { useState, useEffect } from 'react';
import { useAppContext } from '../../../components/contextTest2/context';
import Navbar from '../../../components/NavBar/Navbar';
import './profile.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faHome,
  faImage,
  faLock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const ProfilePage = () => {
    const [user, setUser] = useState({
        email: '',
        firstname: '',
        lastname: '',
        image: '',
        address : ''
    });
    const [selectedImage, setSelectedImage] = useState(null);
    const context = useAppContext();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${localStorage.getItem("userId")}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/ld+json',
                    'Authorization': `Bearer ${context.user.token}`,
                    'Content-Type': 'application/ld+json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setUser(data);
        };

        if (context.user.id && context.user.token) {
            fetchData().catch(console.error);
        }
    }, [context.user.id, context.user.token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({ ...prevUser, [name]: value }));
        console.log("updated user : ",user);
    };

    const handleImageChange = (e) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            setSelectedImage(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        // formData.append('email', user.email);
        formData.append('firstname', user.firstname);
        formData.append('lastname', user.lastname);
        formData.append('address', user.address);
        if (selectedImage) {
            formData.append('image', selectedImage);
        }

        for (let pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }

        try {
            
            const token = localStorage.getItem('jwtToken');
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/update_profil/${context.user.id}`, {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  Authorization: token ? `Bearer ${token}` : '',
                },
                body: formData,
            
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const updatedData = await response.json();
            console.log('Modifications enregistrées avec succès!', updatedData);
            setUser(updatedData); 
        } catch (error) {
            console.error("Erreur lors de l'enregistrement des modifications:", error);
        }
    };

  
    return (
        <div>
            <Navbar />
            <div className="page-content">
                <div className='profileContainer'>
                    <h1>Profil de l'utilisateur</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="firstname">
                                <FontAwesomeIcon icon={faUser} />
                                Prénom
                            </label>
                            <input type="text" id="firstname" name="firstname" value={user.firstname || ''} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastname">
                                <FontAwesomeIcon icon={faUser} />
                                Nom
                            </label>
                            <input type="text" id="lastname" name="lastname" value={user.lastname || ''} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">
                                <FontAwesomeIcon icon={faHome} />
                                Adresse
                            </label>
                            <input type="text" id="address" name="address" value={user.address || ''} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="image">
                                <FontAwesomeIcon icon={faImage} />
                                Image de profil
                            </label>
                            <input type="file" id="image" name="image" onChange={handleImageChange} />
                            {user.image && <img src={user.image} alt="Profil" style={{ maxWidth: '200px', marginTop: '10px' }} />}
                        </div>
                        <button type="submit">Enregistrer les modifications</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
