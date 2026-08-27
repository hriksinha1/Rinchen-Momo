import { OutletHours, DayOfWeek } from '../types/outlet';

export const useOutletStatus = (hours: OutletHours[]) => {
  const now = new Date();
  const dayIndex = now.getDay();
  // JS getDay(): 0 = Sun, 1 = Mon ...
  const days: DayOfWeek[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const today = days[dayIndex];
  
  const todayHours = hours.find(h => h.day === today);

  if (!todayHours || !todayHours.open || !todayHours.close) {
    return { isOpen: false, statusText: 'Closed today' };
  }

  const [openHour, openMin] = todayHours.open.split(':').map(Number);
  const [closeHour, closeMin] = todayHours.close.split(':').map(Number);

  const currentHour = now.getHours();
  const currentMin = now.getMinutes();

  const currentTime = currentHour * 60 + currentMin;
  const openTime = openHour * 60 + openMin;
  const closeTime = closeHour * 60 + closeMin;

  if (currentTime >= openTime && currentTime < closeTime) {
    const formatTime = (timeStr: string) => {
      const [h, m] = timeStr.split(':').map(Number);
      const ampm = h >= 12 ? 'PM' : 'AM';
      const formattedH = h % 12 || 12;
      return `${formattedH}:${m.toString().padStart(2, '0')} ${ampm}`;
    };
    return { isOpen: true, statusText: `Open until ${formatTime(todayHours.close)}` };
  }

  return { isOpen: false, statusText: 'Closed' };
};
