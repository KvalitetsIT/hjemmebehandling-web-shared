import { IComparable } from "./Interfaces/IComparable";

export class Question implements IComparable<Question>{
    isEqual(other: Question) : boolean{
        return this.question === other.question;
    }
    Id! : string
    question! : string
    type! : QuestionTypeEnum
    options?: Array<string>;
}

export enum QuestionTypeEnum{
    CHOICE = 'CHOICE',
    BOOLEAN = 'BOOLEAN',
    INTEGER = 'INTEGER',
    OBSERVATION = 'Måling', // Måling/Observation etc!
    STRING = 'STRING'
}