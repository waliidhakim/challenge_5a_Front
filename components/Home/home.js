"use client"
import React, { useState } from 'react';
import styles from './page.module.css';
import Navbar from '../NavBar/Navbar';
// import  AuthProvider  from '../../components/context/authContext';
import SearchBar from '../SearchBar/SearchBar';
import Carousel from '../Carousel/Carousel';
// import ContextProvider from '../../components/contextTest/contextTest';
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { AuthProvider } from '../../../components/context/authContext';
// import { AuthContextProvider } from '../../../components/context/authContext';
import { AppWrapper } from '../contextTest2/context';

export default function Home({children}) {

  const handleSearch = (searchValue, category) => {
    console.log('Recherche:', searchValue, 'Catégorie:', category);
  };
  // const { user, token, login, logout } = useAuth();
  // console.log("user auth : ", user );
  
  return (
      // <AppWrapper>
            <main className={styles.main}>
              <Navbar></Navbar>
              <h1>Home page</h1>
              <SearchBar onSearch={handleSearch} />
              
              <Carousel/>
              {children}
            
            </main>
      // </AppWrapper>
      
   
    
  )
}
