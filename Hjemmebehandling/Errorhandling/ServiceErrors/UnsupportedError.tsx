import { BaseServiceError } from "../BaseServiceError"

export class UnsupportedError extends BaseServiceError {
    concerningObject: unknown
    unsupportedReadableDescription: string

    constructor(concerningObject: unknown, unsupportedReadableDescription: string) {
        super()

        this.concerningObject = concerningObject
        this.unsupportedReadableDescription = unsupportedReadableDescription
    }
    displayTitle(): string {
        return "Ikke supporteret"
    }

    displayMessage(): string {
        return this.unsupportedReadableDescription;
    }

    displayUrl(): string {
        return JSON.stringify(this.concerningObject);
    }
}