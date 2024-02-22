'use client';

import {Icon} from "@iconify/react";
import Link from "next/link";

export function SearchIcon() {
  return (
    <div className="flex justify-end items-center h-10 w-full">
      <Link href="/">
        <Icon icon="icons8:search"
              className="text-white fill-white w-8 h-8"/>
      </Link>
    </div>
  )
}