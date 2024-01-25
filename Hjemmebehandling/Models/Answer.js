"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitType = exports.GroupAnswer = exports.BooleanAnswer = exports.ChoiceAnswer = exports.NumberAnswer = exports.StringAnswer = exports.Answer = void 0;
class Answer {
    constructor(questionId) {
        this.questionId = questionId;
    }
    setAnswer(answer) {
        this.answer = answer;
    }
}
exports.Answer = Answer;
class StringAnswer extends Answer {
    ToString() {
        return this.answer ? this.answer : "";
    }
    AnswerAsString() {
        return this.answer;
    }
}
exports.StringAnswer = StringAnswer;
class NumberAnswer extends Answer {
    ToString() {
        let toReturn = "";
        toReturn += this.answer == undefined ? "" : this.answer;
        if (this.unit)
            toReturn += " " + this.unit.toString();
        return toReturn;
    }
    AnswerAsString() {
        return this.answer ? this.answer : undefined;
    }
}
exports.NumberAnswer = NumberAnswer;
class ChoiceAnswer extends Answer {
    ToString() {
        return this.answer + "";
    }
    AnswerAsString() {
        return this.answer + "";
    }
}
exports.ChoiceAnswer = ChoiceAnswer;
class BooleanAnswer extends Answer {
    ToString() {
        return this.answer ? "Ja" : "Nej";
    }
    AnswerAsString() {
        return this.answer + "";
    }
}
exports.BooleanAnswer = BooleanAnswer;
class GroupAnswer extends Answer {
    ToString() {
        var _a, _b;
        return (_b = (_a = this.answer) === null || _a === void 0 ? void 0 : _a.map(answer => answer.ToString()).toString()) !== null && _b !== void 0 ? _b : "";
    }
    AnswerAsString() {
        var _a, _b;
        return (_b = (_a = this.answer) === null || _a === void 0 ? void 0 : _a.map(answer => answer.AnswerAsString()).toString()) !== null && _b !== void 0 ? _b : "";
    }
}
exports.GroupAnswer = GroupAnswer;
var UnitType;
(function (UnitType) {
    UnitType["KG"] = "KG";
    UnitType["DEGREASE_CELSIUS"] = "Grader";
    UnitType["NOUNIT"] = "";
})(UnitType = exports.UnitType || (exports.UnitType = {}));
