"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadGatewayError = void 0;
const BaseServiceError_1 = require("../BaseServiceError");
class BadGatewayError extends BaseServiceError_1.BaseServiceError {
    constructor(errorMessage) {
        super();
        this.errorMessage = errorMessage;
    }
    displayMessage() {
        return this.errorMessage;
    }
    displayTitle() {
        return "Ugyldig forespørgsel";
    }
}
exports.BadGatewayError = BadGatewayError;
