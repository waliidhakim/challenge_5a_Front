import React from 'react';
import styles from './SearchResults.module.css'; // Assurez-vous de créer ce fichier CSS pour le style
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faUser } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

const SearchResults = ({ results }) => {

    const router = useRouter();

    const handleConsultClick = (idPresta) => {
        router.push(`/prestation/${idPresta}`)
    };
  return (
    <div className={styles.resultsContainer}>
      {results.map((result) => (
        <div key={result.id} className={styles.resultCard}>
          <h2>Nom de la prestation : {result.name}</h2>
          <p>Prix: {result.price}€</p>
          <p>Description : {result.description}</p>
          {result.image ? 
                (
                    <img 
                        src={result.image} 
                        alt={`Image de ${result.name}`} 
                        style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} 
                    />
                ) : 
                        
                (
                            
                    <div style={{ fontSize: '40px' }}>
                        <FontAwesomeIcon icon={faCar} />
                    </div>
                )
           }
                        
          <button onClick={() => handleConsultClick(result.id)}>Consulter</button>
        </div>

        

      ))}
    </div>
  );
};

export default SearchResults;