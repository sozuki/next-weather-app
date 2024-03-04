'use client';
import Link from "next/link";
import useSWR from "swr";
import {useInView} from "react-intersection-observer";
import useSWRInfinite from "swr/infinite";
import React, {useEffect, useRef, useState, forwardRef} from "react";
// import {getCities} from "@/app/lib/data";

const PAGE_SIZE: number = 10;

interface City {
  country: string,
  lat: string,
  lon: string,
  name: string,
  uts_time_difference: string,
  zip_code: string
}

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

export function CitiesLoader({search}: { search?: string }) {
  const [cnt, setCnt] = useState(2)
  const [ref, inView, entry] = useInView()
  useEffect(() => {
    if (inView) setCnt(prev => prev+1);
  }, [inView]);
  const pages = []
  for (let i = 1; i < cnt; i++) {
    pages.push(<Cities index={i} key={i} search={search}/>)
  }
  return (
    <div className="flex flex-col gap-8">
      {pages}
      <CitySkeletons amount={PAGE_SIZE} ref={ref}/>
    </div>
  )
}

export function Cities({search, index}: { search?: string, index: number }) {
  const city = search || "";
  const {data: response, error} = useSWR(`http://localhost:4000/cities/${city}?page=${index}&limit=${PAGE_SIZE}`, fetcher)
  
  if (error) return <div>Failed to load</div>
  if (!response) return <CitySkeletons amount={PAGE_SIZE}/>
  return (
    <div className="flex flex-col gap-8">
      {response?.data.map((city: City, index: number) => (
        <City key={index} city={city.name} country={city.country}/>
      ))}
    </div>
  )
}

export function City({city, country}: { city: string, country: string }) {
  return (
    <Link href={`/${city}/main/today/`} className="flex border-2 border-white rounded-2xl w-full h-16 px-10">
      <p className="mr-auto h-full flex justify-center items-center">{city}</p>
      <p className="h-full flex justify-center items-center">{country}</p>
    </Link>
  )
}

export function CitySkeleton() {
  return (
    <div className="flex border-2 border-gray-900 rounded-2xl w-full h-16 px-10 animate-pulse">
      <div className="mr-auto h-full flex justify-center items-center">
        <div className="h-3.5 bg-gray-900 rounded-full w-16"></div>
      </div>
      <div className="h-full flex justify-center items-center ">
        <div className="h-3.5 bg-gray-900 rounded-full w-16"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  )
}


interface CitySkeletonsProps {
  amount: number;
}

// eslint-disable-next-line react/display-name
export const CitySkeletons = forwardRef<HTMLDivElement, CitySkeletonsProps>(({ amount }, ref) => {
  return (
    <div ref={ref} className="flex flex-col gap-8">
      {Array.from({ length: amount }).map((_, index) => {
        return <CitySkeleton key={index} />;
      })}
    </div>
  );
});
