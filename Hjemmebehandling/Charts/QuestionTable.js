"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionTable = void 0;
const React = __importStar(require("react"));
const react_1 = require("react");
const material_1 = require("@mui/material");
class QuestionTable extends react_1.Component {
    renderTable(answerLabels, datasets) {
        return (React.createElement(React.Fragment, null,
            React.createElement(material_1.Table, null,
                React.createElement(material_1.TableHead, null,
                    React.createElement(material_1.TableRow, null,
                        React.createElement(material_1.TableCell, null, "Dato"),
                        React.createElement(material_1.TableCell, null, "V\u00E6rdi"))),
                React.createElement(material_1.TableBody, null, answerLabels.map((date, index) => {
                    const dateToRender = date;
                    const dataPointToRender = datasets[0].data[index];
                    return (React.createElement(material_1.TableRow, null,
                        React.createElement(material_1.TableCell, null, dateToRender),
                        React.createElement(material_1.TableCell, null, dataPointToRender)));
                })))));
    }
    render() {
        let answerData = this.props.chartData.answerData;
        let answerLabels = this.props.chartData.answerLabels;
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
        const data = {
            labels: answerLabels,
            datasets: dataSets,
        };
        return (React.createElement(React.Fragment, null, this.renderTable(answerLabels, dataSets)));
    }
}
exports.QuestionTable = QuestionTable;
QuestionTable.displayName = QuestionTable.name;
QuestionTable.defaultProps = {
    dateToString: (date) => date.toLocaleDateString()
};
