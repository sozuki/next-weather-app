'use server';
import Link from "next/link";
import {getCities} from "@/app/lib/data";

export async function Cities({search} : {search?:string}) {
  const query = search || "";
  const cities = await getCities(query);
  const data = cities.data;
  return (
    <div className="flex flex-col gap-8">
      {data?.map((city: string[], index:number) => (
        <City key={index} city={city[0]} country="USA"/>
      ))}
    </div>
  )
}

export async function City({city, country}: { city: string, country: string }) {
  return (
    <Link href={`/${city}/main/today/`} className="flex border-2 border-white rounded-2xl w-full h-16 px-10">
      <p className="mr-auto h-full flex justify-center items-center">{city}</p>
      <p className="h-full flex justify-center items-center">{country}</p>
    </Link>
  )
}
