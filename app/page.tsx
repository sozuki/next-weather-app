import {Search} from "@/app/ui/search";
import {Cities} from "@/app/ui/cities";
import {getCities} from "@/app/lib/data";

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
        <Cities search={search}/>
      </div>
    </div>
  );
}

