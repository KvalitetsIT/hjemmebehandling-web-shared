"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseServiceError = void 0;
class BaseServiceError extends Error {
    displayMessage() {
        return "";
    }
    displayTitle() {
        return "";
    }
    displayUrl() {
        return "";
    }
}
exports.BaseServiceError = BaseServiceError;
