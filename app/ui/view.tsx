'use client'
import {useParams} from "next/navigation";

export function View() {
  const {day} = useParams();
  return (
    <p className="">Chosen view is {day}</p>
  )
}