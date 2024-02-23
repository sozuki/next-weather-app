import {SearchIcon} from "@/app/ui/main/searchIcon";
import {GeneralInfo} from "@/app/ui/main/generalInfo";


export default function Page() {
  return (
    <div className="grow pb-4 flex flex-col px-6 justify-around" style={{alignContent: "space-around"}}>
      <SearchIcon/>
      <GeneralInfo/>
    </div>
  )
}