import React, { useState } from 'react';
import styles from './createUserModale.module.css';

const CreateUserModal = ({ isOpen, onClose, onSubmit }) => {
    
    const [userData, setUserData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstname: '',
        lastname: ''
      });

    const handleChange = (e) => {
      setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        //e.preventDefault();
        console.log("user creation ");
        if (userData.password !== userData.confirmPassword) {
          alert("Les mots de passe ne correspondent pas.");
          return;
        }
        
        const token = localStorage.getItem('jwtToken');
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
            method: 'POST',
            headers: {
                // Authorization: token ? `Bearer ${token}` : '',
                'Content-Type': 'application/ld+json',
                'Accept' : '*/*',
            },
            body: JSON.stringify({
              email: userData.email,
              password: userData.password,
              confirmPassword : userData.confirmPassword,
              firstname: userData.firstname,
              lastname: userData.lastname
            }),
          });
          console.log("response.ok : " , response.ok);
    
          if (!response.ok) {
            console.log("throw block")
            throw new Error('Échec de la création de l’utilisateur');
          }
    
          const result = await response.json();
          onSubmit(result); // Vous pouvez appeler cette fonction si vous souhaitez faire quelque chose après la création réussie de l'utilisateur
          onClose(); // Fermer la modal après la création réussie
        } catch (error) {
          console.error('Erreur lors de la création de l’utilisateur:', error);
          alert('Erreur lors de la création de l’utilisateur');
        }
      };

    return (
        <>  
            <div className={styles.backdrop} style={{ display: isOpen ? 'block' : 'none' }} onClick={onClose}>
                <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                    
                    <h2>Créer un Utilisateur</h2>
                    <form>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email" /* Assurez-vous que l'id correspond au htmlFor du label */
                            placeholder="Email"
                            value={userData.email}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="password">Mot de passe</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Mot de passe"
                            value={userData.password}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder="Confirmer le mot de passe"
                            value={userData.confirmPassword}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="firstname">Prénom</label>
                        <input
                            type="text"
                            name="firstname"
                            id="firstname"
                            placeholder="Prénom"
                            value={userData.firstname}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="lastname">Nom</label>
                        <input
                            type="text"
                            name="lastname"
                            id="lastname"
                            placeholder="Nom"
                            value={userData.lastname}
                            onChange={handleChange}
                            required
                        />

                        <button type="button" className={styles.btnModal} onClick={handleSubmit}>Créer</button>
                    </form>
                    <button onClick={onClose}>Fermer</button>
                    
                </div>
            </div>
        </>
      );
};



export default CreateUserModal;