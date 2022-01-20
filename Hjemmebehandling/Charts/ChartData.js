"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CategoryEnum_1 = require("../Models/CategoryEnum");
require("../Helpers/extensionMethods/Date");
class ChartData {
    constructor(questionnaireResponses, question, thresholdCollection, dateToString) {
        this.answerData = [];
        this.answerLabels = [];
        this.label = question.question;
        this.thresholdCollection = thresholdCollection;
        this.numberOfResponses = questionnaireResponses.length;
        this.dateToString = dateToString;
        this.FromQuestionnaireResponsesToDataset(questionnaireResponses, question);
    }
    getChipColorFromCategory(category, showThresholds) {
        if (!showThresholds)
            return "rgba(75,192,192,0)";
        const greenLight = '#D0EFDC';
        const yellowLight = '#FFEFD0';
        const redLight = '#FAD8D7';
        const transparency = 1;
        if (category === CategoryEnum_1.CategoryEnum.RED)
            return redLight;
        if (category === CategoryEnum_1.CategoryEnum.YELLOW)
            return yellowLight;
        if (category === CategoryEnum_1.CategoryEnum.BLUE)
            return "rgba(75,192,192," + transparency + ")";
        return greenLight;
    }
    getDisplayNameFromCategory(category) {
        if (category === CategoryEnum_1.CategoryEnum.RED)
            return "Rød";
        if (category === CategoryEnum_1.CategoryEnum.YELLOW)
            return "Gul";
        if (category === CategoryEnum_1.CategoryEnum.GREEN)
            return "Grøn";
        if (category === CategoryEnum_1.CategoryEnum.BLUE)
            return "Blå";
        return "Ukendt";
    }
    getThresholdDatasets(showThresholds) {
        var _a, _b;
        const datasets = [];
        let isFirstIteration = true;
        if (!((_a = this.thresholdCollection) === null || _a === void 0 ? void 0 : _a.thresholdNumbers))
            return [];
        (_b = this.thresholdCollection) === null || _b === void 0 ? void 0 : _b.thresholdNumbers.forEach(threshold => {
            const dataFrom = [];
            const dataTo = [];
            for (let i = 0; i < this.numberOfResponses; i++) {
                if (!(threshold.from === undefined)) {
                    dataFrom.push(threshold.from);
                }
                if (!(threshold.to === undefined)) {
                    dataTo.push(threshold.to);
                }
            }
            //First iteration is expected to have the lowest from-value
            //https://nextstepcitizen.atlassian.net/browse/RIM-493
            //When a value is below the defined area of thresholds
            //The value should have white background, and not the 
            //same background as the one with lowest from-value
            if (isFirstIteration) {
                isFirstIteration = false;
                //First create the from-line
                const whiteDataset = {
                    label: "white",
                    data: dataFrom,
                    pointRadius: 1,
                    fill: true,
                    datalabels: {
                        color: "rgba(0,100,200,0)"
                    },
                    order: -888,
                    backgroundColor: "white",
                    borderColor: this.getChipColorFromCategory(threshold.category, showThresholds)
                };
                datasets.push(whiteDataset);
            }
            //For each threshold, we add two lines; from and to
            //First create the from-line
            const fromDataset = {
                label: this.getDisplayNameFromCategory(threshold.category) + " (min)",
                data: dataFrom,
                pointRadius: 1,
                fill: true,
                datalabels: {
                    color: "rgba(0,100,200,0)"
                },
                order: threshold.category,
                backgroundColor: this.getChipColorFromCategory(threshold.category, showThresholds),
                borderColor: this.getChipColorFromCategory(threshold.category, showThresholds)
            };
            datasets.push(fromDataset);
            //Then create the to-line
            const toDataset = {
                label: this.getDisplayNameFromCategory(threshold.category) + " (max)",
                data: dataTo,
                pointRadius: 1,
                fill: true,
                datalabels: {
                    color: 'rgba(0,100,200,0)'
                },
                order: threshold.category,
                backgroundColor: this.getChipColorFromCategory(threshold.category, showThresholds),
                borderColor: this.getChipColorFromCategory(threshold.category, showThresholds)
            };
            datasets.push(toDataset);
        });
        //Return the from and to line
        return datasets;
    }
    getDataDatasets(showLabels) {
        return {
            label: showLabels,
            data: this.answerData,
            fill: false,
            datalabels: {
                align: "start",
                offset: 10,
                clip: false //if true, data will be removed if outside the chart-area
            },
            pointRadius: 5,
            backgroundColor: "black",
            borderColor: "black",
            order: -99999 //If order is lowest, the line will be in front of other lines
        };
    }
    FromQuestionnaireResponsesToDataset(questionnaireResponses, question) {
        questionnaireResponses.sort((a, b) => a.answeredTime && b.answeredTime ? a.answeredTime.compareTo(b.answeredTime) : 0);
        //Go through all responses and push answers and dates to answerData, and answerLabels
        for (let responseIndex = 0; responseIndex < questionnaireResponses.length; responseIndex++) {
            const response = questionnaireResponses[responseIndex];
            if (response && response.questions) {
                const questionnaireQuestion = Array.from(response.questions.keys()).find(x => x.Id == question.Id);
                const answer = response.questions.get(questionnaireQuestion);
                if (answer.answer != undefined) {
                    this.answerData.push(answer.answer);
                    this.answerLabels.push(this.dateToString(response.answeredTime));
                }
            }
        }
    }
}
exports.default = ChartData;
