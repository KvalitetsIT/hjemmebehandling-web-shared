"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Frequency_1 = require("../../Models/Frequency");
const DateProperties_1 = __importDefault(require("./DateProperties"));
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
            properties = new DateProperties_1.default();
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
            toReturn += date.getHours();
            toReturn += ":";
            toReturn += date.getMinutes();
        }
        return toReturn;
    }
    DayIndexToDay(dayIndex) {
        return this.days[dayIndex];
    }
}
exports.default = DanishDateHelper;
