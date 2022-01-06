"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringFormatter = void 0;
class StringFormatter {
    static FormatCpr(cpr) {
        if (!cpr)
            return "";
        return cpr.slice(0, 6) + "-" + cpr.slice(6);
    }
}
exports.StringFormatter = StringFormatter;
