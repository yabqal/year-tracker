import YearProgress from "@/components/YearProgress";
import EthiopianCalendar from "@/components/EthiopianCalendar";
import { Noto_Sans_Ethiopic } from "next/font/google";
import Footer from "@/components/Footer";

const noto_sans_ethiopic = Noto_Sans_Ethiopic()

export default function Home() {
  return (
    <main className="p-6 flex flex-col items-center">
      <div className="w-full max-w-lg">
        <h1 className="text-[32px] text-black/80 font-light mb-8 border-b-1 border-b-black/20 pb-2 font-[noto_sans_ethiopic]">
          የዓመቱ ሂደት
        </h1>
        <YearProgress />
        <h1 className="mt-16 text-[32px] text-black/80 font-light mb-4 border-b-1 border-b-black/20 pb-2 font-[noto_sans_ethiopic]">
          የቀን መቁጠሪያ
        </h1>
        <EthiopianCalendar />
        <Footer />
      </div>
    </main>
  );
}
