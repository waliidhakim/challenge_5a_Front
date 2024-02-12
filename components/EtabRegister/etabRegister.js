// src/app/components/PrestataireForm/index.js
"use client"
import React, { useState } from 'react';
import styles from './etabRegister.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppContext } from '../contextTest2/context';
import { useRouter } from 'next/navigation';

const EtabRegisterComponent = (props) => {

    const router = useRouter();
    const initialFormData = {
        name: '',
        address: '',
        description: '',
        image: ''
    }
    const [etab, setEtab] = useState(initialFormData);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
     

    const context = useAppContext();

    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEtab({
            ...etab,
            [name]: value
        });
    };


    const handleImageChange = (e) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            setSelectedImage(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData();
        
        formData.append('name', etab.name);
        formData.append('address', etab.address);
        formData.append('description', etab.description);
        if (selectedImage) {
            formData.append('image', selectedImage);
        }

        for (let pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }

        try {
            
            // console.log("form data user mise à jour profil :", formData);
            const token = localStorage.getItem('jwtToken');
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/prestataire/${props.idPresta}/addEstablishment`, {
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

            
            toast.success("Opération réussie.",{autoClose: 1500});
            setTimeout(() => {
                // window.location.href = '/';
                router.push(`/prestataire/details/${props.idPresta}`);
            }, 1000); 
            console.log("Ajout de l'étab traité avec succès!");

        } catch (error) {
            console.error("Erreur lors de l'ajout de l'étab", error);
            toast.error("Une erreur est survenue. Veuillez réessayer.");
        }
        finally{
            setIsLoading(false);
        }
    };

    return (
        <>  
            <ToastContainer />
            
            {isLoading && <div>Chargement...</div> }
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nom de l'établissement :</label>
                    <input type="text" name="name" value={etab.name} onChange={handleChange} />

                </div>
                <div>
                    <label>Adresse :</label>
                    <input type="text" name="address" value={etab.address} onChange={handleChange} />
                </div>
                <div>
                    <label>Description :</label>
                    <input type="text" name="description" value={etab.description} onChange={handleChange} />
                </div>
                <div>
                    <label>Image:</label>
                    <input type="file" name="image" onChange={handleImageChange} />
                </div>
                <button type="submit">Enregistrer</button>
            </form>
        
            
        </>
    );
};

export default EtabRegisterComponent;
