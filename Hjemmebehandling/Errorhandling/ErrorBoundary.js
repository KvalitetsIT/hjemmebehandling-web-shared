"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorBoundary = void 0;
const material_1 = require("@mui/material");
const react_1 = __importDefault(require("react"));
const ToastError_1 = require("./ToastError");
class ErrorBoundary extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = { error: undefined };
    }
    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { error: error };
    }
    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.error(error);
        console.debug(errorInfo);
    }
    render() {
        if (this.state.error) {
            // You can render any custom fallback UI
            return (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(material_1.Alert, { severity: "error", title: this.props.ekstraText },
                    react_1.default.createElement(material_1.Typography, { variant: this.props.ekstraText ? "caption" : "inherit" }, "Der er opst\u00E5et en fejl"),
                    react_1.default.createElement(material_1.Typography, null, this.props.ekstraText)),
                react_1.default.createElement(ToastError_1.ToastError, { error: this.state.error })));
        }
        return (react_1.default.createElement(react_1.default.Fragment, null, this.props.children));
    }
}
exports.ErrorBoundary = ErrorBoundary;
ErrorBoundary.defaultProps = {
    rerenderChildren: false,
    ekstraText: ""
};
