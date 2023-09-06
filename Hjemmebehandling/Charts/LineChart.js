"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineChart = void 0;
const react_1 = __importDefault(require("react"));
const Charts_1 = require("./Charts");
const chartjs_plugin_datalabels_1 = __importDefault(require("chartjs-plugin-datalabels"));
const LineChart = (props) => {
    const displayName = exports.LineChart.name;
    const defaultProps = {
        dateToString: (date) => date.toLocaleDateString()
    };
    //const dateHelper!: IDateHelper
    const renderGraph = (data) => {
        var _a, _b, _c;
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
                    annotations: props.chartData.getThresholdDatasets((_c = props.showThresholds) !== null && _c !== void 0 ? _c : true) // <- Defaults to true
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
        //return (<Line style={{ minHeight: props.minHeight, maxHeight: props.maxHeight }} plugins={plugins} options={options} data={data as any} />)
        return (props.renderChart(options, data, plugins));
    };
    return (react_1.default.createElement(Charts_1.Chart, { chartData: props.chartData, renderChart: (data) => {
            var _a;
            let answerData = data.answerData;
            let answerLabels = data.answerLabels;
            const dataSets = []; //Each entry represents one line in the chart
            dataSets.push(data.getDataDatasets((_a = props.minimal) !== null && _a !== void 0 ? _a : false));
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
