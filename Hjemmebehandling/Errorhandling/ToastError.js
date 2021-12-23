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
exports.ToastError = void 0;
const react_1 = __importStar(require("react"));
const material_1 = require("@mui/material");
const Slide_1 = __importDefault(require("@mui/material/Slide"));
class ToastError extends react_1.Component {
    constructor(props) {
        super(props);
        this.closeSnackbar = () => {
            this.setState({ snackbarOpen: false });
        };
    }
    TransitionUp(props) {
        return react_1.default.createElement(Slide_1.default, Object.assign({}, props, { direction: "up" }));
    }
    render() {
        return (react_1.default.createElement(react_1.default.Fragment, null, [this.props.error].map(e => {
            const error = e;
            return (react_1.default.createElement(material_1.Snackbar, { TransitionComponent: this.TransitionUp, open: true, autoHideDuration: 6000, onClose: this.closeSnackbar, anchorOrigin: { vertical: 'bottom', horizontal: 'right' } },
                react_1.default.createElement(material_1.Alert, { severity: this.props.severity, sx: { width: '100%' } },
                    react_1.default.createElement(material_1.Stack, null,
                        react_1.default.createElement(material_1.Typography, { variant: "subtitle1" }, error.displayTitle()),
                        react_1.default.createElement(material_1.Typography, { variant: "caption" }, error.displayUrl())),
                    error.displayMessage())));
        })));
    }
}
exports.ToastError = ToastError;
ToastError.defaultProps = {
    severity: "error"
};
