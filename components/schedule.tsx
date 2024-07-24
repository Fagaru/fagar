
"use client";
import * as React from "react"
import {Corporation as CorporationType} from "@/types/corporation";
import { Badge } from "@/components/ui/badge"

const daysOfWeek = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

interface scheduleProps{
    Corpo: CorporationType
};

const Schedulas:React.FC < scheduleProps> = ({Corpo})=> {
    const today = new Date().getDay(); 
    const hour = new Date().getHours();
    const now= new Date()
    const timeString = now.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false });
    const schedulesToday = Corpo?.schedules.filter(schedule => schedule.dayWeek == today);

     const isToday = schedulesToday?.[0]?.dayWeek == today;
    
    const begin_am = new Date(`01/01/2000 ${schedulesToday?.[0]?.begin_am}`);
    const end_am= new Date(`01/01/2000 ${schedulesToday?.[0]?.end_am}`);
    const begin_pm = new Date(`01/01/2000 ${schedulesToday?.[0]?.begin_pm}`);
    const end_pm= new Date(`01/01/2000 ${schedulesToday?.[0]?.end_pm}`);
    const time_date= new Date(`01/01/2000 ${timeString}`);
                 
    return (
                            <div  className={`p-2 ${isToday ? "" : ""} flex flex-col space-y-2`}>
                                <div>
                                    {(schedulesToday?.[0]?.available != "closed") && (begin_am < time_date && time_date < end_am) || (begin_pm < time_date && time_date < end_pm)? (
                                        <Badge etat="ouvert"> <div className="">ouvert</div></Badge>
                                    ) : (
                                        <Badge etat="ferme"> <div className="">fermé</div></Badge>
                                            
                                    )}
                                </div>
                            </div>
                        );       
}

export default Schedulas;
