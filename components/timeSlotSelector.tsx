import React, { useState } from 'react';

interface TimeSlot {
  time: string;
  available: boolean;
}

interface TimeSlotSelectorProps {
  timeSlots?: TimeSlot[]; // Liste des créneaux horaires avec disponibilité
  onSelect: (timeSlot: string) => void; // Callback pour renvoyer le créneau sélectionné
}

const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({ timeSlots = [], onSelect }) => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  const handleTimeSlotClick = (timeSlot: string) => {
    setSelectedTimeSlot(timeSlot);
    onSelect(timeSlot); // Appel de la fonction de rappel avec le créneau sélectionné
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      {/* Vérifie que timeSlots est bien un tableau avant d'utiliser .map */}
      {Array.isArray(timeSlots) && timeSlots.map(({ time, available }) => (
        <button
          type="button" // Prévient l'envoi d'un formulaire
          key={time}
          className='max-w-25'
          onClick={() => available && handleTimeSlotClick(time)} // Seuls les créneaux disponibles sont cliquables
          style={{
            padding: '10px 15px',
            borderRadius: '5px',
            border: selectedTimeSlot === time ? '2px solid #ff495f' : '1px solid #ddd',
            backgroundColor: available ? (selectedTimeSlot === time ? '#ff495f' : '#f9f9f9') : '#e0e0e0',
            color: available ? (selectedTimeSlot === time ? '#020817' : '#333') : '#777',
            cursor: available ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s ease',
          }}
          disabled={!available} // Désactive les créneaux non disponibles
        >
          {time}
        </button>
      ))}
    </div>
  );
};

export default TimeSlotSelector;