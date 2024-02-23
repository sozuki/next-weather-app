'use client';
import Link from "next/link";
import {useParams, usePathname, useRouter} from "next/navigation";
import {useScroll, motion, useMotionValueEvent} from "framer-motion";
import {MutableRefObject, useEffect, useRef, useState} from "react";
import clsx from "clsx";


export function Navigation() {
  const navDayRef = useRef(null);
  const {day} = useParams();
  return (
    <div className=" w-full h-40 flex flex-col gap-8 justify-end">
      {day !== "7days" ? <NavSection navDayRef={navDayRef}/>:
      <div className="">
        {/* hides navSection and prevents layout shift */}
      </div>}
      <NavDay navDayRef={navDayRef}/>
    </div>
  )
}

interface Item {
  title: string,
  link: string
}

const sections: Item[] = [
  {title: "MAIN", link: "/"},
  {title: "WEATHER", link: "/weather"},
  {title: "PRECIPITATION", link: "/precipitation"},
  {title: "WIND", link: "/wind"},
  {title: "DETAILS", link: "/details"},
  {title: "SUN", link: "/sun"},
]

interface SectionConstraint {
  section: string,
  start: number,
  base: number,
  end: number
}

const sectionConstraints: SectionConstraint[] = [
  {
    section: "main",
    start: 0, base: 0, end: 0.1
  },
  {
    section: "weather",
    start: 0.1, base: 0.2, end: 0.3
  },
  {
    section: "precipitation",
    start: 0.3, base: 0.4, end: 0.5
  },
  {
    section: "wind",
    start: 0.5, base: 0.6, end: 0.7
  },
  {
    section: "details",
    start: 0.7, base: 0.8, end: 0.9
  },
  {
    section: "sun",
    start: 0.9, base: 1, end: 1
  },
]

interface Variants {
  inactive: {
    scale: [null, number, number],
    opacity: number,
    border?: string
  },
  active: {
    scale: [null, number, number],
    opacity: number,
    border?: string
  }
}

const sectionVariants: Variants = {
  inactive: {
    scale: [null, 1, 1],
    opacity: 0.5
  },
  active: {
    scale: [null, 1.2, 1.3],
    opacity: 1
  },
};

export function NavSection({navDayRef}: { navDayRef: MutableRefObject<any> }) {
  const {city, day} = useParams<{ city: string; day: string }>();
  const [defaultDay, setDefaultDay] = useState(day);
  const pathname = usePathname();
  const segments = pathname.split('/');
  let section = segments[segments.length - 1];
  
  days.forEach(day => {
    if (day.link === "/".concat(section)) section = "";
  });
  
  // animation
  const navSectionRef = useRef(null);
  const {scrollXProgress} = useScroll({
    container: navSectionRef
  });
  
  const [selectedSection, setSelectedSection] = useState(section || "main");
  const router = useRouter();
  useMotionValueEvent(scrollXProgress, "change", (latest) => {
    const roundedX = Math.round(latest * 100) / 100;
    sectionConstraints.forEach(constraint => {
      if (roundedX >= constraint.start && roundedX <= constraint.end) {
        setSelectedSection(constraint.section);
        if (!defaultDay) {
          setDefaultDay("today");
          scrollToThisItem(1, navDayRef); //TODO: scroll to TODAY section in the bottom nav ( need to cal the same scroll function, but in another component)
        }
        if (constraint.section === "main" && pathname !== `/${city}/main/${defaultDay}`) {
          router.replace(`/${city}/main/${defaultDay}`);
        } else if (constraint.section !== "main" && pathname !== `/${city}/main/${defaultDay}/${constraint.section}`) {
          router.replace(`/${city}/main/${defaultDay}/${constraint.section}`);
        }
      }
    })
  })
  
  
  function scrollToThisItem(toIndex: number, ref: MutableRefObject<any>) {
    const currentIndex = sectionConstraints.findIndex(item => item.section === selectedSection);
    if (toIndex > currentIndex) {
      if (ref.current) {
        ref.current.scrollLeft += window.innerWidth / 3;
      }
    } else if (toIndex < currentIndex) {
      if (ref.current) ref.current.scrollLeft -= window.innerWidth / 3;
    }
  }
  return (
    <>
      <ul ref={navSectionRef} style={{scrollBehavior: "smooth"}}
          className="flex flex-nowrap snap-x snap-mandatory overflow-x-scroll gap-8 text-white items-center scrollbar-w-0 select-none h-16">
        {sections.map((section, i) => {
            const isActive = section.title.toLowerCase() === selectedSection;
            
            return (
              <motion.li key={i}
                         initial={"inactive"}
                         animate={isActive ? "active" : "inactive"}
                         variants={sectionVariants}
                         onClick={() => scrollToThisItem(i, navSectionRef)}
                // whileHover={{ scale: [null, 1.3, 1.2] }}
                // className={clsx("first:ml-[30vw] last:mr-[30vw] border-white border-2 min-w-[40vw] flex justify-center items-center p-2 snap-center select-none", isActive && "h-20")}>
                         className={clsx("first:ml-[30vw] last:mr-[30vw] min-w-[40vw] flex justify-center items-center p-2 snap-center select-none")}>
                {/*<Link href={`/${city}/main/${day}/${section.link}`}>*/}
                {section.title}
                {/*</Link>*/}
              </motion.li>
            )
          }
        )}
      </ul>
    </>
  )
}


