'use client'
import React from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

import { useAppContext } from '../contextTest2/context';
import { useRouter } from 'next/navigation';



export default function Navbar() {
  // const { user, token, login, logout } = useAuth();

  const context = useAppContext();

  // console.log("infos context from navbar", context);
  const {user} = context;

  const router = useRouter();

    const handleLogout = (event) => {
        //event.preventDefault(); // Empêche la navigation par défaut

        // Vider toutes les variables du localStorage
        localStorage.clear();

        // Rediriger vers la page d'accueil
        router.push('/');
    };

  return (

    <nav className={styles.navbar}>
        <Link href="/"> Accueil</Link>

        {user.role == "ROLE_ADMIN" ? <Link href="/admin"> Admin Section </Link> : '' }
        
        {user.role == "ROLE_PRESTATAIRE" ? <Link href={`/prestataire/${localStorage.getItem('userId')}/my_section`}> Espace Prestataire </Link> : '' }

        {user.role == "ROLE_MANAGER" ? <Link href={`/manager`}> Espace Manager </Link> : '' }

        {user.role == "ROLE_EMPLOYEE" ? <Link href={`/employee`}> Espace Employée </Link> : '' }
        
        {user.role == "ROLE_USER" ? <Link href="/prestataire/ajouter_prestataire"> Devenir Prestataire </Link> : '' }
        
        {user.role == "ROLE_USER" ? <Link href="/reservations"> Mes réservations </Link> : '' }

        {user.role != "ROLE_PUBLIC_ACCESS" ? <Link href="/profile"> Profile </Link> : '' }
        
        
        {user.role == "ROLE_PUBLIC_ACCESS" ? <Link href="/login"> Se connecter </Link> : '' }
        
        
        {user.role == "ROLE_PUBLIC_ACCESS" ? <Link href="/signup"> S'inscrire </Link> : '' }
        
        
        {/* {user.role != "ROLE_PUBLIC_ACCESS" ? <Link href="/logout"> Se deconnecter </Link> : "" } */}
        {user.role !== "ROLE_PUBLIC_ACCESS" ? (
            <a href="" onClick={handleLogout}>Se déconnecter</a>
        ) : (
            ""
        )}
    </nav>
  )
}
