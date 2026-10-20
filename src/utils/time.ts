// Formats minutes after midnight as a 12-hour clock time, e.g. 13:10 -> "1:10 PM".
export function fmt(mins: number) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}`;
}
