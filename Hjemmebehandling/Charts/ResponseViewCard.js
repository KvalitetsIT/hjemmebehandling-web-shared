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
        return (react_1.default.createElement(react_1.default.Fragment, null,
            this.renderButton(DisplayModeEnum.GRAPH),
            this.renderButton(DisplayModeEnum.TABLE)));
    }
    render() {
        var _a;
        const chartData = this.props.chartData;
        return (react_1.default.createElement(material_1.Card, null,
            react_1.default.createElement(material_1.CardHeader, { action: (_a = this.props.cardAction) !== null && _a !== void 0 ? _a : this.renderGraphTableSwitch(), subheader: react_1.default.createElement(material_1.Typography, { variant: "h6", fontWeight: "bold" }, chartData.label) }),
            react_1.default.createElement(material_1.Divider, null),
            react_1.default.createElement(material_1.CardContent, null,
                this.state.displayType == DisplayModeEnum.GRAPH ? this.props.graph : react_1.default.createElement(react_1.default.Fragment, null),
                this.state.displayType == DisplayModeEnum.TABLE ? this.props.table : react_1.default.createElement(react_1.default.Fragment, null))));
    }
}
exports.default = ResponseViewCard;
ResponseViewCard.defaultProps = {
    showThresholds: true,
};
