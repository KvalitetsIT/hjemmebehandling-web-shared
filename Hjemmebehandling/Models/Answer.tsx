interface IAnswer{
    ToString : () => string
    AnswerAsString : () => string | undefined
}
class BaseAnswer implements IAnswer {
    questionId!: string
    ToString() : string { return ""; }
    AnswerAsString() : string | undefined { return undefined; }
}
export class Answer extends BaseAnswer {
    questionId!: string
    ToString() : string { return ""; }
    AnswerAsString() : string | undefined { return undefined; }
}

export class StringAnswer extends Answer {
    answer? : string
    
    ToString() : string {

        return this.answer ? this.answer : "" 
    }
    AnswerAsString(): string | undefined {
        return this.answer;
    }
}

export class NumberAnswer extends Answer {
    answer? : number
    unit? : UnitType
    
    ToString() : string {
        let toReturn = "";
        toReturn += this.answer == undefined ? "" : this.answer;

        if(this.unit)
            toReturn += " " + this.unit.toString()
        
        return toReturn
    }
    AnswerAsString(): string | undefined {
        return this.answer ? this.answer as unknown as string : undefined;
    }
}

export class BooleanAnswer extends Answer {
    answer! : boolean
    
    ToString() : string {
       return this.answer ? "Ja" : "Nej"
    }
    AnswerAsString(): string | undefined {
        return this.answer + "";
    }
}

export class GroupAnswer extends Answer {
    subAnswers!: Array<BaseAnswer>
}

export enum  UnitType {
    KG = "KG",
    DEGREASE_CELSIUS = "Grader",
    NOUNIT = ""
}