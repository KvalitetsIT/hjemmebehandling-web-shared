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
exports.ThresholdSlider = void 0;
const React = __importStar(require("react"));
const Box_1 = __importDefault(require("@mui/material/Box"));
const react_1 = require("react");
const material_1 = require("@mui/material");
const CategoryEnum_1 = require("../Models/CategoryEnum");
class ThresholdSlider extends react_1.Component {
    constructor(props) {
        super(props);
        this.state = {
            questionnaireResponses: [],
            loading: true
        };
    }
    getColorFromCategory(category) {
        if (category === CategoryEnum_1.CategoryEnum.GREEN)
            return "success";
        if (category === CategoryEnum_1.CategoryEnum.YELLOW)
            return "warning";
        if (category === CategoryEnum_1.CategoryEnum.RED)
            return "error";
        return "info";
    }
    compareThresholdNumbers(a, b) {
        // a < b => Negative value
        // a == b => 0
        // a > b => Positive value
        let aFromIsUndefined = a.from === undefined;
        let aToIsUndefined = a.to === undefined;
        let bFromIsUndefined = b.from === undefined;
        let bToIsUndefined = b.to === undefined;
        if (aFromIsUndefined)
            return Number.MIN_SAFE_INTEGER;
        if (aToIsUndefined)
            return Number.MAX_SAFE_INTEGER;
        if (bFromIsUndefined)
            return Number.MAX_SAFE_INTEGER;
        if (bToIsUndefined)
            return Number.MIN_SAFE_INTEGER;
        return a.from - b.from;
    }
    render() {
        let oldTo = undefined;
        let totalWidth = 0;
        this.props.threshold.forEach(threshold => {
            var _a, _b;
            const to = (_a = threshold.to) !== null && _a !== void 0 ? _a : 100;
            const from = (_b = threshold.from) !== null && _b !== void 0 ? _b : -100;
            totalWidth += to - from;
        });
        return (React.createElement(material_1.Stack, { direction: "row" }, this.props.threshold.sort(this.compareThresholdNumbers).map(x => {
            var _a, _b;
            const shouldShowNewFrom = oldTo !== x.from;
            oldTo = x.to;
            const to = (_a = x.to) !== null && _a !== void 0 ? _a : 100;
            const from = (_b = x.from) !== null && _b !== void 0 ? _b : 100;
            let size = (to - from) / totalWidth * 100;
            return (React.createElement(React.Fragment, null,
                shouldShowNewFrom ? React.createElement(material_1.Typography, { variant: "caption", padding: 1 }, x.from) : React.createElement(React.Fragment, null),
                React.createElement(material_1.Chip, { className: 'darkColor', width: size + "%", component: Box_1.default, sx: { height: 10 }, color: this.getColorFromCategory(x.category) }),
                React.createElement(material_1.Typography, { variant: "caption", padding: 1 }, x.to)));
        })));
    }
}
exports.ThresholdSlider = ThresholdSlider;
ThresholdSlider.displayName = ThresholdSlider.name;
