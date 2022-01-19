import { IComparable } from "./Interfaces/IComparable";

export class Question implements IComparable<Question>{
    isEqual(other: Question) : boolean{
        return this.Id === other.Id;
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