const days: Item[] = [
  {title: "7 DAYS", link: "/7days"},
  {title: "TODAY", link: "/today"},
  {title: "TOMORROW", link: "/tomorrow"},
]

const dayVariants: Variants = {
  inactive: {
    scale: [null, 1, 1],
    opacity: 0.5,
    border: "none"
  },
  active: {
    scale: [null, 1.2, 1.3],
    opacity: 1,
    border: "2px solid white"
  },
}

interface DayConstraint {
  day: string,
  start: number,
  base: number,
  end: number
}

const dayConstraints: DayConstraint[] = [
  {
    day: "7days",
    start: 0, base: 0, end: 0.25
  },
  {
    day: "today",
    start: 0.25, base: 0.5, end: 0.75
  },
  {
    day: "tomorrow",
    start: 0.75, base: 1, end: 1
  },
]


export function NavDay({navDayRef}: { navDayRef: MutableRefObject<any> }) {
  // routes handling
  const {city, day} = useParams<{ city: string; day: string }>();
  const pathname = usePathname();
  const segments = pathname.split('/');
  let section = segments[segments.length - 1];
  days.forEach(day => {
    if (day.link === "/".concat(section) || section === "main") section = "";
  })
  
  // animation
  const {scrollXProgress} = useScroll({
    container: navDayRef
  });
  const [selectedDay, setSelectedDay] = useState(day);
  
  const [isScrolled, setIsScrolled] = useState(false)
  
  function scrollToTheChosenDay() {
    let index: number = 1;
    dayConstraints.forEach(constraint => {
        if (constraint.day === selectedDay && scrollXProgress.current !== constraint.base) {
          scrollToThisItem(index, navDayRef);
        }
        index++;
      }
    )
    setIsScrolled(true);
  }
  
  useEffect(() => {
    if (!isScrolled) scrollToTheChosenDay();
  }, []);
  const router = useRouter();
  useMotionValueEvent(scrollXProgress, "change", (latest) => {
    if (isScrolled) {
      const roundedX = Math.round(latest * 100) / 100;
      dayConstraints.forEach(constraint => {
        if (roundedX >= constraint.start && roundedX <= constraint.end) {
          setSelectedDay(constraint.day);
          if (pathname !== `/${city}/main/${constraint.day}/${section}`) {
            router.replace(`/${city}/main/${constraint.day}/${section}`);
          }
        }
      })
    }
  })
  
  function scrollToThisItem(toIndex: number, ref: MutableRefObject<any>) {
    const currentIndex = dayConstraints.findIndex(item => item.day === selectedDay);
    if (toIndex > currentIndex) {
      if (ref.current) {
        ref.current.scrollLeft += window.innerWidth / 3;
      }
    } else if (toIndex < currentIndex) {
      if (ref.current) ref.current.scrollLeft -= window.innerWidth / 3;
    }
  }
  
  return (
    <ul
      className="flex flex-nowrap snap-x snap-mandatory overflow-x-scroll gap-8 text-red-700 items-center scrollbar-w-0 select-none h-16"
      style={{scrollBehavior: "smooth"}}
      ref={navDayRef}>
      {days.map((day, i) => {
        const isActive = day.title.toLowerCase().replace(/\s/g, '') === selectedDay;
        return (
          
          <motion.li key={i}
                     className={clsx("first:ml-[30vw] last:mr-[30vw] border-2 min-w-[40vw] flex justify-center items-center p-2 snap-center select-none ")}
                     variants={dayVariants}
                     animate={isActive ? "active" : "inactive"}
                     onClick={() => scrollToThisItem(i, navDayRef)}
          >
            {/*<Link href={`/${city}/main/${day.link}/${section}`}>*/}
            {day.title}
            {/*</Link>*/}
          </motion.li>
        )
      })}
    </ul>
  )
}

