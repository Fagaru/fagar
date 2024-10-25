// import { Schedule } from '@/types/corporation';
// import { addMinutes, format } from 'date-fns';
// import { z } from 'zod';

// /**
//  * Convertit une heure au format 'HH:mm' en minutes à partir de minuit.
//  */
// function timeToMinutes(time: string): number {
//     const [hours, minutes] = time.split(':').map(Number);
//     return hours * 60 + minutes;
// }

// /**
//  * Génère une liste de créneaux horaires en fonction des horaires d'ouverture, de fermeture et de la durée de réservation.
//  */
// function generateTimeSlotsForDay(
//     openingTime: string,
//     closingTime: string,
//     durationBooking: string
// ): string[] {
//     const openingMinutes = timeToMinutes(openingTime);
//     const closingMinutes = timeToMinutes(closingTime);
//     const durationMinutes = timeToMinutes(durationBooking);

//     const timeSlots = [];
//     let currentStart = openingMinutes;

//     while (currentStart + durationMinutes <= closingMinutes) {
//         const startHours = Math.floor(currentStart / 60);
//         const startMinutes = currentStart % 60;
//         const endHours = Math.floor((currentStart + durationMinutes) / 60);
//         const endMinutes = (currentStart + durationMinutes) % 60;

//         const formattedStart = `${String(startHours).padStart(2, '0')}:${String(startMinutes).padStart(2, '0')}`;
//         const formattedEnd = `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`;

//         timeSlots.push(`${formattedStart}-${formattedEnd}`);

//         currentStart += durationMinutes;
//     }

//     return timeSlots;
// }

// /**
//  * Récupère les créneaux horaires disponibles pour une date et une entreprise données, en tenant compte du jour de la semaine.
//  */
// export function getTimeSlotsForDate(
//     schedules: Schedule[],
//     chosenDate: Date,
//     durationBooking: string
// ): string[] {
//     const dayOfWeek = chosenDate.getDay(); // Récupère le jour de la semaine de la date (0 pour dimanche, etc.)

//     // Trouve le planning correspondant au jour de la semaine
//     const scheduleForDay = schedules?.find(schedule => schedule.dayWeek === dayOfWeek);
//     if (!scheduleForDay || scheduleForDay.available === "closed") {
//         return []; // Pas de créneaux disponibles si le jour est marqué comme fermé
//     }

//     const timeSlots: string[] = [];

//     // Génére les créneaux du matin si disponibles
//     if (scheduleForDay.begin_am && scheduleForDay.end_am) {
//         timeSlots.push(
//             ...generateTimeSlotsForDay(scheduleForDay.begin_am, scheduleForDay.end_am, durationBooking)
//         );
//     }

//     // Génére les créneaux de l'après-midi si disponibles
//     if (scheduleForDay.begin_pm && scheduleForDay.end_pm) {
//         timeSlots.push(
//             ...generateTimeSlotsForDay(scheduleForDay.begin_pm, scheduleForDay.end_pm, durationBooking)
//         );
//     }

//     return timeSlots;
// }

import { Schedule } from '@/types/corporation';
import { addMinutes, format } from 'date-fns';

interface TimeSlot {
    time: string;
    available: boolean;
}

/**
 * Convertit une heure au format 'HH:mm' en minutes à partir de minuit.
 */
function timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
}

/**
 * Génère une liste de créneaux horaires disponibles en fonction des horaires d'ouverture, de fermeture,
 * de la durée de réservation et des créneaux déjà réservés.
 */
function generateTimeSlotsForDay(
    openingTime: string,
    closingTime: string,
    durationBooking: string,
    bookedSlots: string[] // Liste des créneaux déjà réservés
): TimeSlot[] { //string[] {
    const openingMinutes = timeToMinutes(openingTime);
    const closingMinutes = timeToMinutes(closingTime);
    const durationMinutes = timeToMinutes(durationBooking);

    // const timeSlots: string[] = [];
    const timeSlots: TimeSlot[] = [];
    let currentStart = openingMinutes;

    while (currentStart + durationMinutes <= closingMinutes) {
        const startHours = Math.floor(currentStart / 60);
        const startMinutes = currentStart % 60;
        const endHours = Math.floor((currentStart + durationMinutes) / 60);
        const endMinutes = (currentStart + durationMinutes) % 60;

        const formattedStart = `${String(startHours).padStart(2, '0')}:${String(startMinutes).padStart(2, '0')}`;
        const formattedEnd = `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`;
        const timeSlot = `${formattedStart}-${formattedEnd}`;

        // Vérifie si le créneau est déjà réservé
        const isAvailable = !bookedSlots.includes(timeSlot);
        timeSlots.push({ time: timeSlot, available: isAvailable });
        // if (!bookedSlots.includes(timeSlot)) {
        //     timeSlots.push(timeSlot);
        // }

        currentStart += durationMinutes;
    }

    return timeSlots;
}

/**
 * Récupère les créneaux horaires disponibles pour une date et une entreprise données, en tenant compte
 * du jour de la semaine et des créneaux déjà réservés.
 */
export function getTimeSlotsForDate(
    schedules: Schedule[],
    chosenDate: Date,
    durationBooking: string,
    bookedSlots: string[] // Liste des créneaux déjà réservés pour la date donnée
): string[] {
    const dayOfWeek = chosenDate.getDay(); // Récupère le jour de la semaine de la date (0 pour dimanche, etc.)

    // Trouve le planning correspondant au jour de la semaine
    const scheduleForDay = schedules?.find(schedule => schedule.dayWeek === dayOfWeek);
    if (!scheduleForDay || scheduleForDay.available === "closed") {
        return []; // Pas de créneaux disponibles si le jour est marqué comme fermé
    }

    const timeSlots: string[] = [];

    // Génère les créneaux du matin si disponibles
    if (scheduleForDay.begin_am && scheduleForDay.end_am) {
        timeSlots.push(
            ...generateTimeSlotsForDay(scheduleForDay.begin_am, scheduleForDay.end_am, durationBooking, bookedSlots)
        );
    }

    // Génère les créneaux de l'après-midi si disponibles
    if (scheduleForDay.begin_pm && scheduleForDay.end_pm) {
        timeSlots.push(
            ...generateTimeSlotsForDay(scheduleForDay.begin_pm, scheduleForDay.end_pm, durationBooking, bookedSlots)
        );
    }

    return timeSlots;
}
