import {NUMBERS} from "./constants";

export const getEndOfDay = (date=new Date()) => {
  let endOfDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()+NUMBERS.ONE
  );
  endOfDay.setMilliseconds(NUMBERS.NEG_ONE);
  return endOfDay;
};

export const getStartOfDay = (date=new Date()) => {
  let startOfDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
  return startOfDay;
};

export const incrementDate = (
  date=new Date(), {
    year=NUMBERS.ZERO, month=NUMBERS.ZERO, day=NUMBERS.ZERO,
    hours=NUMBERS.ZERO, minutes=NUMBERS.ZERO, seconds=NUMBERS.ZERO,
    milliseconds=NUMBERS.ZERO,
  }) => new Date(
  date.getFullYear()+year, date.getMonth()+month, date.getDate()+day,
  date.getHours()+hours, date.getMinutes()+minutes, date.getSeconds()+seconds,
  date.getMilliseconds()+milliseconds
);

export const fromNow = (date) => date.isValid
  ? date.fromNow(true) +
    (date.diff(new Date(), "days") >= NUMBERS.ZERO ? " remaining" : " ago")
  : "";
