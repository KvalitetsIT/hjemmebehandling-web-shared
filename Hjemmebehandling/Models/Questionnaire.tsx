import { FhirRessource } from "./FhirRessource";
import { Frequency } from "./Frequency";
import { PlanDefinition } from "./PlanDefinition";
import { BaseQuestion, CallToActionQuestion, Question, QuestionTypeEnum } from "./Question";
import { ThresholdCollection } from "./ThresholdCollection";

export class Questionnaire extends FhirRessource {
    id!: string;
    name?: string;
    frequency?: Frequency;
    thresholds?: ThresholdCollection[];
    questions?: BaseQuestion[]
    status?: string; //TODO: Change this to a enum

    getCallToActions(): CallToActionQuestion[] {
        return this.questions?.filter(q => q instanceof CallToActionQuestion && q.type == QuestionTypeEnum.CALLTOACTION) ?? []
    }

    getParentQuestions(): Question[] {
        return this.questions?.filter(q => q instanceof Question && q.enableWhen?.questionId == undefined) ?? []
    }

    getChildQuestions(questionId?: string): Question[] {
        let toReturn = this.questions?.filter(q => q instanceof Question && q.enableWhen?.questionId != undefined)
        if (questionId)
            toReturn = toReturn?.filter(q => q instanceof Question && q.enableWhen?.questionId == questionId)

        return toReturn ?? []
    }
}