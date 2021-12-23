"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientDetail = void 0;
const Contact_1 = require("./Contact");
const PatientSimple_1 = require("./PatientSimple");
//When we want to display all info about a patient
//Used in 
//-patient-details
class PatientDetail extends PatientSimple_1.PatientSimple {
    constructor() {
        super(...arguments);
        this.contact = new Contact_1.Contact();
    }
}
exports.PatientDetail = PatientDetail;
