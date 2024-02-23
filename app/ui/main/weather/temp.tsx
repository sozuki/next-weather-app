'use client';
import {Icon} from "@iconify/react";

export function Temp() {
  const temp = 23
  return (
    <div className="flex w-full">
      <div className="flex flex-col basis-1/2 justify-center items-center">
        <p className="text-5xl w-full mb-4">{temp}</p>
        <p className="w-full">DAY 32&deg;</p>
        <p className="w-full">NIGHT 32&deg;</p>
        <p className="w-full">FEELS LIKE 32&deg;</p>
      </div>
      <div className="flex flex-col basis-1/2 justify-center items-center">
        <div className="grow w-full flex justify-center">
          <Icon icon="fluent:weather-snow-24-regular" style={{color: "white"}} className="h-full w-auto"/>
        </div>
        <p>SHOWERS</p>
      </div>
    </div>
  )
}