// components/Calendar.js
import React, { useState } from 'react';

const Calendar = () => {
  const timeSlots = [
    '8h-9h', '9h-10h', '10h-11h', '11h-12h', '12h-13h', 
    '13h-14h', '14h-15h', '15h-16h', '16h-17h', '17h-18h'
  ];

  const [availableSlots, setAvailableSlots] = useState(timeSlots.reduce((acc, slot) => {
    acc[slot] = true; // true indique que le créneau est disponible
    return acc;
  }, {}));

  const toggleSlotAvailability = (slot) => {
    setAvailableSlots(prevSlots => ({
      ...prevSlots,
      [slot]: !prevSlots[slot]
    }));
  };

  return (
    <div>
      {timeSlots.map(slot => (
        <div key={slot} 
             style={{ 
               color: 'white', 
               backgroundColor: availableSlots[slot] ? 'green' : 'red',
               margin: '10px', 
               padding: '10px', 
               cursor: 'pointer'
             }}
             onClick={() => toggleSlotAvailability(slot)}>
          {slot}
        </div>
      ))}
    </div>
  );
};

export default Calendar;
