import { PadNumber } from "../currency.js";

export class Time {
    hour: number;
    minute: number;
    second: number | null;

    constructor(hour = 0, minute = 0, second = null) {
        this.hour = hour;
        this.minute = minute;
        this.second = second;
    }

    fromString = (time: string, separator = ":") => new Time(...time.split(separator).map((v) => parseInt(v)));
    toString = (showSeconds = false) =>
        `${PadNumber(this.hour)}:${PadNumber(this.minute)}` +
        (this.second !== null && showSeconds ? `:${PadNumber(this.second)}` : "");
}
