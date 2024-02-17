"use client"
import React, { useState } from 'react';
import styles from './page.module.css';
import Navbar from '../../components/NavBar/Navbar';
import SearchBar from '../../components/SearchBar/SearchBar';
import Carousel from '../../components/Carousel/Carousel';

import 'react-toastify/dist/ReactToastify.css';

import SearchResults from '../../components/SearchResults/SearchResults';

import Footer from '../../components/Footer/Footer';

export default function Home({children}) {

  const [searchResults, setSearchResults] = useState([]);
  const [searchMade, setSearchMade] = useState(false);


  
  const handleSearch = async (searchValue, selectedCategory, selectedPriceRange) => {
    setSearchMade(true);
    console.log(searchValue, selectedCategory, selectedPriceRange);
   
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
      priceRange = null; 
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
              <div className={styles.homeContainer}>
                <h1>Accueil</h1>
                <h2>De quel service avez-vous besoin ?</h2>
                <p>Pour chaque situation, trouvez le prestataire dont les compétences répondent à vos attentes et à votre niveau d’exigence.</p>
                <SearchBar onSearch={handleSearch} />
                
              </div> 

              <SearchResults results={searchResults} searchMade={searchMade}></SearchResults>


              <Carousel/>
              {children}
              <Footer></Footer>
            </main>
          </>
  )
}
