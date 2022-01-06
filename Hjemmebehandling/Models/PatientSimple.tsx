//Very little info about the patient. Used when all we want to show is small data about patient.
    //Used in: 
    //- Tasklist

import { StringFormatter } from "../Helpers/ModelHelpers/StringFormatters";

export class PatientSimple {
    firstname?: string;
    lastname? : string;
    cpr?: string;

    cprToString() : string {
        return StringFormatter.FormatCpr(this.cpr);
    }
    
}