'use client';
import {Icon} from '@iconify/react';
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useDebouncedCallback} from "use-debounce";

export function Search({search}: { search: string }) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const {replace} = useRouter();
  const handleChange = useDebouncedCallback((value: string) => {
    setParams(value);
  }, 300);
  
  
  function setParams(value: string) {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('city', value);
    } else {
      params.delete('city');
    }
    replace(`${pathName}?${params.toString()}`);
  }
  
  return (
    <div className="relative rounded-lg ">
      {/*<input*/}
      {/*  type="text"*/}
      {/*  className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"*/}
      {/*  id="searchACity"*/}
      {/*  placeholder="SEARCH A CITY"*/}
      {/*  onChange={(e) => handleChange(e.target.value)}*/}
      {/*  defaultValue={searchParams.get('query')?.toString()}*/}
      {/*/>*/}
      {/*<label*/}
      {/*  htmlFor="searchACity"*/}
      {/*  className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-50 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"*/}
      {/*>SEARCH A CITY*/}
      {/*</label>*/}
      <div className="relative">
        <label htmlFor="city" className="block mb-2 text-sm font-medium text-white">SEARCH A CITY</label>
        <input type="text" id="city"
               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
               placeholder="New York"
               onChange={(e) => handleChange(e.target.value)}
               defaultValue={searchParams.get('query')?.toString()}/>
      <Icon icon="icons8:search"
            className="text-black fill-black absolute right-4 bottom-[15%] transform w-6 h-6"/>
      </div>
    </div>
  )
}