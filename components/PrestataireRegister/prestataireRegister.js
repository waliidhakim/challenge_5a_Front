// src/app/components/PrestataireForm/index.js
"use client"
import React, { useState } from 'react';
import styles from './prestataireRegister.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppContext } from '../contextTest2/context';
import { useRouter } from 'next/navigation';

const PrestataireRegister = () => {

    const router = useRouter();
    const initialFormData = {
        name: '',
        address: '',
        description: '',
        contactInfos: '',
        sector: '',
        kbis: '',
        image: ''
    }
    const [presta, setPresta] = useState(initialFormData);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    // const router = useRouter();  

    const context = useAppContext();

    // const notify = () => toast("Hello coders it was easy!");
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPresta({
            ...presta,
            [name]: value
        });
    };


    const handleImageChange = (e) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            setSelectedImage(file);
        }
    };

    // const handleSubmit = async () => {
    //     setIsLoading(true);
    //     try {
    //         const token = localStorage.getItem('jwtToken');
    //         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/prestataire/register`, {
    //             method: 'POST',
    //             headers: {
    //                 'Accept': 'application/ld+json',
    //                 Authorization: token ? `Bearer ${token}` : '',
    //                 'Content-Type': 'application/ld+json',
    //             },
    //             body: JSON.stringify(formData)
    //         });

    //         if (!response.ok) {
    //             throw new Error(`HTTP error! status: ${response.status}`);
    //         }

    //         const data = await response.json();
    //         console.log(data);
    //         toast.success("Opération réussie. Veuillez attendre l'approbation de l'admin");
    //         setIsLoading(false); 
    //         setFormData(initialFormData);
    //         // router.push('/');
            
            
    //     } catch (error) {
    //         console.error("Erreur lors de l'envoi des données:", error);
    //         setIsLoading(false); 
    //         toast.error("Une erreur est survenue. Veuillez réessayer.");
    //     }
       
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData();
        // formData.append('email', user.email);
        formData.append('name', presta.name);
        formData.append('address', presta.address);
        formData.append('description', presta.description);
        formData.append('contactInfos', presta.contactInfos);
        formData.append('sector', presta.sector);
        formData.append('kbis', presta.kbis);
        if (selectedImage) {
            formData.append('image', selectedImage);
        }

        for (let pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }

        try {
            
            // console.log("form data user mise à jour profil :", formData);
            const token = localStorage.getItem('jwtToken');
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/prestataire/register`, {
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

            // const updatedData = await response.json();
            toast.success("Opération réussie. Veuillez attendre l'approbation de l'admin",{autoClose: 1500});
            setTimeout(() => {
                // window.location.href = '/';
                router.push(`/prestataire/${localStorage.getItem("userId")}/my_section`);
            }, 1000); 
            console.log('demande de prestataire traitée avec succès!');

        } catch (error) {
            console.error("Erreur lors de la demande de prestaitaire", error);
            toast.error("Une erreur est survenue. Veuillez réessayer.");
        }
        finally{
            setIsLoading(false);
        }
    };

    return (
        <>  
            <ToastContainer />
            {/* <div className={styles.form}>
                
                {isLoading && <div>Chargement...</div> }
                
                <label htmlFor="name">Nom:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Nom" required />
                
                <label htmlFor="address">Adresse:</label>
                <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} placeholder="Adresse" required />
                
                <label htmlFor="description">Description:</label>
                <textarea id="description" name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
                
                <label htmlFor="contactInfos">Informations de contact:</label>
                <input type="text" id="contactInfos" name="contactInfos" value={formData.contactInfos} onChange={handleChange} placeholder="Informations de contact" required />
                
                <label htmlFor="sector">Secteur:</label>
                <input type="text" id="sector" name="sector" value={formData.sector} onChange={handleChange} placeholder="Secteur" required />
                
                <label htmlFor="kbis">Kbis:</label>
                <input type="text" id="kbis" name="kbis" value={formData.kbis} onChange={handleChange} placeholder="Kbis" required />
                
                <label htmlFor="image">Image URL:</label>
                <input type="text" id="image" name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" required />
                
                <button type="button" onClick={handleSubmit}>Envoyer</button>
            </div> */}
            {isLoading && <div>Chargement...</div> }
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nom du prestataire :</label>
                    <input type="text" name="name" value={presta.name} onChange={handleChange} />

                    {/* <label htmlFor="name">Nom:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Nom" required /> */}
                </div>
                <div>
                    <label>Adresse :</label>
                    <input type="text" name="address" value={presta.address} onChange={handleChange} />
                    {/* <label>Nom:</label>
                    <input type="text" name="lastname" value={user.lastname || ''} onChange={handleChange} /> */}
                </div>
                <div>
                    <label>Description :</label>
                    <input type="text" name="description" value={presta.description} onChange={handleChange} />
                </div>

                <div>
                    <label>Informations de contact : </label>
                    <input type="text" name="contactInfos" value={presta.contactInfos} onChange={handleChange} />
                </div>
                <div>
                    <label>Secteur: </label>
                    <input type="text" name="sector" value={presta.sector} onChange={handleChange} />
                </div>

                <div>
                    <label>Kbis: </label>
                    <input type="text" name="kbis" value={presta.kbis} onChange={handleChange} />
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

export default PrestataireRegister;
