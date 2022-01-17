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
exports.QuestionChart = void 0;
const React = __importStar(require("react"));
const react_1 = require("react");
const react_chartjs_2_1 = require("react-chartjs-2");
const chartjs_plugin_datalabels_1 = __importDefault(require("chartjs-plugin-datalabels"));
class QuestionChart extends react_1.Component {
    renderGraph(data) {
        //Remove all the legends for the thresholdvalues (since we are only interested in the question being a legend)
        const options = {
            scales: {
                y: {
                    ticks: {
                        display: !this.props.minimal
                    },
                    grid: {
                        display: true,
                    }
                },
                x: {
                    ticks: {
                        display: !this.props.minimal,
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
        if (!this.props.minimal) {
            plugins = [chartjs_plugin_datalabels_1.default];
        }
        return (React.createElement(react_chartjs_2_1.Line, { height: 100, plugins: plugins, options: options, data: data }));
    }
    render() {
        let answerData = this.props.chartData.answerData;
        let answerLabels = this.props.chartData.answerLabels;
        const dataSets = []; //Each entry represents one line in the chart
        dataSets.push(this.props.chartData.getDataDatasets(this.props.minimal));
        this.props.chartData.getThresholdDatasets(this.props.showThresholds).forEach(x => dataSets.push(x));
        const data = {
            labels: answerLabels,
            datasets: dataSets,
        };
        return (React.createElement(React.Fragment, null, this.renderGraph(data)));
    }
}
exports.QuestionChart = QuestionChart;
QuestionChart.displayName = QuestionChart.name;
QuestionChart.defaultProps = {
    minimal: false,
    showThresholds: true,
    dateToString: (date) => date.toLocaleDateString()
};
