import { StringMappingType } from "typescript";
import { NumberAnswer } from "../Models/Answer";
import { CategoryEnum } from "../Models/CategoryEnum";
import { Question } from "../Models/Question";
import { QuestionnaireResponse } from "../Models/QuestionnaireResponse";
import { ThresholdCollection } from "../Models/ThresholdCollection";
import "../Helpers/extensionMethods/Date"
export interface Dataset {
    data: number[],
    label?: string,
    fill: boolean,
    datalabels: DataLabel,
    pointRadius: number,
    backgroundColor: string, // point color
    borderColor: string,
    order: number //If order is lowest, the line will be in front of other lines
}

export interface DataLabel {
    align?: string,
    color?: string,
    offset?: number, //space between point (the dot) and the number
    clip?: boolean //if true, data will be removed if outside the chart-area
}

export default class ChartData {
    answerData: number[];//Contains all numbers that should be shown in chart
    answerLabels: string[];// Contains the x-axes values (dates)
    label: string;
    numberOfResponses: number;
    thresholdCollection: ThresholdCollection | undefined;

    dateToString: (date: Date) => string;


    constructor(questionnaireResponses: QuestionnaireResponse[], question: Question, thresholdCollection: ThresholdCollection | undefined, dateToString: (date: Date) => string) {
        this.answerData = [];
        this.answerLabels = []
        this.label = question.question ?? "";
        this.thresholdCollection = thresholdCollection;
        this.numberOfResponses = questionnaireResponses.length
        this.dateToString = dateToString
        this.FromQuestionnaireResponsesToDataset(questionnaireResponses, question);
    }

    getChipColorFromCategory(category: CategoryEnum, showThresholds: boolean): string {
        if (!showThresholds)
            return "rgba(75,192,192,0)";

        const greenLight = '#D0EFDC'

        const yellowLight = '#FFEFD0'

        const redLight = '#FAD8D7'

        const transparency = 1
        if (category === CategoryEnum.RED)
            return redLight
        if (category === CategoryEnum.YELLOW)
            return yellowLight
        if (category === CategoryEnum.BLUE)
            return "rgba(75,192,192," + transparency + ")"

        return greenLight

    }

    getDisplayNameFromCategory(category: CategoryEnum): string {
        if (category === CategoryEnum.RED)
            return "Rød"
        if (category === CategoryEnum.YELLOW)
            return "Gul"
        if (category === CategoryEnum.GREEN)
            return "Grøn"
        if (category === CategoryEnum.BLUE)
            return "Blå"

        return "Ukendt"
    }

    getThresholdDatasets(showThresholds: boolean) {
        const datasets: Dataset[] = [];
        let isFirstIteration = true;

        if (!this.thresholdCollection?.thresholdNumbers)
            return []

        this.thresholdCollection?.thresholdNumbers.forEach(threshold => {


            const dataFrom = [];
            const dataTo = [];

            for (let i = 0; i < this.numberOfResponses; i++) {
                if (!(threshold.from === undefined)) {
                    dataFrom.push(threshold.from)
                }
                if (!(threshold.to === undefined)) {
                    dataTo.push(threshold.to)
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
                const whiteDataset: Dataset = {
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
                }
                datasets.push(whiteDataset)
            }
            //For each threshold, we add two lines; from and to

            //First create the from-line
            const fromDataset: Dataset = {
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
            }


            datasets.push(fromDataset)

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
            }
            datasets.push(toDataset)
        })
        //Return the from and to line
        return datasets
    }

    getDataDatasets(showLabels: boolean) {
        return { // This is the question-line of the graph
            label: showLabels,
            data: this.answerData,
            fill: false,
            datalabels: {
                align: "start",
                offset: 10, //space between point (the dot) and the number
                clip: false //if true, data will be removed if outside the chart-area
            },
            pointRadius: 5,
            backgroundColor: "black", // point color
            borderColor: "black",
            order: -99999 //If order is lowest, the line will be in front of other lines
        }
    }
    private FromQuestionnaireResponsesToDataset(questionnaireResponses: QuestionnaireResponse[], question: Question) {
        questionnaireResponses.sort((a, b) => a.answeredTime && b.answeredTime ? a.answeredTime.compareTo(b.answeredTime) : 0)

        //Go through all responses and push answers and dates to answerData, and answerLabels
        for (let responseIndex = 0; responseIndex < questionnaireResponses.length; responseIndex++) {


            const response = questionnaireResponses[responseIndex];
            if (response && response.questions) {
                const questionnaireQuestion = Array.from(response.questions.keys()).find(x => x.Id == question.Id);
                const answer = response.questions.get(questionnaireQuestion!) as NumberAnswer
                
                if(answer.answer != undefined){
                    this.answerData.push(answer.answer)
                    this.answerLabels.push(this.dateToString(response.answeredTime!))
                }
                
                
            }
        }
    }
}