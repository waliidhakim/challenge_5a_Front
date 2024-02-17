"use client"
import React, { useState } from 'react';
import styles from './page.module.css';
import Navbar from '../NavBar/Navbar';
import SearchBar from '../SearchBar/SearchBar';
import Carousel from '../Carousel/Carousel';
import 'react-toastify/dist/ReactToastify.css';

export default function Home({children}) {

  const handleSearch = (searchValue, category) => {
    console.log('Recherche:', searchValue, 'Catégorie:', category);
  };

  
  return (
      
            <main className={styles.main}>
              <Navbar></Navbar>
              <h1>Home page</h1>
              <SearchBar onSearch={handleSearch} />
              
              <Carousel/>
              {children}
            
            </main>
    
  )
}
