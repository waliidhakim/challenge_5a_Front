"use client"
import React, { useState } from 'react';
import styles from './page.module.css';
import Navbar from '../../components/NavBar/Navbar';
// import  AuthProvider  from '../../components/context/authContext';
import SearchBar from '../../components/SearchBar/SearchBar';
import Carousel from '../../components/Carousel/Carousel';
// import ContextProvider from '../../components/contextTest/contextTest';
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from '../../components/context/authContext';
import { AuthContextProvider } from '../../components/context/authContext';
import { AppWrapper } from '../../components/contextTest2/context';
import SearchResults from '../../components/SearchResults/SearchResults';
import fetchData from './lib/fetchData';

export default function Home({children}) {

  const [searchResults, setSearchResults] = useState([]);

  // const handleSearch = (searchValue, category) => {
  //   console.log('Recherche:', searchValue, 'Catégorie:', category);
  // };
  
  const handleSearch = async (searchValue, selectedCategory, selectedPriceRange) => {
    
    console.log(searchValue, selectedCategory, selectedPriceRange);
    // const requestBody = {
    //   name: searchValue,
    //   category: category,
    //   price: price,
    // };

    // try {
    //   const data = await fetchData(`${process.env.NEXT_PUBLIC_API_URL}/prestations/research`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/ld+json',
    //     },
    //     body: JSON.stringify(requestBody),
    //   });

    //   console.log("Résultats de recherche : ", data);
    //   setSearchResults(data);
    // } catch (error) {
    //   console.error('Erreur lors de la recherche:', error);
      
    // }
     // Transformer la gamme de prix en une valeur numérique appropriée pour l'API
  let priceRange;
  switch (selectedPriceRange) {
    case '0-50':
      priceRange = { min: 0, max: 50 };
      break;
    case '50-100':
      priceRange = { min: 50, max: 100 };
      break;
    case '100-200':
      priceRange = { min: 100, max: 200 };
      break;
    default:
      priceRange = null; // ou une autre logique par défaut
  }

  const requestBody = {
    name: searchValue,
    ...(selectedCategory !== 'Autre' ? { category: { name: selectedCategory } } : { category: { name: "Autre" } }),
    ...(priceRange && { price: priceRange }),
  };

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/prestations/research`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();
    console.log("Résultats de recherche : ", data);
    setSearchResults(data);
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
    }
  }
  return (
    
          <>
            <main className={styles.main}>
              <Navbar></Navbar>
              <div className='homeContainer'>
              <h1>Accueil</h1>
              <h2>De quel service avez-vous besoin ?</h2>
              <p>Pour chaque situation, trouvez le prestataire dont les compétences répondent à vos attentes et à votre niveau d’exigence.</p>
              <SearchBar onSearch={handleSearch} />
              <SearchResults results={searchResults} ></SearchResults>
              </div> 
              <Carousel/>
              {children}
            
            </main>
          </>
  )
}
