// src/app/components/PrestataireForm/index.js
"use client"
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppContext } from '../contextTest2/context';
import { useRouter } from 'next/navigation';
import styles from './prestataireRegister.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faComment,
  faHashtag,
  faHome,
  faImage,
  faInfo,
  faMagnifyingGlassDollar,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Faustina } from 'next/font/google';

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

   

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData();
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
            
            const token = localStorage.getItem('jwtToken');
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/prestataire/register`, {
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

            
            toast.success("Opération réussie. Veuillez attendre l'approbation de l'admin",{autoClose: 1500});
            setTimeout(() => {
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
        
            {isLoading && <div>Chargement...</div> }
            <form className={styles.prestaForm} onSubmit={handleSubmit}>
            <h1>Devenir Prestataire</h1>
                <div className={styles.formgroup}>
                <FontAwesomeIcon icon={faUser} />
                    <input className={styles.prestaInput} type="text" name="name" placeholder="Nom du prestataire" value={presta.name} onChange={handleChange} />

                   
                </div>
                <div className={styles.formgroup}>
                <FontAwesomeIcon icon={faHome} />
                    <input className={styles.prestaInput} type="text" name="address" placeholder="Adresse" value={presta.address} onChange={handleChange} />
                
                </div>
                <div className={styles.formgroup}>
                <FontAwesomeIcon icon={faComment} />
                    <input className={styles.prestaInput} type="text" name="description" placeholder="Description" value={presta.description} onChange={handleChange} />
                </div>

                <div className={styles.formgroup}>
                <FontAwesomeIcon icon={faInfo} />
                    <input className={styles.prestaInput} type="text" name="contactInfos" placeholder="Information de contact" value={presta.contactInfos} onChange={handleChange} />
                </div>
                <div className={styles.formgroup}>
                <FontAwesomeIcon icon={faMagnifyingGlassDollar} />
                    <input className={styles.prestaInput} type="text" name="sector" placeholder="Secteur d'activité" value={presta.sector} onChange={handleChange} />
                </div>

                <div className={styles.formgroup}>
                <FontAwesomeIcon icon={faHashtag} />
                    <input className={styles.prestaInput} type="text" name="kbis" placeholder="Numéro de Siret" value={presta.kbis} onChange={handleChange} />
                </div>
                <div className={styles.formgroup}>
                <FontAwesomeIcon icon={faImage} />
                    <input className={styles.prestaInput} type="file" name="image" placeholder="Image" onChange={handleImageChange} />
                </div>
                <button className={styles.btn} type="submit">Enregistrer</button>
            </form>
        </>
    );
};

export default PrestataireRegister;
