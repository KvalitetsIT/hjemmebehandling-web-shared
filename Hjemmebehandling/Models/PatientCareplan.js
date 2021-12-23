"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientCareplan = void 0;
class PatientCareplan {
    constructor() {
        this.planDefinitions = [];
        this.questionnaires = [];
    }
    clone() {
        const clone = new PatientCareplan();
        clone.id = this.id;
        clone.planDefinitions = this.planDefinitions;
        clone.questionnaires = this.questionnaires;
        clone.patient = this.patient;
        clone.creationDate = this.creationDate;
        clone.terminationDate = this.terminationDate;
        clone.department = this.department;
        return clone;
    }
}
exports.PatientCareplan = PatientCareplan;
