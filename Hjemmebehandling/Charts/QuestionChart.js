"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionChart = exports.DisplayModeEnum = void 0;
const React = __importStar(require("react"));
const react_1 = require("react");
const CategoryEnum_1 = require("../Models/CategoryEnum");
const react_chartjs_2_1 = require("react-chartjs-2");
const chartjs_plugin_datalabels_1 = __importDefault(require("chartjs-plugin-datalabels"));
const material_1 = require("@mui/material");
const InsertChart_1 = __importDefault(require("@mui/icons-material/InsertChart"));
const TableRows_1 = __importDefault(require("@mui/icons-material/TableRows"));
require("../Helpers/extensionMethods/Date");
var DisplayModeEnum;
(function (DisplayModeEnum) {
    DisplayModeEnum["GRAPH"] = "Graf";
    DisplayModeEnum["TABLE"] = "Tabel";
})(DisplayModeEnum = exports.DisplayModeEnum || (exports.DisplayModeEnum = {}));
class QuestionChart extends react_1.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayMode: DisplayModeEnum.GRAPH
        };
    }
    getChipColorFromCategory(category) {
        const transparency = 1;
        if (category === CategoryEnum_1.CategoryEnum.RED)
            return "#EE6969";
        if (category === CategoryEnum_1.CategoryEnum.YELLOW)
            return "#FFD78C";
        if (category === CategoryEnum_1.CategoryEnum.BLUE)
            return "rgba(75,192,192," + transparency + ")";
        return "#61BD84";
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
    createThresholdDataset(question, length) {
        const datasets = [];
        this.props.thresholds.forEach(threshold => {
            const dataFrom = [];
            const dataTo = [];
            for (let i = 0; i < length; i++) {
                if (!(threshold.from === undefined)) {
                    dataFrom.push(threshold.from);
                }
                if (!(threshold.to === undefined)) {
                    dataTo.push(threshold.to);
                }
            }
            //For each threshold, we add two lines; from and to
            //First create the from-line
            const fromDataset = {
                label: this.getDisplayNameFromCategory(threshold.category) + " (min)",
                data: dataFrom,
                pointRadius: 1,
                fill: false,
                datalabels: {
                    color: 'rgba(0,100,200,0)'
                },
                order: threshold.category,
                backgroundColor: this.getChipColorFromCategory(threshold.category),
                borderColor: this.getChipColorFromCategory(threshold.category)
            };
            datasets.push(fromDataset);
            //Then create the to-line
            const toDataset = {
                label: this.getDisplayNameFromCategory(threshold.category) + " (max)",
                data: dataTo,
                pointRadius: 1,
                fill: false,
                datalabels: {
                    color: 'rgba(0,100,200,0)'
                },
                order: threshold.category,
                backgroundColor: this.getChipColorFromCategory(threshold.category),
                borderColor: this.getChipColorFromCategory(threshold.category)
            };
            datasets.push(toDataset);
        });
        //Return the from and to line
        return datasets;
    }
    renderGraph(data) {
        //Remove all the legends for the thresholdvalues (since we are only interested in the question being a legend)
        const q = this.props.question.question;
        const options = {
            scales: {
                y: {
                    ticks: {
                        display: !this.props.minimal
                    }
                },
                x: {
                    ticks: {
                        display: !this.props.minimal
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        filter: function (item) {
                            return item.text === q;
                        }
                    }
                }
            }
        };
        let plugins = [];
        if (!this.props.minimal) {
            plugins = [chartjs_plugin_datalabels_1.default];
        }
        return (React.createElement(react_chartjs_2_1.Line, { height: 100, plugins: plugins, options: options, data: data }));
    }
    renderTable(answerLabels, datasets) {
        return (React.createElement(React.Fragment, null,
            React.createElement(material_1.Table, null,
                React.createElement(material_1.TableRow, null,
                    React.createElement(material_1.TableCell, null),
                    answerLabels.map(label => {
                        return (React.createElement(material_1.TableCell, null, label));
                    })),
                React.createElement(material_1.TableRow, null,
                    React.createElement(material_1.TableCell, null),
                    datasets[0].data.map(label => {
                        return (React.createElement(material_1.TableCell, null, label));
                    })))));
    }
    render() {
        const questionnaireResponses = this.props.questionnaireResponses;
        questionnaireResponses.sort((a, b) => a.answeredTime && b.answeredTime ? a.answeredTime.compareTo(b.answeredTime) : 0);
        const question = this.props.question;
        const answersData = []; //Contains all numbers that should be shown in chart
        const answersLabels = []; // Contains the x-axes values (dates)
        //Go through all responses and push answers and dates to answerData, and answerLabels
        for (let responseIndex = 0; responseIndex < questionnaireResponses.length; responseIndex++) {
            const response = questionnaireResponses[responseIndex];
            if (response && response.questions) {
                const questionnaireQuestion = Array.from(response.questions.keys()).find(x => x.Id == question.Id);
                const answer = response.questions.get(questionnaireQuestion);
                answersData.push(answer.answer);
                answersLabels.push(this.props.dateToString(response.answeredTime));
            }
        }
        const dataSets = []; //Each entry represents one line in the chart
        dataSets.push({
            label: this.props.minimal ? undefined : this.props.question.question,
            data: answersData,
            fill: false,
            datalabels: {
                align: "start",
                offset: 10,
                clip: false //if true, data will be removed if outside the chart-area
            },
            pointRadius: 5,
            backgroundColor: "rgba(0,100,200,1)",
            borderColor: "rgba(0,100,200,1)",
            order: -99999 //If order is lowest, the line will be in front of other lines
        });
        this.createThresholdDataset(question, questionnaireResponses.length).forEach(x => dataSets.push(x));
        const data = {
            labels: answersLabels,
            datasets: dataSets,
        };
        let button = React.createElement(React.Fragment, null);
        if (!this.props.minimal) {
            button = (React.createElement(React.Fragment, null,
                React.createElement(material_1.ButtonGroup, { sx: { paddingTop: 2 }, variant: "text" },
                    React.createElement(material_1.Tooltip, { title: "Vis i graf" },
                        React.createElement(material_1.Button, { disabled: this.state.displayMode == DisplayModeEnum.GRAPH, onClick: () => this.setState({ displayMode: DisplayModeEnum.GRAPH }) },
                            React.createElement(InsertChart_1.default, null))),
                    React.createElement(material_1.Tooltip, { title: "Vis i tabel" },
                        React.createElement(material_1.Button, { disabled: this.state.displayMode == DisplayModeEnum.TABLE, onClick: () => this.setState({ displayMode: DisplayModeEnum.TABLE }) },
                            React.createElement(TableRows_1.default, null))))));
        }
        if (this.state.displayMode === DisplayModeEnum.TABLE)
            return (React.createElement(React.Fragment, null,
                this.renderTable(answersLabels, dataSets),
                button));
        return (React.createElement(React.Fragment, null,
            this.renderGraph(data),
            button));
    }
}
exports.QuestionChart = QuestionChart;
QuestionChart.displayName = QuestionChart.name;
QuestionChart.defaultProps = {
    minimal: false,
    dateToString: (date) => date.toLocaleDateString()
};
