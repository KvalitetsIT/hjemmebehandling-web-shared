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
}