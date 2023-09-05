"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseApiError_1 = require("../Errorhandling/BaseApiError");
class BaseApi {
    /**
     * Transform responses into BaseApiErrors
     * @param error the thrown error from api-method (this should be of type response)
     */
    async HandleError(error) {
        console.debug("Transforming error to ServiceError");
        console.log(error);
        if (error instanceof Response) {
            let response = error;
            let bodyText = "Fejl i data fra bagvedliggende api"; // Bliver overskrevet såfremt vi godt kan få teksten ud fra response
            let errorDto = {};
            try {
                bodyText = await response.text(); //Body can only be read once, and if it is not json, we want to display the non-json body
                errorDto = JSON.parse(bodyText);
            }
            catch (error) {
                //When json-parser tries to parse fx "" we end up here
                throw new BaseApiError_1.BaseApiError(response, bodyText, response.status);
            }
            throw new BaseApiError_1.BaseApiError(response, errorDto.errorText, errorDto.errorCode);
        }
        throw error;
    }
}
exports.default = BaseApi;
