"use client"


import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import fetchData from '../lib/fetchData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../../../components/NavBar/Navbar';
import './payment.css'

const stripePromise = loadStripe('pk_test_51NVqQtKRXD3JBQTy6JIY4sIGD0JjJN5B3XuwwjUgixkigGpr97sUWtQzYtqz2MxT98PE5iEUcrTs1smFQ7ecb71m000jBmKkLL');

const CheckoutButton = () => {


  // const router = useRouter();
  const searchParams = useSearchParams();
  
  const [user, setUser] = useState();
  const [errorUser, setErrorUser] = useState(null);
  
  const [prestationDetails, setPrestationDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const idPresta = searchParams.get('prestationId');
  const prestaSchedule = searchParams.get('schedule');

  console.log( "Id Prestation : ",searchParams.get('prestationId'));
  console.log( "Prestation schedule : ",searchParams.get('schedule'));

  const fetchPrestationDetail = async () => {
    try {
      const data = await fetchData(`${process.env.NEXT_PUBLIC_API_URL}/prestations/${idPresta}`);
      setPrestationDetails(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching prestation details:', error);
      setError(error);
      setLoading(false);
    }
  };

  const fetchUser = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${localStorage.getItem("userId")}`, {
          method: 'GET',
          headers: {
              'Accept': 'application/ld+json',
              'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`,
              'Content-Type': 'application/ld+json',
          },
      });

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setUser(data);
      
    } catch (error) {
      console.error('Error fetching user details:', error);
      setErrorUser(error);
    }
  };
  
  useEffect(() => {
    
    fetchPrestationDetail();
    fetchUser();

  }, []);
  
  
  
  const handleCheckout = async () => {
      const stripe = await stripePromise;
      const requestData = {
        productName: prestationDetails.name ?? "Produit",
        price: prestationDetails.price ?? 100,
        // imageUrl: prestationDetails.image, // remettre ça après 
        imageUrl : "https://challange-esgi.s3.eu-central-1.amazonaws.com/users/125.jpg",
        idPresta : idPresta,
        prestaSchedule : prestaSchedule, 
        userId : localStorage.getItem('userId')
        
    };
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL_SHORT}/create-checkout-session`, 
            { 
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem("jwtToken")}`
              },
              body: JSON.stringify(requestData)
            });
      const session = await response.json();

      const result = await stripe.redirectToCheckout({
          sessionId: session.id,
      });

      if (result.error) {
          console.error(result.error.message);
      }
  };

    return (
      <>
      <div><Navbar></Navbar></div>
        <h1>Récapitulatif</h1>
        {loading ? <p>Chargement...</p> : (
          <>
            <div className='paymentContainer'>
              <h2>Détails de la Prestation</h2>
              <p>Nom: {prestationDetails.name}</p>
              <p>Prix: {prestationDetails.price}€</p>
              <p>Catégorie: {prestationDetails.category?.name}</p>
              {prestationDetails.image ? (
                                            <img 
                                                src={prestationDetails.image} 
                                                alt={`Image de ${prestationDetails.name}`} 
                                                style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} 
                                            />
                                        ) : (
                                            
                                            <div style={{ fontSize: '40px' }}>
                                                <FontAwesomeIcon icon={faCar} />
                                            </div>)}
            </div>


            <div className='paymentContainer'>
              <h2>Vos Informations</h2>
              <p>Nom: {user?.firstname} {user?.lastname}</p>
              <p>Adresse: {user?.address}</p>
            </div>
            <div className='paymentContainer'>
              <h2>Planning Choisi</h2>
              <p>{prestaSchedule ??
                <span key={index}>{new Date(date).toLocaleString()}</span>
              }</p>

            </div>
            <button onClick={handleCheckout}>Payer maintenant</button>
          </>
          
        )}
      </>
      
    );
};

export default CheckoutButton;



