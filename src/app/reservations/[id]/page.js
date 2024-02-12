"use client"
import React, { useState, useEffect } from 'react';
import Navbar from '../../../../components/NavBar/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import fetchData from '@/app/lib/fetchData';
import ScheduleSelector from 'react-schedule-selector';
import moment from 'moment';

export default function Page({ params }) {
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [availableDates, setAvailableDates] = useState([]);
//   const [disabledTimeslots,setDisabledTimeslots] = useState([]);
  const [schedule, setSchedule] = useState([]);

//   const calculateDisabledTimeslots = () => {
//     const now = moment();
//     const timeslots = [];

//     for (let hour = 8; hour < now.hour(); hour++) {
//       timeslots.push({
//         //startDate: now.clone().hour(hour).minute(0).format('MMMM Do YYYY, h:mm:ss A'),
//         startDate:'February 11th 2024, 2:00:00 PM',
//         format: 'MMMM Do YYYY, h:mm:ss A',
//       });
//     }

//     setDisabledTimeslots(timeslots);
//   };

  const getBookingDetails = async () => {
    try {
      const data = await fetchData(`${process.env.NEXT_PUBLIC_API_URL}/bookings/${params.id}`);
      setBookingDetails(data);
    } catch (err) {
      console.error('Failed to fetch booking details:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBookingDetails();

    //calculateDisabledTimeslots();
  }, [params.id]);

  let timeslots = [
    ["9", "10"], 
    ["10", "11"], 
    ["11", "12"],  
    ["14", "15"],  
    ["15", "16"],  
    ["16", "17"],  
  ];

  let ignoreWeekends = {
    'saturdays': false,
    'sundays': false,
    'mondays' : false,
    'saturdays' : false
  }

    let disabledTimeslots = [
    {
        startDate: 'February 12th 2024, 2:00:00 PM',
        format: 'MMMM Do YYYY, h:mm:ss A',
    },
    {
        startDate: 'January 26th 2024, 10:00:00 AM',
        format: 'MMMM Do YYYY, h:mm:ss A',
    }
    ]

    let onSelectTimeslot = (allTimeslots, lastSelectedTimeslot) => {
        console.log(lastSelectedTimeslot.startDate); 

      
      }
    let timeslotProps = {
        format: 'h', // Each element in the timeslot array is an Hour
        showFormat: 'h:mm A', // They will be displayed as Hour:Minutes AM/PM
    }

    const handlePaymentButtonClick = () => {
      
      router.push(`/payment?prestationId=${prestation.id}&prestationName=${encodeURIComponent(prestation.name)}&schedule=${scheduleString}`);
    };

    const handleChange = newSchedule => {
        console.log("change in the table");
        console.log(newSchedule);
        setSchedule(newSchedule);
    };

    const handleSubmit = async () => {
        // Assurez-vous qu'un créneau a été sélectionné
        if (schedule.length === 0) {
            console.error('Aucun créneau sélectionné');
            return;
        }

        // Prend le premier créneau sélectionné pour cet exemple
        const selectedDate = schedule[0].toISOString();

        console.log("new booking date : ", selectedDate);

        try {
            const token = localStorage.getItem('jwtToken');
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/${params.id}`, { // Assurez-vous que l'URL est correcte
                method: 'PATCH',
                headers: {
                    'Accept': 'application/ld+json',
                    'Authorization': token ? `Bearer ${token}` : '',
                    'Content-Type': 'application/merge-patch+json',
                },
                body: JSON.stringify({
                    bookingDate: selectedDate
                }),
            });

            if (!response.ok) {
                throw new Error(`Failed to update booking, status: ${response.status}`);
            }

            // Mise à jour réussie
            await getBookingDetails(); // Actualisez les détails de la réservation si nécessaire
            console.log('Booking updated successfully');
        } catch (error) {
            console.error('Error updating booking:', error);
        }
    };


  return (
    <>
      <Navbar></Navbar>
      {loading && <p>Chargement de la réservation...</p>}
      {error && <p>Erreur lors de la récupération de la réservation: {error.message}</p>}
      {!loading && !error && (
        <div style={{ padding: '20px', margin: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
          <h1>Réservation d'ID : {params.id}</h1>
          {bookingDetails ? (
            <>
              <div>
                {bookingDetails.prestation.image ? (
                  <img src={bookingDetails.prestation.image} alt="Prestation" style={{ width: '100px', height: '100px', borderRadius: '5px' }} />
                ) : (
                  <FontAwesomeIcon icon={faImage} size="3x" />
                )}
                <h2>{bookingDetails.prestation.name}</h2>
                <p>Date: {new Date(bookingDetails.bookingDate).toLocaleString()}</p>
                <p>Prix: €{bookingDetails.prestation.price}</p>
                <p>Réservée par : {bookingDetails.bookedBy.firstname} {bookingDetails.bookedBy.lastname}</p>
              </div>
            </>
          ) : (
            <p>Aucune réservation trouvée</p>
          )}
        </div>
      )}

      <h2>Choisir un nouveau créneau </h2>

      <ScheduleSelector
            selection={schedule}
            numDays={5}
            minTime={8}
            maxTime={17}
            hourlyChunks={1}
            dateFormat={'MMMM Do'}
            onChange={handleChange}
            disabledTimeslots={disabledTimeslots}
        />

        <button onClick={handleSubmit } >Valider</button>

    </>
  );
}