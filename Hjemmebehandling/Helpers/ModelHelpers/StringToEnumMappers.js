"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringToEnumMappers = void 0;
const BaseModelStatus_1 = require("../../Models/BaseModelStatus");
class StringToEnumMappers {
    static stringToBaseModelStatus(stringStatus) {
        switch (stringStatus) {
            case "DRAFT":
                return BaseModelStatus_1.BaseModelStatus.DRAFT;
            case "ACTIVE":
                return BaseModelStatus_1.BaseModelStatus.ACTIVE;
            default:
                return BaseModelStatus_1.BaseModelStatus.UKENDT;
        }
    }
}
exports.StringToEnumMappers = StringToEnumMappers;
