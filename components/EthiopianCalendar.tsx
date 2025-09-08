"use client";

import { useMemo, useState } from "react";
import {
  ethiopianMonths,
  weekdayHeads,
  getDaysInEthiopianMonth,
  firstWeekdayOfEthiopianMonth,
  getEthiopicToday,
} from "@/lib/ethiopianCalendar";

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
    cells.push({ key: `pad-${i}`, muted: true });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ key: `d-${d}`, label: d });
  }

  return (
    <div className="mx-auto w-full max-w-lg p-4 text-black/80">
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex gap-2">
          
          <button
            className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300"
            onClick={prevMonth}
            aria-label="Previous Month"
          >
            ‹
          </button>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold">
            <div className="text-2xl flex gap-4 align-baseline">
              {ethiopianMonths[month - 1]}
              <div className="relative text-xl self-baseline">
                <button
                  className="absolute -top-7 left-2 w-6 h-6 rounded-4xl bg-gray-200 hover:bg-gray-300"
                  onClick={prevYear}
                  aria-label="Previous Year"
                >
                  «
                </button>
                <button
                  className="absolute -bottom-7 left-2 w-6 h-6 rounded-4xl bg-gray-200 hover:bg-gray-300"
                  onClick={nextYear}
                  aria-label="Next Year"
                >
                  »
                </button>
                {year}
              </div>
            </div> 
          </div>
          <button
            className="text-xs text-blue-600 hover:underline mt-1"
            onClick={goToday}
          >
            ዛሬ
          </button>
        </div>
        <div className="flex gap-2">
          <button
            className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300"
            onClick={nextMonth}
            aria-label="Next Month"
          >
            ›
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-8 text-center">
        {weekdayHeads.map((w) => (
          <div key={w} className="w-10 font-semibold opacity-70">
            {w}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2 gap-y-4">
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
