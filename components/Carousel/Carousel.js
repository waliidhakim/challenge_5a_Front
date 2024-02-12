import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import Link from 'next/link';
import styles from './Carousel.module.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import fetchData from '@/app/lib/fetchData';
import { useAppContext } from '../contextTest2/context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faUser } from '@fortawesome/free-solid-svg-icons';


const PrestationsCarousel = () => {
  const [prestations, setPrestations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {user, setUser} = useAppContext();

  // console.log("infos user from carousel", user);  

  useEffect(() => {
    const fetchPresataires = async () => {
      try {
        const data = await fetchData(`${process.env.NEXT_PUBLIC_API_URL}/prestations`);
        console.log("les prestations : ", data['hydra:member']);
        setPrestations(data['hydra:member']);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching prestations:', error);
        setError(error);
        setLoading(false);
      }
    };
    fetchPresataires();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div style={{width : "900px"}}>
      <h2>Prestations</h2>
      <Slider {...settings}>
        {prestations.map((prestation) => (
          <div key={prestation.id} className={styles.carouselItem}>
            <Link href={`/prestation/${prestation.id}`}>
              
                {/* <img src="https://challange-esgi.s3.eu-central-1.amazonaws.com/users/125.jpg" alt={prestation.name} /> */}
                {prestation.image ? (
                                            <img 
                                                src={prestation.image} 
                                                alt={`Image de ${prestation.name}`} 
                                                style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} 
                                            />
                                        ) : (
                                            
                                            <div style={{ fontSize: '40px' }}>
                                                <FontAwesomeIcon icon={faCar} />
                                            </div>)}
                <h3>{prestation.name}</h3>
              
            </Link>
            <p>{prestation.description}</p>
            <p>Prix: {prestation.price}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PrestationsCarousel;
