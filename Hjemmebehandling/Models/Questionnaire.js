"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Questionnaire = void 0;
const FhirRessource_1 = require("./FhirRessource");
const Question_1 = require("./Question");
class Questionnaire extends FhirRessource_1.FhirRessource {
    getCallToActions() {
        var _a, _b;
        return (_b = (_a = this.questions) === null || _a === void 0 ? void 0 : _a.filter(q => q instanceof Question_1.CallToActionQuestion && q.type == Question_1.QuestionTypeEnum.CALLTOACTION)) !== null && _b !== void 0 ? _b : [];
    }
    getParentQuestions() {
        var _a, _b;
        return (_b = (_a = this.questions) === null || _a === void 0 ? void 0 : _a.filter(q => { var _a; return q instanceof Question_1.Question && ((_a = q.enableWhen) === null || _a === void 0 ? void 0 : _a.questionId) == undefined; })) !== null && _b !== void 0 ? _b : [];
    }
    getChildQuestions(questionId) {
        var _a;
        let toReturn = (_a = this.questions) === null || _a === void 0 ? void 0 : _a.filter(q => { var _a; return q instanceof Question_1.Question && ((_a = q.enableWhen) === null || _a === void 0 ? void 0 : _a.questionId) != undefined; });
        if (questionId)
            toReturn = toReturn === null || toReturn === void 0 ? void 0 : toReturn.filter(q => { var _a; return q instanceof Question_1.Question && ((_a = q.enableWhen) === null || _a === void 0 ? void 0 : _a.questionId) == questionId; });
        return toReturn !== null && toReturn !== void 0 ? toReturn : [];
    }
}
exports.Questionnaire = Questionnaire;
