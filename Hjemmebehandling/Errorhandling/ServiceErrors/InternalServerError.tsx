import { BaseServiceError } from "../BaseServiceError";

export class InternalServerError extends BaseServiceError {
    displayMessage() {
        return "Serveren kunne ikke udføre den anmodet handling";
    }
    displayTitle(){
        return "Intern server fejl"
    }
}