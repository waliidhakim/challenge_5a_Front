'use client'
import React from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

import { useAppContext } from '../contextTest2/context';
import { useRouter } from 'next/navigation';



export default function Navbar() {
  

  const context = useAppContext();


  const {user} = context;

  const router = useRouter();

    const handleLogout = (event) => {
  

        // Vider toutes les variables du localStorage
        localStorage.clear();

        // Rediriger vers la page d'accueil
        router.push('/');
    };

  return (

    <nav className={styles.navbar}>
        { true ? <Link href="/"> Accueil </Link> : '' }

        {user.role == "ROLE_ADMIN" ? <Link href="/gest"> Admin Section </Link> : '' }
        
        {user.role == "ROLE_PRESTATAIRE" ? <Link href={`/prestataire/${localStorage.getItem('userId')}/my_section`}> Espace Prestataire </Link> : '' }

        {user.role == "ROLE_MANAGER" ? <Link href={`/manager`}> Espace Manager </Link> : '' }

        {user.role == "ROLE_EMPLOYEE" ? <Link href={`/employee`}> Espace Employée </Link> : '' }
        
        {user.role == "ROLE_USER" ? <Link href="/prestataire/ajouter_prestataire"> Devenir Prestataire </Link> : '' }
        
        {user.role == "ROLE_USER" ? <Link href="/reservations"> Mes réservations </Link> : '' }

        {user.role != "ROLE_PUBLIC_ACCESS" ? <Link href="/profile"> Profile </Link> : '' }
        
        
        {user.role == "ROLE_PUBLIC_ACCESS" ? <Link href="/login"> Se connecter </Link> : '' }
        
        
        {user.role == "ROLE_PUBLIC_ACCESS" ? <Link href="/signup"> S'inscrire </Link> : '' }
        
        
        {user.role !== "ROLE_PUBLIC_ACCESS" ? (
            <a href="" onClick={handleLogout}>Se déconnecter</a>
        ) : (
            ""
        )}
    </nav>
  )
}
