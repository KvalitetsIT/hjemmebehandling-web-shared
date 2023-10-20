"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactDetails = void 0;
const StringFormatters_1 = require("../Helpers/ModelHelpers/StringFormatters");
class ContactDetails {
    primaryPhonenumberToString() {
        return StringFormatters_1.StringFormatter.FormatPhonenumber(this.primaryPhone);
    }
    secondaryPhonenumberToString() {
        return StringFormatters_1.StringFormatter.FormatPhonenumber(this.secondaryPhone);
    }
}
exports.ContactDetails = ContactDetails;
