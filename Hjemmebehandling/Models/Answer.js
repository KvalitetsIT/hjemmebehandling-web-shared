"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitType = exports.NumberAnswer = exports.StringAnswer = void 0;
class StringAnswer {
    ToString() {
        return this.answer ? this.answer : "";
    }
}
exports.StringAnswer = StringAnswer;
class NumberAnswer {
    ToString() {
        if (this.unit)
            return this.answer ? this.answer + " " + this.unit.toString() : "";
        return this.answer ? this.answer + "" : "";
    }
}
exports.NumberAnswer = NumberAnswer;
var UnitType;
(function (UnitType) {
    UnitType["KG"] = "KG";
    UnitType["DEGREASE_CELSIUS"] = "Grader";
    UnitType["NOUNIT"] = "";
})(UnitType = exports.UnitType || (exports.UnitType = {}));
