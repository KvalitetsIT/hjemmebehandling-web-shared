"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    DateToString(date) {
        let toReturn = "";
        toReturn += date.getDate();
        toReturn += "/";
        toReturn += date.getMonth() + 1; // Zero-indexed month.. Beacause JS..
        toReturn += "-";
        toReturn += date.getFullYear();
        //console.log(date.toLocaleDateString() + " => " + toReturn)
        return toReturn;
    }
    DayIndexToDay(dayIndex) {
        return this.days[dayIndex];
    }
}
exports.default = DanishDateHelper;
