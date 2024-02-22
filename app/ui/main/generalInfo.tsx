'use client';

// temporary objects
import {useParams, usePathname} from "next/navigation";
import {useEffect, useState} from "react";
import {number} from "prop-types";

interface timeZones {
  city: string,
  name: string
}

const timeZones: timeZones[] = [
  {
    city: "Accra",
    name: "Africa/Accra"
  }
];
const months: string[] = [
  "", "January", "February", "March", "April", "May", "June", // "" 0 month is not valid
  "July", "August", "September", "October", "November", "December"
];

// temporary function
function getCityTimezone(city: string): string {
  const timeZone = timeZones.find(timeZone => timeZone.city === city);
  if (timeZone) return timeZone.name;
  return "";
}


export function GeneralInfo() {
  const {day} = useParams();
  return (
    <div className="flex flex-col w-full pb-2 gap-16 pt-4">
      <DateC day={day}/>
      <Termometer/>
      <WarningAndAirQuality/>
    </div>
  )
}

export function Termometer() {
  const temp: number = 23;
  return (
    <div className="flex items-center">
      <div className="basis-1/2">
        <svg xmlns="http://www.w3.org/2000/svg" width="5rem" height="5rem" viewBox="0 0 32 32">
          <path fill="white" d="M20 10h7v2h-7zm0 6h10v2H20zm0 6h7v2h-7zm-10-1.816V7H8v13.184a3 3 0 1 0 2 0"/>
          <path fill="white"
                d="M30 4H12.974A4.983 4.983 0 0 0 4 7v11.11a7 7 0 1 0 10 0V7a5.002 5.002 0 0 0-.101-1H30ZM9 28a4.993 4.993 0 0 1-3.332-8.718L6 18.983V7a3 3 0 0 1 6 0v11.983l.332.299A4.993 4.993 0 0 1 9 28"/>
        </svg>
      </div>
      <div className="basis-1/2 flex items-center justify-center">
        <p className="text-lg">{temp}&deg; C</p>
      </div>
    </div>
  )
}

interface Props {
  day: string | string[];
}

export function DateC({ day }: Props) {
  const timeZone: string = getCityTimezone(usePathname().split('/')[1]);
  const currentDateTime: string = new Date().toLocaleString("en-US", { timeZone: timeZone, hour12: false });
  const options = { timeZone: timeZone, hour12: false };
  
  const today: string = currentDateTime;
  
  const tomorrow: Date = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const tomorrowFormatted: string = tomorrow.toLocaleString("en-US", options);
  
  const [dateParts, setDateParts] = useState<string[]>(today.split(", "))
  // if (day === "tomorrow") setDateParts(tomorrowFormatted.split(", "));
  const [displayedDay, setDisplayedDay] = useState<string>(dateParts[0].split('/')[1])
  const [month, setMonth] = useState<number>(Number(dateParts[0].split('/')[0]))
  const [hour, setHour] = useState<string>(dateParts[1].split(':')[0])
  const [minute, setMinute] = useState<string>(dateParts[1].split(':')[1])
  const [time, setTime] = useState<string>(`${displayedDay} ${months[month - 1].toUpperCase()}, ${hour}:${minute}`)
  // useEffect(() => {
    // if (day === "tomorrow") {
    //   setTime(`${displayedDay} ${months[month - 1].toUpperCase()}, ${hour}:${minute}`
    // }
  // }, []);
  // console.log("render")
  return (
    <div className="flex flex-col w-full">
      <p>{time}</p>
      <p>LIGHT SHOWERS</p>
    </div>
  );
}



export function WarningAndAirQuality() {
  const warning: string = "RED WARNING FOR HEAVY RAINFALL";
  const airQuality: string = "FAIR";
  return (
    <div className="flex flex-col max-w-[50vw] gap-4">
      <p>{warning}</p>
      <p>AIR QUALITY: {airQuality}</p>
    </div>
  )
}