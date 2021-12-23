"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionnaireResponseStatus = exports.MeasurementType = exports.QuestionnaireResponse = void 0;
class QuestionnaireResponse {
}
exports.QuestionnaireResponse = QuestionnaireResponse;
var MeasurementType;
(function (MeasurementType) {
    MeasurementType["CRP"] = "CRP";
    MeasurementType["TEMPERATURE"] = "TEMPERATUR";
    MeasurementType["WEIGHT"] = "V\u00C6GT";
})(MeasurementType = exports.MeasurementType || (exports.MeasurementType = {}));
var QuestionnaireResponseStatus;
(function (QuestionnaireResponseStatus) {
    QuestionnaireResponseStatus["Processed"] = "Behandlet";
    QuestionnaireResponseStatus["InProgress"] = "Under behandling";
    QuestionnaireResponseStatus["NotProcessed"] = "Ikke behandlet";
    QuestionnaireResponseStatus["NotAnswered"] = "Ikke besvaret";
})(QuestionnaireResponseStatus = exports.QuestionnaireResponseStatus || (exports.QuestionnaireResponseStatus = {}));
