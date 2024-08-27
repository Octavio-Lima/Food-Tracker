import { Time } from "./time.js";

export function getYesterday(): Date {
    let date = new Date();

    date.setDate(date.getDate() - 1);
    return date;
}

export function getNow(): Time {
    let today = new Date();
    let time = new Time(today.getHours(), today.getMinutes());

    return time;
}

export function PadNumber(number = 0) {
    let result;

    if (number < 0) result = (number > -10 ? "-0" : "-") + number * -1;
    else result = (number < 10 ? "0" : "") + number;

    return result;
}

export function ISOadjustTimezone(date: Date): string {
    let newDate = new Date(date);
    newDate.setMinutes(newDate.getMinutes() - newDate.getTimezoneOffset());
    return newDate.toISOString();
}
