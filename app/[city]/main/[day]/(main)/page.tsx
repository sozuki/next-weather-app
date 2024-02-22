import {SearchIcon} from "@/app/ui/main/searchIcon";
import {GeneralInfo} from "@/app/ui/main/generalInfo";


export default function Page() {
  return (
    <div className="flex flex-col px-6">
      <SearchIcon />
      <GeneralInfo />
    </div>
  )
}