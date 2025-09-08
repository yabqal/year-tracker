"use client";

import {
  getEthiopicToday,
  getDayOfYear,
  getDaysInEthiopianYear,
} from "@/lib/ethiopianCalendar";
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function YearProgress() {
  const today = getEthiopicToday();
  const dayOfYear = getDayOfYear(today.year, today.month, today.day);
  const totalDays = getDaysInEthiopianYear(today.year);
  const percent = (dayOfYear / totalDays) * 100;

  return (
    <div className="w-full max-w-lg mx-auto mb-6 text-black/80 font-[inter]">
      <div className="flex justify-between text-sm mb-1">
        <span className="font-[noto_sans_ethiopic]">የሂደት አሞሌ</span>
        <span className="font-bold">{percent.toFixed(1)}%</span>
      </div>
      <div className="w-full h-8 bg-gray-200 rounded-[10px] overflow-hidden">
        <div
          className="h-8 bg-green-600/70 transition-all duration-500"
          style={{ 
            width: `${percent}%`,
           }}
        />
      </div>
      <div className="text-xs text-gray-600 mt-1 text-right font-[noto_sans_ethiopic]">
        {dayOfYear} / {totalDays} ቀናት
      </div>
    </div>
  );
}
