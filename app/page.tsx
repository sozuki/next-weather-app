import {Search} from "@/app/ui/search";
import {Cities} from "@/app/ui/cities";

export default function Page() {
  return (
    <div className="flex flex-col gap-16 w-full min-h-screen bg-black px-10">
      <div className="mt-16">
        <Search />
      </div>
      <div className="">
        <Cities />
      </div>
    </div>
  );
}

