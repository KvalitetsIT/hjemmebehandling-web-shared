"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitType = exports.GroupAnswer = exports.BooleanAnswer = exports.NumberAnswer = exports.StringAnswer = exports.Answer = void 0;
class BaseAnswer {
    ToString() { return ""; }
    AnswerAsString() { return undefined; }
}
class Answer extends BaseAnswer {
    ToString() { return ""; }
    AnswerAsString() { return undefined; }
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
}
exports.GroupAnswer = GroupAnswer;
var UnitType;
(function (UnitType) {
    UnitType["KG"] = "KG";
    UnitType["DEGREASE_CELSIUS"] = "Grader";
    UnitType["NOUNIT"] = "";
})(UnitType = exports.UnitType || (exports.UnitType = {}));
