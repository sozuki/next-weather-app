'use client';
import {BarChart, Card} from '@tremor/react';
import {useState} from 'react';


const data = [
  {
    date: '7PM',
    "temp": 23
  },
  {
    date: '8PM',
    "temp": 22
  },
  {
    date: '9PM',
    "temp": 21
  },
  {
    date: '10PM',
    "temp": 19
  },
  {
    date: '11PM',
    "temp": 17
  },
  {
    date: '12PM',
    "temp": 14
  },
];
//
// function valueFormatter(number) {
//   // const formatter = new Intl.NumberFormat('en-US', {
//   //   maximumFractionDigits: 0,
//   //   notation: 'compact',
//   //   compactDisplay: 'short',
//   //   style: 'currency',
//   //   currency: 'USD',
//   // });
//
//   return formatter.format(number);
// }

export function TempChart() {
  const [showComparison, setShowComparison] = useState(false);
  return (
    <>
      <Card className=" max-w-2xl bg-black border-none mt-10">
        {/*<h3 className="text-lg text-center">Temperature chart</h3>*/}
        <BarChart
          data={data}
          index="date"
          categories={["temp"]}
          colors={["cyan"]}
          // showYAxis={false}
          showLegend={false}
          showGridLines={false}
          className="mt-4 h-32 sm:hidden border-none"
        
        />
      </Card>
    </>
  );
}

import {DonutChart} from '@tremor/react';
import {useParams, usePathname} from "next/navigation";
import {getCityTimezone} from "@/app/ui/main/generalInfo";

interface Data {
  name: string,
  value: number
}

const datahero = [
    [
      {name: 'rain', value: 20,},
      {name: 'no rain', value: 80,},
    ],
    [
      {name: 'rain', value: 20,},
      {name: 'no rain', value: 80,},
    ],
    [
      {name: 'rain', value: 30,},
      {name: 'no rain', value: 70,},
    ],
    [
      {name: 'rain', value: 50,},
      {name: 'no rain', value: 50,},
    ],
    [
      {name: 'rain', value: 90,},
      {name: 'no rain', value: 10,},
    ]
  ]
;

const dataFormatter = (number: number) => `${Intl.NumberFormat('us').format(number).toString()}%`;

export function DonutChartHero({datahero}: { datahero: Data[] }) {
  
  return (
    <div className="w-full">
      <DonutChart data={datahero} colors={['blue', 'white']} variant="pie"
                  showTooltip={false}
                  valueFormatter={dataFormatter}
                  onValueChange={(v) => console.log(v)}/>
    </div>
  );
}

export function DonutCharts() {
  const {day} = useParams();
  const timeZone: string = getCityTimezone(usePathname().split('/')[1]);
  const options = {timeZone: timeZone, hour12: false};
  const today: string[] = new Date().toLocaleString("en-US", options).split(", ");
  console.log(today);
  const tomorrow: Date = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  //
  const tomorrowFormatted: string[] = tomorrow.toLocaleString("en-US", options).split(", ");
  //
  const [dateParts, setDateParts] = useState<string[]>(day === "tomorrow" ? tomorrowFormatted : today);
  //
  // const [displayedDay, setDisplayedDay] = useState<string>(dateParts[0].split('/')[1])
  // const [month, setMonth] = useState<number>(Number(dateParts[0].split('/')[0]))
  const [hour, setHour] = useState<number>(Number(dateParts[1].split(':')[0]));
  // const [midday, setMiddday] = useState<string>(dateParts[1].split(' ')[1]);
  // const [minute, setMinute] = useState<string>(dateParts[1].split(':')[1])
  // const [time, setTime] = useState<string>(`${displayedDay} ${months[month - 1].toUpperCase()}, ${hour}:${minute}`)
  return (
    <div>
      
      <div className="flex justify-center items-center gap-2.5 ">
        {datahero.map((datahero, index) => {
          return (
            <div className="flex flex-col w-[20%]">
              <div className="flex justify-center items-center">
                {/*{index === 0 ? <p>CHANCE</p> : null }*/}
                  <p>{datahero[0].value}%</p>
              </div>
              <DonutChartHero datahero={datahero} key={index}/>
              <div className="flex justify-center items-center">
                <p>{hour + index}h</p>
                {/*<p>{`${hour+1} ${midday}`}</p>*/}
                {/*<p>{`${hour+2} ${midday}`}</p>*/}
                {/*<p>{`${hour+3} ${midday}`}</p>*/}
                {/*<p>{`${hour+4} ${midday}`}</p>*/}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}