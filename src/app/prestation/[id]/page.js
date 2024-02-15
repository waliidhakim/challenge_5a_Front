// // src/app/prestation/[id]/page.js
"use client"
import React, { useState, useEffect } from 'react';
import fetchData from '@/app/lib/fetchData';
// import Calendar from '../../../../components/Calendar/Calendar';
// import TimeslotCalendar from 'react-timeslot-calendar';
import ScheduleSelector from 'react-schedule-selector'
import Navbar from '../../../../components/NavBar/Navbar';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar } from '@fortawesome/free-solid-svg-icons';
import styles from '../[id]/prestation.css';



const PrestationPage = ({ params }) => {
  const [prestation, setPrestation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);
  const router = useRouter();
  const {id} = params;

  const [schedule, setSchedule] = useState([]);

  const handleChange = newSchedule => {
    console.log("change in the table");
    console.log(newSchedule);
    setSchedule(newSchedule);
  };

  
  

  useEffect(() => {
    console.log("id prestation : ", id);
    if (params.id) {
      const fetchPrestationDetail = async () => {
        try {
          const data = await fetchData(`${process.env.NEXT_PUBLIC_API_URL}/prestations/${id}`);
          setPrestation(data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching prestation details:', error);
          setError(error);
          setLoading(false);
        }
      };
      fetchPrestationDetail();
    }
  }, [id]);

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
        startDate: 'February 11th 2024, 1:00:00 PM',
        format: 'MMMM Do YYYY, h:mm:ss A',
    },
    {
        startDate: 'January 26th 2024, 10:00:00 AM',
        format: 'MMMM Do YYYY, h:mm:ss A',
    }
    ]

    let onSelectTimeslot = (allTimeslots, lastSelectedTimeslot) => {
        console.log(lastSelectedTimeslot.startDate); // MomentJS object.
        console.log("ddddd"); // MomentJS object.
      
      }
    let timeslotProps = {
        format: 'h', // Each element in the timeslot array is an Hour
        showFormat: 'h:mm A', // They will be displayed as Hour:Minutes AM/PM
    }

    const handlePaymentButtonClick = () => {
      const scheduleString = encodeURIComponent(JSON.stringify(schedule));
      router.push(`/payment?prestationId=${prestation.id}&prestationName=${encodeURIComponent(prestation.name)}&schedule=${scheduleString}`);
    };



  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error.message}</div>;

  return (
    <div>
      <Navbar></Navbar>
      {prestation && (
        <>
          <h1>{prestation.name}</h1>
          <div className='prestaContainer'>
          {/* <img src="https://challange-esgi.s3.eu-central-1.amazonaws.com/users/125.jpg" alt={prestation.name} /> */}
          {prestation.image ? 
                (
                    <img 
                        src={prestation.image} 
                        alt={`Image de ${prestation.name}`} 
                        // style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} 
                    />
                ) : 
                        
                (
                            
                    <div style={{ fontSize: '40px', }}>
                        <FontAwesomeIcon icon={faCar} />
                    </div>
                )
           }
          
          
          <p> <span className='test'>Description: </span>{prestation.description}</p>
          <p><span className='test'>Prix: </span>{prestation.price} €</p>
          <p><span className='test'>Etablissement: </span>{prestation.establishment.name}</p>
          <p><span className='test'>Adresse de l'établissement:</span>{prestation.establishment.address}</p>
          </div>
          <h2>Choisir un créneau </h2>
          <div className='Container'>
          <ScheduleSelector
            selection={schedule}
            numDays={5}
            minTime={8}
            maxTime={17}
            hourlyChunks={1}
            dateFormat={'MMMM Do'}
            onChange={handleChange}
            disabledTimeslots={disabledTimeslots}
            selectedColor= {'rgba(16, 1, 248, 1)'}
          />


          <button onClick={handlePaymentButtonClick}>Valider</button>
</div>
        </>
      )}
    </div>
  );
};

export default PrestationPage;





