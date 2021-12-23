"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Frequency_1 = require("../../Models/Frequency");
class DanishDateHelper {
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
        if (dayIndex === 0)
            return Frequency_1.DayEnum.Sunday;
        if (dayIndex === 1)
            return Frequency_1.DayEnum.Monday;
        if (dayIndex === 2)
            return Frequency_1.DayEnum.Tuesday;
        if (dayIndex === 3)
            return Frequency_1.DayEnum.Wednesday;
        if (dayIndex === 4)
            return Frequency_1.DayEnum.Thursday;
        if (dayIndex === 5)
            return Frequency_1.DayEnum.Friday;
        if (dayIndex === 6)
            return Frequency_1.DayEnum.Saturday;
        throw Error("dayIndex was not in range 0 <= x <= 6");
    }
}
exports.default = DanishDateHelper;
