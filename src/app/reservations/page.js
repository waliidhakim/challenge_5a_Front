"use client"


import React, { useState, useEffect } from 'react';
import Navbar from '../../../components/NavBar/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import styles from './ReservationPage.module.css'; // Assurez-vous de créer ce fichier CSS pour le style
import fetchData from '../lib/fetchData';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [bookings, setBookings] = useState([]);

  const router = useRouter();

  const fetchBookings = async () => {
    try {
      const data = await fetchData(`${process.env.NEXT_PUBLIC_API_URL}/bookings`);
      setBookings(data['hydra:member']);
    } catch (error) {
      console.error('Erreur lors de la récupération des réservations:', error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    const isConfirmed = window.confirm("Êtes-vous sûr de vouloir annuler cette réservation ?");
    if (!isConfirmed) {
      return; 
    }
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/${bookingId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`, // Assurez-vous d'envoyer le JWT token si nécessaire
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log(`Réservation ${bookingId} annulée avec succès.`);
      //Recharger les réservations
      fetchBookings();

      // autre: Filtrer la réservation supprimée
      // setBookings(bookings.filter(booking => booking.id !== bookingId));
    } catch (error) {
      console.error('Erreur lors de la suppression de la réservation:', error);
    }
  };

  const handleUpdateBooking = (bookingId) =>{
    console.log("Update the Booking with the ID : ", bookingId);
    router.push(`/reservations/${bookingId}`);
  }
  return (
    <>
      <Navbar />
      <h1 className={styles.title}>Mes réservations</h1>
      <div className={styles.reservationList}>
        {bookings.map((booking) => (
          <div key={booking.id} className={styles.card}>
            {booking.prestation.image ? (
              <img src={booking.prestation.image} alt={booking.prestation.name} className={styles.image} />
            ) : (
              <div className={styles.icon}>
                <FontAwesomeIcon icon={faTimesCircle} size="3x" />
              </div>
            )}
            <div className={styles.details}>
              <h2>{booking.prestation.name} - {new Date(booking.bookingDate).toLocaleString()}</h2>
              <p>Prix: {booking.prestation.price}€</p>
              <p>Réservé par: {booking.bookedBy.firstname} {booking.bookedBy.lastname}</p>
              <button onClick={() => handleCancelBooking(booking.id)} className={styles.cancelButton}>Annuler</button>
              <button onClick={() => handleUpdateBooking(booking.id)} className={styles.updateButton}>Changer le créneau</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
