import { DayEnum } from "../../Models/Frequency";

export default interface IDateHelper {
    DateToString : (date : Date) => string
    DayIndexToDay : (dayIndex : number) => DayEnum
}
  