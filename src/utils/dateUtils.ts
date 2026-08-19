// Utilities for dynamic current week and booking dates

export interface DayOption {
  date: Date;
  dayNumber: number;
  dayName: string;
  fullDayName: string;
  monthName: string;
  year: number;
  formatted: string;
  shortFormatted: string;
  relativeLabel?: string;
  timeSlots: string[];
}

const DEFAULT_SLOTS_POOL = [
  '09:30 AM',
  '10:00 AM',
  '11:30 AM',
  '01:00 PM',
  '02:30 PM',
  '04:00 PM'
];

/**
 * Returns today's formatted date string (e.g., "August 18, 2026")
 */
export function getTodayFormatted(): string {
  const now = new Date();
  return now.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}

/**
 * Returns the upcoming business/booking days for the current week
 * Automatically calculates dates starting from today or next upcoming days.
 */
export function getUpcomingBookingDays(count = 6): DayOption[] {
  const days: DayOption[] = [];
  const now = new Date();

  // If currently weekend (Sunday=0 or Saturday=6), start picking from upcoming Monday or include today
  let current = new Date(now);

  for (let i = 0; i < count; i++) {
    const d = new Date(current);
    d.setDate(current.getDate() + i);

    const isToday = i === 0;
    const isTomorrow = i === 1;

    let relativeLabel: string | undefined = undefined;
    if (isToday) relativeLabel = 'Today';
    else if (isTomorrow) relativeLabel = 'Tomorrow';

    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
    const fullDayName = d.toLocaleDateString('en-US', { weekday: 'long' });
    const monthName = d.toLocaleDateString('en-US', { month: 'short' });
    const formatted = d.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
    const shortFormatted = `${monthName} ${d.getDate()}`;

    // Vary the available slots slightly per day for realistic dynamic feel
    let slotsForDay: string[];
    if (d.getDay() === 5) {
      // Friday
      slotsForDay = ['10:00 AM', '11:30 AM', '01:30 PM', '03:00 PM'];
    } else if (d.getDay() === 1 || d.getDay() === 3) {
      // Mon / Wed
      slotsForDay = ['09:30 AM', '11:00 AM', '02:00 PM', '04:00 PM'];
    } else {
      // Tue / Thu
      slotsForDay = ['10:00 AM', '11:30 AM', '01:00 PM', '03:30 PM'];
    }

    days.push({
      date: d,
      dayNumber: d.getDate(),
      dayName,
      fullDayName,
      monthName,
      year: d.getFullYear(),
      formatted,
      shortFormatted,
      relativeLabel,
      timeSlots: slotsForDay
    });
  }

  return days;
}

/**
 * Returns current week range label (e.g. "Week of Aug 17 - Aug 23, 2026")
 */
export function getCurrentWeekRangeLabel(): string {
  const now = new Date();
  const startOfWeek = new Date(now);
  const day = startOfWeek.getDay();
  const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
  startOfWeek.setDate(diff);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  const startMonth = startOfWeek.toLocaleDateString('en-US', { month: 'short' });
  const endMonth = endOfWeek.toLocaleDateString('en-US', { month: 'short' });

  return `This Week • ${startMonth} ${startOfWeek.getDate()} - ${endMonth} ${endOfWeek.getDate()}, ${endOfWeek.getFullYear()}`;
}
