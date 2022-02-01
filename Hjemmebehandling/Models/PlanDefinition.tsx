import { FhirRessource } from "./FhirRessource";
import { Questionnaire } from "./Questionnaire";


export class PlanDefinition extends FhirRessource{
    id! : string;
    name! : string;
    questionnaires! : Questionnaire[]
}
