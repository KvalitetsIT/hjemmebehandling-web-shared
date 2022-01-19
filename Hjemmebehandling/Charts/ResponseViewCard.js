"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisplayModeEnum = void 0;
const material_1 = require("@mui/material");
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const QuestionChart_1 = require("./QuestionChart");
const QuestionTable_1 = require("./QuestionTable");
var DisplayModeEnum;
(function (DisplayModeEnum) {
    DisplayModeEnum["GRAPH"] = "Graf";
    DisplayModeEnum["TABLE"] = "Tabel";
})(DisplayModeEnum = exports.DisplayModeEnum || (exports.DisplayModeEnum = {}));
class ResponseViewCard extends react_2.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayType: DisplayModeEnum.GRAPH
        };
    }
    renderGraphTableSwitch() {
        const graphButtonWeight = this.state.displayType == DisplayModeEnum.GRAPH ? "bold" : "normal";
        const tableButtonWeight = this.state.displayType == DisplayModeEnum.TABLE ? "bold" : "normal";
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(material_1.Button, { sx: { fontWeight: graphButtonWeight }, onClick: () => this.setState({ displayType: DisplayModeEnum.GRAPH }) }, "Graf"),
            react_1.default.createElement(material_1.Button, { sx: { fontWeight: tableButtonWeight }, onClick: () => this.setState({ displayType: DisplayModeEnum.TABLE }) }, "Liste")));
    }
    render() {
        var _a;
        const chartData = this.props.chartData;
        return (react_1.default.createElement(material_1.Card, null,
            react_1.default.createElement(material_1.CardHeader, { action: (_a = this.props.cardAction) !== null && _a !== void 0 ? _a : this.renderGraphTableSwitch(), subheader: react_1.default.createElement(material_1.Typography, { variant: "h6", fontWeight: "bold" }, chartData.label) }),
            react_1.default.createElement(material_1.Divider, null),
            react_1.default.createElement(material_1.CardContent, null,
                this.state.displayType == DisplayModeEnum.GRAPH ? react_1.default.createElement(QuestionChart_1.QuestionChart, { showThresholds: this.props.showThresholds, chartData: chartData }) : react_1.default.createElement(react_1.default.Fragment, null),
                this.state.displayType == DisplayModeEnum.TABLE ? react_1.default.createElement(QuestionTable_1.QuestionTable, { chartData: chartData }) : react_1.default.createElement(react_1.default.Fragment, null))));
    }
}
exports.default = ResponseViewCard;
ResponseViewCard.defaultProps = {
    showThresholds: true,
};
