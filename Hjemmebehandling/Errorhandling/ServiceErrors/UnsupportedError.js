"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnsupportedError = void 0;
const BaseServiceError_1 = require("../BaseServiceError");
class UnsupportedError extends BaseServiceError_1.BaseServiceError {
    constructor(concerningObject, unsupportedReadableDescription) {
        super();
        this.concerningObject = concerningObject;
        this.unsupportedReadableDescription = unsupportedReadableDescription;
    }
    displayTitle() {
        return "Ikke supporteret";
    }
    displayMessage() {
        return this.unsupportedReadableDescription;
    }
    displayUrl() {
        return JSON.stringify(this.concerningObject);
    }
}
exports.UnsupportedError = UnsupportedError;
