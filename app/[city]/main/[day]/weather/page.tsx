import {View} from "@/app/ui/view";
import {DateC} from "@/app/ui/main/generalInfo";
import {Temp} from "@/app/ui/main/weather/temp";
import {TempChart} from "@/app/ui/main/charts";
import {Weather} from "@/app/ui/main/weather/weather";

export default function Page() {
  return (
    <div className="grow pb-4 flex flex-col px-6 justify-around" style={{alignContent: "space-around"}}>
      <Weather />
    </div>
  )
}