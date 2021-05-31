export const formatDate = (date: Date) => {
  return date.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatTime = (date: Date) => {
  const string = date.toLocaleDateString(undefined, {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  const dateParts = string.split(", ");
  return dateParts[1];
};

export const formatDateTime = (date: Date) => {
  const string = date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  return string;
};

export const formatShortDate = (date: Date) => {
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

export const dateNotInThePast = (date: Date, dateNow: Date) => {
  const dateNowFormatted = formatShortDate(dateNow);
  const dateFormatted = formatShortDate(date);
  return dateFormatted >= dateNowFormatted;
};

export const areTheSameDay = (date: Date, date2: Date) => {
  const formattedDate = parseDate(date.toString());

  if (!formattedDate) {
    return false;
  }

  return formatShortDate(formattedDate) === formatShortDate(new Date(date2));
};

export const areTheSameTimeSlot = (
  start: Date,
  stop: Date,
  slotStart: Date,
  slotStop: Date
) => {
  const formatStartTime = formatDateTime(new Date(start));
  const formatStopTime = formatDateTime(new Date(stop));
  const formatSlotStart = formatDateTime(slotStart);
  const formatSlotStop = formatDateTime(slotStop);
  let same =
    formatStartTime === formatSlotStart && formatStopTime === formatSlotStop;
  return same;
};

export type TimeSlot = {
  displayStartTime: string;
  actualStartTime: Date;
  actualEndTime: Date;
};

export const getTimeSlots = (
  date: Date,
  openTime: string,
  closeTime: string
): TimeSlot[] => {
  let timeSlots: TimeSlot[] = [];
  if (!openTime || !closeTime) {
    return timeSlots;
  }

  let startHour = parseInt(openTime.split(":")[0]);
  let endHour = parseInt(closeTime.split(":")[0]);

  for (let i = startHour; i < endHour; i++) {
    let displayStartTime = getHourFromNum(i);
    date.setHours(i, 0o0, 0o0);
    let actualStartTime = new Date(date.getTime());
    let actualEndTime = getActualStopDateTime(actualStartTime);
    if (actualEndTime > new Date()) {
      timeSlots.push({ displayStartTime, actualStartTime, actualEndTime });
    }
  }

  return timeSlots;
};

const getActualStopDateTime = (startTime: Date) => {
  let copiedDate = new Date(startTime.getTime());
  copiedDate.setHours(copiedDate.getHours() + 1);
  copiedDate.setSeconds(copiedDate.getSeconds() - 1);
  return copiedDate;
};

export const getHourFromNum = (hour: number) => {
  let ampm = hour >= 12 ? "pm" : "am";
  hour = hour % 12;
  hour = hour ? hour : 12; // the hour '0' should be '12'
  let strTime = hour + " " + ampm;
  return strTime;
};

export const parseDate = (input: string) => {
  if (!input) return;
  var parts = input.match(/(\d+)/g);
  let date;
  if (parts) {
    date = new Date(
      parseInt(parts[0]),
      parseInt(parts[1]) - 1,
      parseInt(parts[2])
    );
  }

  return date;
};
