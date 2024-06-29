
"use client";
import { useEffect, useState } from 'react';
import * as React from "react"
import {Corporation as CorporationType} from "@/types/corporation";
import getCorporations from '@/services/getCorporations';
import getCategory from '@/services/getCategory';
import { Category } from '@/types/category';

const daysOfWeek = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

interface scheduleProps{
    Corpo: CorporationType
};

const Schedulas:React.FC < scheduleProps> = ({Corpo})=> {
    const today = new Date().getDay(); // jour actuel de la semaine (0-6, 0 étant dimanche)
    const hour = new Date().getHours();
    const now= new Date()
    const timeString = now.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false });
    console.log("hbjvjlziuflzfzefz",timeString)
    const schedulesToday = Corpo?.schedules.filter(schedule => schedule.dayWeek == today);

 
        
            // if (!corporation?.schedules || corporation.schedules.length === 0) {
            //     return <p className="text-center text-gray-500">Horaires non disponibles</p>;

            // }
    

            // if (schedulesToday.length === 0) {
            //     return null;
            // }
            
            

            // console.log("teh most importanttttttttttt",schedulesToday)
        

     const isToday = schedulesToday?.[0]?.dayWeek == today;
    
    const begin_am = new Date(`01/01/2000 ${schedulesToday?.[0]?.begin_am}`);
    const end_am= new Date(`01/01/2000 ${schedulesToday?.[0]?.end_am}`);
    const begin_pm = new Date(`01/01/2000 ${schedulesToday?.[0]?.begin_pm}`);
    const end_pm= new Date(`01/01/2000 ${schedulesToday?.[0]?.end_pm}`);
    const time_date= new Date(`01/01/2000 ${timeString}`);
    const data=(begin_am) <= time_date && time_date <= (end_am)
                    {/* <div className="fon,-semibold text-gray-800">{Corpo.name}</div> */}
    // Comparer les dates
    if ((schedulesToday?.[0]?.available !== "closed") && ((begin_am < time_date && time_date < end_am) || (begin_pm < time_date && time_date < end_pm))) {
    console.log(`OUVERTTTTTTTTTTTTTTTTTTTTTTTTUREEEEEEEEEEEEEEEEEEE`);
    } else  {
    console.log(`Available`,schedulesToday?.[0]?.available,"\nOuverture",begin_am,);
  }
                 
                       

    return (
                            <div  className={`p-2 ${isToday ? "bg-rose-100 rounded-[10px] shadow-md" : ""} flex flex-col space-y-2`}>
                                {/* <div className={`font-semibold ${isToday ? "text-rose-600" : "text-gray-800"}`}>{daysOfWeek[schedule.dayWeek]}</div> */}
                                <div>

                                    {(schedulesToday?.[0]?.available != "closed") && (begin_am < time_date && time_date < end_am) || (begin_pm < time_date && time_date < end_pm)? (
                                        <div className="text-green-600">ouvert</div>
                                    ) : (
                                        <div className="text-red-600">fermé</div>
                                            
                                    )}
                                </div>
                            </div>
                        );
                
                
            
        
}

export default Schedulas;
