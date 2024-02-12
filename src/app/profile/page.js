'use client';
import { useState, useEffect } from 'react';
import { useAppContext } from '../../../components/contextTest2/context';
import Navbar from '../../../components/NavBar/Navbar';

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
        // Requête GET pour récupérer les données de l'utilisateur
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
            
            // console.log("form data user mise à jour profil :", formData);
            const token = localStorage.getItem('jwtToken');
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/update_profil/${context.user.id}`, {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  Authorization: token ? `Bearer ${token}` : '',
                //   'Content-Type': 'multipart/form-data',
                },
                body: formData,
                // body: JSON.stringify({
                //   "firstname" : "izannnzzzzzzzzzzzz",
                //   "lastname" : "izan"
                // }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const updatedData = await response.json();
            console.log('Modifications enregistrées avec succès!', updatedData);
            setUser(updatedData); // Mettre à jour l'état avec les données actualisées
        } catch (error) {
            console.error("Erreur lors de l'enregistrement des modifications:", error);
        }
    };

    return (
        <div>
            <Navbar></Navbar>
            <h1>Profil de l'utilisateur</h1>
            <form onSubmit={handleSubmit}>
                {/* <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={user.email || ''} onChange={handleChange} />
                </div> */}
                <div>
                    <label>Prénom:</label>
                    <input type="text" name="firstname" value={user.firstname || ''} onChange={handleChange} />
                </div>
                <div>
                    <label>Nom:</label>
                    <input type="text" name="lastname" value={user.lastname || ''} onChange={handleChange} />
                </div>
                <div>
                    <label>Adresse:</label>
                    <input type="text" name="address" value={user.address || ''} onChange={handleChange} />
                </div>
                <div>
                    <label>Image:</label>
                    <input type="file" name="image" onChange={handleImageChange} required />
                    {user.image && <img src={user.image} alt="Profil" style={{ maxWidth: '200px' }} />}
                </div>
                <button type="submit">Enregistrer</button>
            </form>
        </div>
    );
};

export default ProfilePage;
