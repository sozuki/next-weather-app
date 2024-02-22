import Link from "next/link";

export function Cities() {
  return (
    <div className="h-full w-full flex flex-col gap-8">
      <City city={"Accra"} country={"Ghana"}/>
      <City city={"Accra"} country={"Ghana"}/>
      <City city={"Accra"} country={"Ghana"}/>
      <City city={"Accra"} country={"Ghana"}/>
      <City city={"Accra"} country={"Ghana"}/>
      <City city={"Accra"} country={"Ghana"}/>
    </div>
  )
}
export function City({city, country} : {city:string, country:string}) {
  return (
    <Link href={`/${city}/main/today/`} className="flex border-2 border-white rounded-2xl w-full h-16 px-10">
      <p className="mr-auto h-full flex justify-center items-center">{city}</p>
      <p className="h-full flex justify-center items-center">{country}</p>
    </Link>
  )
}
