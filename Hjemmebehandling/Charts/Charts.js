"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chart = exports.LineChart = exports.TableChart = void 0;
const material_1 = require("@mui/material");
const react_1 = __importDefault(require("react"));
const react_chartjs_2_1 = require("react-chartjs-2");
const chartjs_plugin_datalabels_1 = __importDefault(require("chartjs-plugin-datalabels"));
const TableChart = (props) => {
    const renderTable = (answerLabels, datasets) => {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(material_1.Table, null,
                react_1.default.createElement(material_1.TableHead, null,
                    react_1.default.createElement(material_1.TableRow, null,
                        react_1.default.createElement(material_1.TableCell, null, "Dato"),
                        react_1.default.createElement(material_1.TableCell, null, "V\u00E6rdi"))),
                react_1.default.createElement(material_1.TableBody, null, answerLabels.map((date, index) => {
                    const dateToRender = date;
                    const dataPointToRender = datasets[0].data[index];
                    return (react_1.default.createElement(material_1.TableRow, null,
                        react_1.default.createElement(material_1.TableCell, null, dateToRender),
                        react_1.default.createElement(material_1.TableCell, null, dataPointToRender)));
                })))));
    };
    return (react_1.default.createElement(exports.Chart, { chartData: props.chartData, renderChart: (data) => {
            let answerData = data.answerData;
            let answerLabels = data.answerLabels;
            const dataSets = []; //Each entry represents one line in the chart
            dataSets.push({
                data: answerData,
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
            });
            return (react_1.default.createElement(react_1.default.Fragment, null, renderTable(answerLabels, dataSets)));
        } }));
};
exports.TableChart = TableChart;
const LineChart = (props) => {
    const displayName = exports.LineChart.name;
    const defaultProps = {
        dateToString: (date) => date.toLocaleDateString()
    };
    //const dateHelper!: IDateHelper
    const renderGraph = (data) => {
        var _a, _b;
        //Remove all the legends for the thresholdvalues (since we are only interested in the question being a legend)
        const options = {
            maintainAspectRatio: false,
            scales: {
                y: {
                    offset: true,
                    ticks: {
                        display: !props.minimal
                    },
                    grid: {
                        display: !props.minimal,
                    },
                    suggestedMin: (_a = props.range) === null || _a === void 0 ? void 0 : _a.min,
                    suggestedMax: (_b = props.range) === null || _b === void 0 ? void 0 : _b.max,
                },
                x: {
                    ticks: {
                        display: !props.minimal,
                        autoSkip: true,
                        maxRotation: 90,
                        minRotation: 90
                    },
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                annotation: {
                    annotations: props.chartData.getThresholdDatasets(props.showThresholds)
                },
                legend: {
                    labels: {
                        filter: function (item) {
                            return false;
                        }
                    }
                }
            }
        };
        let plugins = [];
        if (!props.minimal) {
            plugins = [chartjs_plugin_datalabels_1.default];
        }
        return (react_1.default.createElement(react_chartjs_2_1.Line, { style: { minHeight: props.minHeight, maxHeight: props.maxHeight }, plugins: plugins, options: options, data: data }));
    };
    return (react_1.default.createElement(exports.Chart, { chartData: props.chartData, renderChart: (data) => {
            let answerData = data.answerData;
            let answerLabels = data.answerLabels;
            const dataSets = []; //Each entry represents one line in the chart
            dataSets.push(data.getDataDatasets(props.minimal));
            const x = {
                labels: answerLabels,
                datasets: dataSets,
            };
            return (react_1.default.createElement(react_1.default.Fragment, null, renderGraph(x)));
        } }));
};
exports.LineChart = LineChart;
exports.LineChart.defaultProps = {
    minimal: false,
    showThresholds: true,
    dateToString: (date) => date.toLocaleDateString(),
    minHeight: "400px",
    maxHeight: "600px"
};
const Chart = (props) => {
    return (react_1.default.createElement(react_1.default.Fragment, null, props.renderChart(props.chartData)));
};
exports.Chart = Chart;
