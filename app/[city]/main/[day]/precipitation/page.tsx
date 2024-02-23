import {DateC} from "@/app/ui/main/generalInfo";
import { DonutCharts} from "@/app/ui/main/charts";

export default function Page() {
  return (
    <div className="grow pb-4 flex flex-col px-6 justify-around" style={{alignContent: "space-around"}}>
      <DateC/>
      <DonutCharts />
    </div>
  )
}