
export class BaseServiceError extends Error {
    displayMessage() : string{
        return "";
    }
    displayTitle() : string{
        return "";
    }
    displayUrl() : string{
        return "";
    }
}