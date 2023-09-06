"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableChart = void 0;
const material_1 = require("@mui/material");
const react_1 = __importDefault(require("react"));
const Charts_1 = require("./Charts");
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
    return (react_1.default.createElement(Charts_1.Chart, { chartData: props.chartData, renderChart: (data) => {
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
