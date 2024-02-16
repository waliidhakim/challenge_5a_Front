// src/app/components/PrestataireForm/index.js
"use client"
import React, { useState, useEffect } from 'react';
// import styles from './etabRegister.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppContext } from '../contextTest2/context';
import { useRouter } from 'next/navigation';
import styles from './AddPrestation.module.css';
import fetchData from '@/app/lib/fetchData';

const AddPrestationComponent = (props) => {

    const router = useRouter();
    const initialFormData = {
        name: '',
        description: '',
        image: '',
        price : '',
        duration : '',
        category : ''
    }
    const [prestation, setPrestation] = useState(initialFormData);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Autre');
    const [error, setError] = useState([]);
     

    const context = useAppContext();

    const fetchCategories = async () => {
        try {
            const data = await fetchData(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
            console.log("Categories : ",data['hydra:member']);
            setCategories(data['hydra:member']);
        } catch (error) {
            console.log('Error fetching catagories:', error);
            if (error = '403')
                setError("Vous n'avez pas accès à cette section");
            else {
                setError("Une erreur est survenue. Veuillez réessayer");
            }
            
        }
      };

      useEffect(() => {
        fetchCategories();
      }, []);
    
    
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPrestation({
            ...prestation,
            [name]: value
        });
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
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
        
        formData.append('name', prestation.name);
        formData.append('description', prestation.description);
        formData.append('price', prestation.price);
        formData.append('duration', prestation.duration);
        formData.append('category', prestation.category);
        if (selectedImage) {
            formData.append('image', selectedImage);
        }

        for (let pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }

        try {
            
            // console.log("form data user mise à jour profil :", formData);
            const token = localStorage.getItem('jwtToken');
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/establishments/${props.idEtab}/addPrestation`, {
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
                router.push(`/etablissement/${props.idEtab}/details`);
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
            
            {isLoading && <div className={styles.loadingText}>Chargement...</div> }
            <form className={styles.formContainer} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Nom de la prestation :</label>
                    <input className={styles.inputText} type="text" name="name" value={prestation.name} onChange={handleChange} />

                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Description :</label>
                    <input className={styles.inputText} type="text" name="description" value={prestation.description} onChange={handleChange} />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label} >Prix :</label>
                    <input className={styles.inputText} type="text" name="price" value={prestation.price} onChange={handleChange} />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Durée en heures :</label>
                    <input className={styles.inputText} type="text" name="duration" value={prestation.duration} onChange={handleChange} />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Catégorie :</label>
                    <select value={selectedCategory} onChange={handleCategoryChange}>
                        <option value="">Choisir une catégorie</option>
                        {
                            categories.map((category) =>{
                            return <option key={category['@id']} value={category.name}>{category.name}</option>
                            })
                        }
                        <option value="Autre" >Autre</option>
                        </select>
                </div>
                <div>
                    <label>Image:</label>
                    <input className={`${styles.inputFile}`} type="file" name="image" onChange={handleImageChange} />
                </div>
                <button className={styles.submitButton} type="submit">Enregistrer</button>
            </form>
        
            
        </>
    );
};

export default AddPrestationComponent;
