"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseApiError_1 = require("../Errorhandling/BaseApiError");
const BaseServiceError_1 = require("../Errorhandling/BaseServiceError");
const BadRequestError_1 = require("../Errorhandling/ServiceErrors/BadRequestError");
const InvalidInputError_1 = require("../Errorhandling/ServiceErrors/InvalidInputError");
const NotCorrectRightsError_1 = require("../Errorhandling/ServiceErrors/NotCorrectRightsError");
const NotFoundError_1 = require("../Errorhandling/ServiceErrors/NotFoundError");
const UnknownServiceError_1 = require("../Errorhandling/ServiceErrors/UnknownServiceError");
class BaseService {
    ValidatePagination(page, pageSize) {
        let errors = [];
        if (page <= 0)
            errors.push(new InvalidInputError_1.InvalidInputModel("page", "Sidenummer skal være større end 0"));
        if (pageSize <= 0)
            errors.push(new InvalidInputError_1.InvalidInputModel("pageSize", "Sidestørrelse skal være større end 0"));
        if (errors.length > 0)
            throw new InvalidInputError_1.InvalidInputError(errors);
    }
    HandleError(error) {
        console.debug("Transforming error to ApplicationError");
        console.log(error);
        let errorIsApiError = error instanceof BaseApiError_1.BaseApiError;
        let errorIsServiceError = error instanceof BaseServiceError_1.BaseServiceError;
        if (errorIsApiError)
            throw this.FromApiToServiceError(error); //Make this error to Service-error
        if (errorIsServiceError)
            throw error; //The error is ok and can be displayed nicely
        throw new UnknownServiceError_1.UnknownServiceError(error);
    }
    FromApiToServiceError(apiError) {
        var _a;
        if (apiError && apiError.response) {
            switch (apiError.response.status) {
                case 400:
                    return new BadRequestError_1.BadRequestError((_a = apiError.errorMessage) !== null && _a !== void 0 ? _a : "");
                case 401:
                    return new NotCorrectRightsError_1.NotCorrectRightsError();
                case 403:
                    return new NotCorrectRightsError_1.NotCorrectRightsError();
                case 404:
                    return new NotFoundError_1.NotFoundError();
            }
        }
        return apiError;
    }
}
exports.default = BaseService;
