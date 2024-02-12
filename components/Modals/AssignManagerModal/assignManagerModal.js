import React, { useState } from 'react';
import styles from './assignMangerModal.module.css';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AssignMangerModal = ({ isOpen, onClose, onSubmit, etabId}) => {
    
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [mangerData, setManagerData] = useState({
        email: '',
        firstname: '',
        lastname: ''
      });

    const handleChange = (e) => {
        setManagerData({ ...mangerData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        //toast.success("Opération réussie.",{autoClose: 1200});
        const token = localStorage.getItem('jwtToken');
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/establishments/${etabId}/assignManager`, {
            method: 'PATCH',
            headers: {
                // Authorization: token ? `Bearer ${token}` : '',
                'Content-Type': 'application/merge-patch+json',
                'Accept' : '*/*',
                Authorization: token ? `Bearer ${token}` : '',
            },
            body: JSON.stringify({
              email: mangerData.email,
              firstname: mangerData.firstname,
              lastname: mangerData.lastname
            }),
          });
          console.log("response.ok : " , response.ok);
          
          if (!response.ok) {
            
            console.log("throw block")
            throw new Error("Erreur lors de l'attribution du manager");
          }
    
          const result = await response.json();
          toast.success("Opération réussie.",{autoClose: 1200});
          setIsLoading(false);

          setTimeout(() => {
            onSubmit(result);
            onClose();
          }, 1500); 
        } catch (error) {
          console.error("Erreur lors de l'attribution du manager", error);
          toast.error("Une erreur est survenue. Veuillez réessayer.", {autoClose: 1200});
          setIsLoading(false);
        }
      };

    return (
        <>  
           
            <div className={styles.backdrop} style={{ display: isOpen ? 'block' : 'none' }} onClick={onClose}>
                <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                    
                    <h2>Assigner un manager à l'établissement d'ID {etabId}</h2>
                    <ToastContainer />
                    {isLoading && <div>Chargement...</div> }
                    <form>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={mangerData.email}
                            onChange={handleChange}
                            required
                        />
                    
                        <input
                            type="text"
                            name="firstname"
                            placeholder="Prénom"
                            value={mangerData.firstname}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="lastname"
                            placeholder="Nom"
                            value={mangerData.lastname}
                            onChange={handleChange}
                            required
                        />
                        <button type="button" onClick={handleSubmit}>Enregistrer</button>
                    </form>
                    <button onClick={onClose}>Fermer</button>
                    
                </div>
            </div>
        </>
      );
};



export default AssignMangerModal;