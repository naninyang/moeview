export function formatTime(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) {
    return false;
  } else {
    return ` (${hours}시간 ${minutes}분)`;
  }
}
