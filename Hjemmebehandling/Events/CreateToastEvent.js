"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateToastEventData = exports.CreateToastEvent = void 0;
const react_1 = __importDefault(require("react"));
const BaseEvent_1 = require("./BaseEvent");
class CreateToastEvent extends BaseEvent_1.BaseEvent {
    constructor(data) {
        super(CreateToastEvent.eventName);
        this.eventData = data;
    }
}
exports.CreateToastEvent = CreateToastEvent;
CreateToastEvent.eventName = "createToastEvent";
class CreateToastEventData {
    constructor() {
        this.title = "";
        this.JsxPrefix = (react_1.default.createElement(react_1.default.Fragment, null));
    }
}
exports.CreateToastEventData = CreateToastEventData;
