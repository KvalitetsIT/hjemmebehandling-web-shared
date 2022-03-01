

import { DayEnum } from "../../Models/Frequency";
import IDateHelper from "../interfaces/IDateHelper";

export default class DanishDateHelper implements IDateHelper {

    DateToString(date: Date): string {
        let toReturn = "";
        toReturn += date.getDate()
        toReturn += "-"
        toReturn += date.getMonth() + 1 // Zero-indexed month.. Beacause JS..
        toReturn += "-"
        toReturn += date.getFullYear()
        return toReturn;
    }

    days = [
        DayEnum.Sunday,
        DayEnum.Monday,
        DayEnum.Tuesday,
        DayEnum.Wednesday,
        DayEnum.Thursday,
        DayEnum.Friday,
        DayEnum.Saturday
    ]
    
    DayIndexToDay(dayIndex: number): DayEnum {
        return this.days[dayIndex];
    }



}
