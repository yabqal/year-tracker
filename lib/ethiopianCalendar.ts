export const ethiopianMonths = [
  "መስከረም",
  "ጥቅምት",
  "ህዳር",
  "ታህሳስ",
  "ጥር",
  "የካቲት",
  "መጋቢት",
  "ሚያዝያ",
  "ግንቦት",
  "ሰኔ",
  "ሐምሌ",
  "ነሐሴ",
  "ጳጉሜን"
];

export const weekdayHeads = ["እ", "ሰ", "ማ", "ረ", "ሐ", "ዓ", "ቅ"];

function gregorianToJdn(y: number, m: number, d: number): number {
  const a = Math.floor((14 - m) / 12);
  const y2 = y + 4800 - a;
  const m2 = m + 12 * a - 3;
  return (
    d +
    Math.floor((153 * m2 + 2) / 5) +
    365 * y2 +
    Math.floor(y2 / 4) -
    Math.floor(y2 / 100) +
    Math.floor(y2 / 400) -
    32045
  );
}

function jdnToGregorian(jdn: number): { y: number; m: number; d: number } {
  const f = jdn + 1401 + Math.floor((Math.floor(4 * jdn + 274277) / 146097) * 3) - 38;
  const e = 4 * f + 3;
  const g = Math.floor((e % 1461) / 4);
  const h = 5 * g + 2;
  const D = Math.floor((h % 153) / 5) + 1;
  const M = Math.floor(h / 153 + 2) % 12 + 1;
  const Y = Math.floor(e / 1461) - 4716 + Math.floor((14 - M) / 12);
  return { y: Y, m: M, d: D };
}

const AMETE_MIHRET_EPOCH = 1723856;

function ethiopicToJdn(year: number, month: number, day: number): number {
  const y2 = year + 1;
  return (
    AMETE_MIHRET_EPOCH +
    365 * (y2 - 1) +
    Math.floor((y2 - 1) / 4) +
    30 * (month - 1) +
    (day - 1)
  );
}

function jdnToEthiopic(jdn: number): { year: number; month: number; day: number } {
  const { y: gy, m: gm, d: gd } = jdnToGregorian(jdn);
  let ey = (gm > 8 || (gm === 9 && gd >= 11)) ? gy - 7 : gy - 8;

  while (jdn < ethiopicToJdn(ey, 1, 1)) ey -= 1;
  while (jdn >= ethiopicToJdn(ey + 1, 1, 1)) ey += 1;

  const start = ethiopicToJdn(ey, 1, 1);
  const dayOfYear = jdn - start;
  const month = Math.floor(dayOfYear / 30) + 1;
  const day = (dayOfYear % 30) + 1;

  return { year: ey, month, day };
}

function weekdayFromJdn(jdn: number): number {
  return (jdn + 1) % 7;
}

export function isEthiopianLeapYear(year: number): boolean {
  return year % 4 === 3;
}

export function getDaysInEthiopianMonth(month: number, year: number): number {
  if (month >= 1 && month <= 12) return 30;
  return isEthiopianLeapYear(year) ? 6 : 5;
}

export function firstWeekdayOfEthiopianMonth(month: number, year: number): number {
  const jdn = ethiopicToJdn(year, month, 1);
  return weekdayFromJdn(jdn);
}

export type EthiopicDate = { year: number; month: number; day: number };

export function ethiopicToGregorian(
  year: number,
  month: number,
  day: number
): { year: number; month: number; day: number } {
  const jdn = ethiopicToJdn(year, month, day);
  const { y, m, d } = jdnToGregorian(jdn);
  return { year: y, month: m, day: d };
}

export function gregorianToEthiopic(
  year: number,
  month: number,
  day: number
): EthiopicDate {
  return jdnToEthiopic(gregorianToJdn(year, month, day));
}

export function getEthiopicToday(): EthiopicDate {
  const now = new Date();
  const gy = now.getUTCFullYear();
  const gm = now.getUTCMonth() + 1;
  const gd = now.getUTCDate();
  return gregorianToEthiopic(gy, gm, gd);
}
