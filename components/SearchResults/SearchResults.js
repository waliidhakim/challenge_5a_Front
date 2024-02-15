
import React from 'react';
import styles from './SearchResults.module.css'; // Assurez-vous de créer ce fichier CSS pour le style
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faImage } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation'; // Utilisez 'next/router' au lieu de 'next/navigation'

const SearchResults = ({ results, searchMade }) => {

    const router = useRouter();

    const handleConsultClick = (idPresta) => {
      
      const role = localStorage.getItem("role");
      
      
      router.push(`/prestation/${idPresta}`);
      
  };

    return (
        <div>
            
            {searchMade && results.length === 0 ? (
                
                <div className={styles.noResults}>
                  <h2>Résultat de la recherche</h2>
                  Aucun résultat trouvé.
                </div>
            ) : (
                <div className={styles.resultsContainer}>
                    {results.map((result) => (
                        <div key={result.id}>
                          <h2>Résultat de la recherche</h2>
                          <div key={result.id} className={styles.resultCard}>
                              <h3>Nom de la prestation : {result.name}</h3>
                              <p>Prix: {result.price}€</p>
                              <p>Description : {result.description}</p>
                              {result.image ? (
                                  <img 
                                      src={result.image} 
                                      alt={`Image de ${result.name}`} 
                                      style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} 
                                  />
                              ) : (
                                  <div style={{ fontSize: '40px' }}>
                                      <FontAwesomeIcon icon={faImage} />
                                  </div>
                              )}
                              <button onClick={() => handleConsultClick(result.id)}>Consulter</button>
                          </div>

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchResults;
