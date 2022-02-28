"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const StringFormatters_1 = require("../Helpers/ModelHelpers/StringFormatters");
class Task {
    cprToString() {
        return StringFormatters_1.StringFormatter.FormatCpr(this.cpr);
    }
    IsEqual(otherTask) {
        let isEqual = true;
        isEqual && (isEqual = this.cpr == otherTask.cpr);
        isEqual && (isEqual = this.questionnaireId == otherTask.questionnaireId);
        isEqual && (isEqual = this.carePlanId == otherTask.carePlanId);
        return isEqual;
    }
}
exports.Task = Task;
