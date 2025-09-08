import YearProgress from "@/components/YearProgress";
import EthiopianCalendar from "@/components/EthiopianCalendar";
import { Noto_Sans_Ethiopic } from "next/font/google";

const noto_sans_ethiopic = Noto_Sans_Ethiopic()

export default function Home() {
  return (
    <main className="p-6 flex flex-col items-center">
      <div className="w-full max-w-lg">
        <h1 className="text-[32px] text-black/80 font-light mb-14 border-b-1 border-b-black/20 pb-3 font-[noto_sans_ethiopic]">
          የዓመቱ ሂደት
        </h1>
        <YearProgress />
        <EthiopianCalendar />
      </div>
    </main>
  );
}
