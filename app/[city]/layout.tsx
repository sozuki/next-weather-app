import clsx from "clsx";
import {NavDay, Navigation} from "@/app/ui/navigation";
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
      <Navigation />
    </div>
  );
}