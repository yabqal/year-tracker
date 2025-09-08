"use client";

import { useMemo, useState } from "react";
import {
  ethiopianMonths,
  weekdayHeads,
  getDaysInEthiopianMonth,
  firstWeekdayOfEthiopianMonth,
  getEthiopicToday,
} from "@/lib/ethiopianCalendar";
import { FaChevronLeft, FaChevronRight, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Inter } from 'next/font/google';
import { Noto_Sans_Ethiopic } from "next/font/google";

const noto_sans_ethiopic = Noto_Sans_Ethiopic()

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function EthiopianCalendar() {
  const today = useMemo(() => getEthiopicToday(), []);
  const [year, setYear] = useState<number>(today.year);
  const [month, setMonth] = useState<number>(today.month);

  const daysInMonth = getDaysInEthiopianMonth(month, year);
  const startWeekday = firstWeekdayOfEthiopianMonth(month, year);

  function prevMonth() {
    if (month === 1) {
      setMonth(13);
      setYear((y) => y - 1);
    } else {
      setMonth((m) => m - 1);
    }
  }

  function nextMonth() {
    if (month === 13) {
      setMonth(1);
      setYear((y) => y + 1);
    } else {
      setMonth((m) => m + 1);
    }
  }

  function prevYear() {
    setYear((y) => y - 1);
  }

  function nextYear() {
    setYear((y) => y + 1);
  }

  function goToday() {
    setYear(today.year);
    setMonth(today.month);
  }

  const cells: Array<{ key: string; label?: number; muted?: boolean }> = [];

  for (let i = 0; i < startWeekday; i++) {
    cells.push({ key: `pad-start-${i}`, muted: true });
  }

  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ key: `d-${d}`, label: d });
  }

  // Trailing blanks (to complete the last row)
  const totalCells = startWeekday + daysInMonth;
  const trailing = (7 - (totalCells % 7)) % 7;
  for (let i = 0; i < trailing; i++) {
    cells.push({ key: `pad-end-${i}`, muted: true });
  }

  return (
    <div className="mx-auto w-full max-w-lg p-4 text-black/80">
      <div className="flex items-center justify-between gap-2 mb-6">
        <div className="flex gap-2">
          <button
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 shadow-md duration-300"
            onClick={prevMonth}
            aria-label="Previous Month"
          >
            <FaChevronLeft className="self-center" />
          </button>
        </div>
        <div className="text-center flex flex-col">
          <div className="text-lg font-semibold">
            <div className="text-[48px] flex gap-4 align-baseline items-center font-[noto_sans_ethiopic]">
              {ethiopianMonths[month - 1]}
              <div className="flex flex-col gap-1 text-[14px] font-[inter] self-baseline place-items-center">
                <button
                  className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-200 text-gray-400 hover:text-gray-500 duration-300"
                  onClick={prevYear}
                  aria-label="Previous Year"
                >
                  <FaChevronUp size={14} />
                </button>
                {year}
                <button
                  className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-200 text-gray-400 hover:text-gray-500 duration-300"
                  onClick={nextYear}
                  aria-label="Next Year"
                >
                  <FaChevronDown size={14} className="self-center"/>
                </button>
              </div>
            </div>
          </div>
          <button
            className={`text-md font-[noto_sans_ethiopic] ${
              (year === today.year && month === today.month) ? "text-gray-600/70 hover: bg-none cursor-default" : "text-red-600/70 hover:underline cursor-pointer duration-250"
            }  font-bold self-start p-2`}
            onClick={goToday}
          >
            ዛሬ
          </button>
        </div>
        <div className="flex gap-2">
          <button
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 shadow-md duration-300"
            onClick={nextMonth}
            aria-label="Next Month"
          >
            <FaChevronRight className="self-center" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 mb-8 text-center font-[noto_sans_ethiopic]">
        {weekdayHeads.map((w) => (
          <div key={w} className="w-10 font-semibold opacity-70">
            {w}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2 gap-y-4 font-[inter]">
        {cells.map((c) => {
          if (c.muted) {
            return (
              <div
                key={c.key}
                className="w-10 h-10 rounded-[999px] border border-dashed opacity-30"
              />
            );
          }

          const isToday =
            c.label === today.day &&
            month === today.month &&
            year === today.year;

          return (
            <div
              key={c.key}
              className={`w-10 h-10 rounded-[999px] flex items-center justify-center cursor-default ${
                isToday
                  ? "bg-red-600/70 duration-100 text-white font-bold shadow-sm"
                  : "hover:bg-gray-200 hover:shadow-sm"
              }`}
            >
              {c.label}
            </div>
          );
        })}

      </div>
    </div>
  );
}
