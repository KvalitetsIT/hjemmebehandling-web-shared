import { Button, Card, CardContent, CardHeader, Divider, Typography } from "@mui/material";
import React, { ReactElement, useState } from "react";
import { Component, ReactNode } from "react";
import { QuestionChart } from "./QuestionChart";
import { QuestionTable } from "./QuestionTable";
import ChartData from "./ChartData";
import { Chart } from "./Charts";

export enum DisplayModeEnum {
    GRAPH = "Graf",
    TABLE = "Tabel"
}

export interface Props {
    chartData: ChartData
    showThresholds: boolean
    cardAction?: JSX.Element
    graph?: ReactElement<typeof Chart>
    table?: ReactElement<typeof Chart>
}

export interface State {
    displayType: DisplayModeEnum
}

export default class ResponseViewCard extends Component<Props, State> {
    static defaultProps = {
        showThresholds: true,
    }

    constructor(props: Props) {
        super(props);
        this.state = {
            displayType: DisplayModeEnum.GRAPH
        }
    }

    getFontWeight(displayMode: DisplayModeEnum) {
        return this.state.displayType == displayMode ? "bold" : "normal";
    }

    renderButton(mode: DisplayModeEnum) {
        <Button sx={{ fontWeight: this.getFontWeight(mode) }} onClick={() => this.setState({ displayType: mode })}>{mode.toString()}</Button>
    }

    renderGraphTableSwitch() {
        return (
            <>
                {
                    Object.values(DisplayModeEnum).forEach(element => {
                        this.renderButton(element)
                    })
                }</>
        )
    }

    // Graph
    // <LineChart showThresholds={this.props.showThresholds} chartData={chartData} />

    // Table
    // <TableChart chartData={chartData} />


    render(): ReactNode {
        const chartData = this.props.chartData;

        return (
            <Card>
                <CardHeader action={this.props.cardAction ?? this.renderGraphTableSwitch()} subheader={<Typography variant="h6" fontWeight="bold">{chartData.label}</Typography>} />
                <Divider />
                <CardContent>
                    {this.state.displayType == DisplayModeEnum.GRAPH ? this.props.graph : <></>}
                    {this.state.displayType == DisplayModeEnum.TABLE ? this.props.table : <></>}
                </CardContent>
            </Card>
        )
    }
}
