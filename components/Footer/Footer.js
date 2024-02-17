// components/Footer.js
import React from 'react';
import styles from './Footer.module.css'; 

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <p>© 2024 VotreEntreprise. Tous droits réservés.</p>
        <a href="#">Mentions légales</a>
        <a href="#">Politique de confidentialité</a>
        <a href="#">Contact</a>
      </div>
    </footer>
  );
};

export default Footer;
