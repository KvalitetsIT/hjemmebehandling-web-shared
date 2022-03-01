"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateProperties = void 0;
const Frequency_1 = require("../../Models/Frequency");
class DanishDateHelper {
    constructor() {
        this.days = [
            Frequency_1.DayEnum.Sunday,
            Frequency_1.DayEnum.Monday,
            Frequency_1.DayEnum.Tuesday,
            Frequency_1.DayEnum.Wednesday,
            Frequency_1.DayEnum.Thursday,
            Frequency_1.DayEnum.Friday,
            Frequency_1.DayEnum.Saturday
        ];
    }
    DateToString(date, properties) {
        if (!properties)
            properties = new DateProperties();
        let toReturn = "";
        if (properties.showDate) {
            toReturn += date.getDate();
        }
        if (properties.showMonth) {
            toReturn += "-";
            toReturn += date.getMonth() + 1; // Zero-indexed month.. Beacause JS..
        }
        if (properties.showYear) {
            toReturn += "-";
            toReturn += date.getFullYear();
        }
        if (properties.showTime) {
            toReturn += " ";
            toReturn += date.getTime();
        }
        return toReturn;
    }
    DayIndexToDay(dayIndex) {
        return this.days[dayIndex];
    }
}
exports.default = DanishDateHelper;
class DateProperties {
    constructor() {
        this.showDate = true;
        this.showMonth = true;
        this.showYear = true;
        this.showTime = false;
    }
}
exports.DateProperties = DateProperties;
