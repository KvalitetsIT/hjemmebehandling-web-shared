import { FhirRessource } from "./FhirRessource";
import { Frequency } from "./Frequency";
import { PlanDefinition } from "./PlanDefinition";
import { Question } from "./Question";
import { ThresholdCollection } from "./ThresholdCollection";

export class Questionnaire extends FhirRessource {
    id! : string;
    name?: string;
    frequency?: Frequency;
    thresholds?: ThresholdCollection[];
    questions? : Question[]

    status?: string; //TODO: Change this to a enum
}