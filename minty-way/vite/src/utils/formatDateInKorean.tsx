import { format, toZonedTime } from "date-fns-tz";

const TIMEZONE = "Asia/Seoul";

export const formatDateInKorean = (dateString: string) => {
  const date = new Date(dateString);
  const zonedDate = toZonedTime(date, TIMEZONE);

  const formattedDate = format(zonedDate, "yyyy-MM-dd a h시 mm분", {
    timeZone: TIMEZONE,
  });

  const period = formattedDate.includes("AM") ? "오전" : "오후";
  const formattedDateInKorean = formattedDate
    .replace("AM", period)
    .replace("PM", period);

  return formattedDateInKorean;
};
