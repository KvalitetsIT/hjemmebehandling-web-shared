

import { DayEnum } from "../../Models/Frequency";
import IDateHelper from "../interfaces/IDateHelper";

export default class DanishDateHelper implements IDateHelper {

    DateToString(date: Date, properties?: DateProperties): string {
        if (!properties)
            properties = new DateProperties();

        let toReturn = "";

        if (properties.showDate) {
            toReturn += date.getDate()
        }
        if (properties.showMonth) {
            toReturn += "-"
            toReturn += date.getMonth() + 1 // Zero-indexed month.. Beacause JS..
        }
        if (properties.showYear) {
            toReturn += "-"
            toReturn += date.getFullYear()
        }
        if(properties.showTime){
            toReturn += " "
            toReturn += date.getTime()
        }
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

export class DateProperties {
    showDate: boolean = true;
    showMonth: boolean = true;
    showYear: boolean = true;
    showTime: boolean = false;
}
