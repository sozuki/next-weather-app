'use client';
import {useParams} from "next/navigation";
import {Temp} from "@/app/ui/main/weather/temp";
import {DateC, Week} from "@/app/ui/main/generalInfo";
import {TempChart} from "@/app/ui/main/charts";

export function Weather() {
  const {day} = useParams();
  return (
    <div className="flex flex-col w-full pb-2 pt-4">
      {day !== "7days" ?
        <>
          <DateC />
          <Temp/>
          <TempChart/>
        </>
        :
        <Week/>
      }
    </div>
  )
}