"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionTypeEnum = exports.Question = void 0;
class Question {
    isEqual(other) {
        return this.question === other.question;
    }
}
exports.Question = Question;
var QuestionTypeEnum;
(function (QuestionTypeEnum) {
    QuestionTypeEnum["CHOICE"] = "CHOICE";
    QuestionTypeEnum["BOOLEAN"] = "BOOLEAN";
    QuestionTypeEnum["INTEGER"] = "INTEGER";
    QuestionTypeEnum["OBSERVATION"] = "M\u00E5ling";
    QuestionTypeEnum["STRING"] = "STRING";
})(QuestionTypeEnum = exports.QuestionTypeEnum || (exports.QuestionTypeEnum = {}));
