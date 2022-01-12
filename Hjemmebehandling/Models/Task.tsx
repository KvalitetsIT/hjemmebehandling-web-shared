import { StringFormatter } from "../Helpers/ModelHelpers/StringFormatters";
import { CategoryEnum } from "./CategoryEnum";

export class Task {
    cpr! : string
    category! : CategoryEnum
    firstname? : string
    lastname? : string
    questionnaireResponseStatus? : string
    questionnaireName! : string
    carePlanId!: string
    questionnaireId! : string
    answeredTime? : Date
    planDefinitionName? : string
    responseLinkEnabled! : boolean

    cprToString() : string {
        return StringFormatter.FormatCpr(this.cpr);
    }
}