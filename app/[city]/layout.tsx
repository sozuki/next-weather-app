import clsx from "clsx";
import {NavDay} from "@/app/ui/navigation";
import {NavSection} from "@/app/ui/navigation";

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen min-w-full flex flex-col items-center justify-center py-20 bg-black ">
      <div className="border-amber-50 grow w-full">
        {children}
      </div>
      <div className=" w-full h-40 flex flex-col gap-8">
        <NavSection />
        <NavDay />
      </div>
    </div>
  );
}