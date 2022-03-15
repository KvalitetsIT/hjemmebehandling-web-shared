import { AlertColor } from "@mui/material";
import React from "react";
import { BaseEvent } from "./BaseEvent";

export class CreateToastEvent extends BaseEvent<CreateToastEventData> {
    static eventName: string = "createToastEvent"
    constructor(data: CreateToastEventData) {
        super(CreateToastEvent.eventName)
        this.eventData = data;
    }
}

export class CreateToastEventData {
    title: string = "";
    JsxPrefix: JSX.Element = (<></>);
    alertColor: AlertColor = "info";
    textColor: string = "black";

    constructor(title: string, alertColor?: AlertColor, textColor?: string, jsxPrefix?: JSX.Element) {
        this.title = title;
        this.JsxPrefix = jsxPrefix ?? this.JsxPrefix;
        this.alertColor = alertColor ?? this.alertColor
        this.textColor = textColor ?? this.textColor
    }
}