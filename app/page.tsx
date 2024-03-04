import {Search} from "@/app/ui/search";
import {CitiesLoader} from "@/app/ui/cities";

export default function Page({searchParams}: {
  searchParams?: {
    city?: string
  }
}) {
  const search = searchParams?.city || '';
  return (
    <div className="flex flex-col gap-16 w-full min-h-screen bg-black px-10">
      <div className="mt-16">
        <Search search={search}/>
      </div>
      <div className="">
        <CitiesLoader search={search}/>
      </div>
    </div>
  );
}

