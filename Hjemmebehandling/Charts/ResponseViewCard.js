"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisplayModeEnum = void 0;
const material_1 = require("@mui/material");
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
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
    getFontWeight(displayMode) {
        return this.state.displayType == displayMode ? "bold" : "normal";
    }
    renderButton(mode) {
        react_1.default.createElement(material_1.Button, { sx: { fontWeight: this.getFontWeight(mode) }, onClick: () => this.setState({ displayType: mode }) }, mode.toString());
    }
    renderGraphTableSwitch() {
        const graphButtonWeight = this.state.displayType == DisplayModeEnum.GRAPH ? "bold" : "normal";
        const tableButtonWeight = this.state.displayType == DisplayModeEnum.TABLE ? "bold" : "normal";
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(material_1.Button, { sx: { fontWeight: graphButtonWeight }, onClick: () => this.setState({ displayType: DisplayModeEnum.GRAPH }) }, "Graf"),
            react_1.default.createElement(material_1.Button, { sx: { fontWeight: tableButtonWeight }, onClick: () => this.setState({ displayType: DisplayModeEnum.TABLE }) }, "Liste")));
    }
    renderContent(mode) {
        switch (mode) {
            case DisplayModeEnum.GRAPH: return (this.props.graph);
            case DisplayModeEnum.TABLE: return (this.props.table);
            default: return (this.props.graph);
        }
    }
    render() {
        var _a;
        const chartData = this.props.chartData;
        return (react_1.default.createElement(material_1.Card, null,
            react_1.default.createElement(material_1.CardHeader, { action: (_a = this.props.cardAction) !== null && _a !== void 0 ? _a : this.renderGraphTableSwitch(), subheader: react_1.default.createElement(material_1.Typography, { variant: "h6", fontWeight: "bold" }, chartData.label) }),
            react_1.default.createElement(material_1.Divider, null),
            react_1.default.createElement(material_1.CardContent, null,
                " ",
                this.renderContent(this.state.displayType),
                " ")));
    }
}
exports.default = ResponseViewCard;
ResponseViewCard.defaultProps = {
    showThresholds: true,
};
