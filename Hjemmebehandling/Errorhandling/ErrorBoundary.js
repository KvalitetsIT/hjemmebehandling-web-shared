"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorBoundary = void 0;
const material_1 = require("@mui/material");
const react_1 = __importDefault(require("react"));
const InternalServerError_1 = require("./ServiceErrors/InternalServerError");
const NotCorrectRightsError_1 = require("./ServiceErrors/NotCorrectRightsError");
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
            if (this.shouldBeLargeError()) {
                return this.renderLargeError();
            }
            return (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(material_1.Alert, { severity: "error", title: this.props.ekstraText },
                    react_1.default.createElement(material_1.Typography, { variant: this.props.ekstraText ? "caption" : "inherit" }, "Der er opst\u00E5et en fejl"),
                    react_1.default.createElement(material_1.Typography, null, this.props.ekstraText),
                    this.props.showReloadButton ? react_1.default.createElement(material_1.Button, { onClick: () => { this.reloadPage(); } }, "Genindl\u00E6s") : react_1.default.createElement(react_1.default.Fragment, null)),
                react_1.default.createElement(ToastError_1.ToastError, { error: this.state.error })));
        }
        return (react_1.default.createElement(react_1.default.Fragment, null, this.props.children));
    }
    shouldBeLargeError() {
        if (this.state.error instanceof NotCorrectRightsError_1.NotCorrectRightsError)
            return true;
        if (this.state.error instanceof InternalServerError_1.InternalServerError)
            return true;
        return false;
    }
    logout() {
        window.location.href = "/oauth2/sign_out";
    }
    reloadPage() {
        window.location.replace("/");
    }
    renderLargeError() {
        const error = this.state.error;
        const shouldShowLogout = error instanceof NotCorrectRightsError_1.NotCorrectRightsError;
        const shouldShowReloadButton = true;
        return (react_1.default.createElement(material_1.Dialog, { fullWidth: true, open: true },
            react_1.default.createElement(material_1.DialogTitle, { id: "alert-dialog-title" },
                react_1.default.createElement(material_1.Typography, { variant: "subtitle1" }, error.displayTitle()),
                react_1.default.createElement(material_1.Typography, { variant: "caption" }, error.displayUrl())),
            react_1.default.createElement(material_1.DialogContent, null,
                react_1.default.createElement(material_1.DialogContentText, null,
                    react_1.default.createElement(material_1.Typography, { variant: "caption" }, error.displayMessage()))),
            react_1.default.createElement(material_1.DialogActions, null,
                shouldShowReloadButton ? react_1.default.createElement(material_1.Button, { onClick: this.reloadPage }, "Opdat\u00E9r siden") : react_1.default.createElement(react_1.default.Fragment, null),
                shouldShowLogout ? react_1.default.createElement(material_1.Button, { variant: "contained", onClick: this.logout }, "Log ud") : react_1.default.createElement(react_1.default.Fragment, null))));
    }
}
exports.ErrorBoundary = ErrorBoundary;
ErrorBoundary.defaultProps = {
    rerenderChildren: false,
    ekstraText: "",
    showReloadButton: false
};
