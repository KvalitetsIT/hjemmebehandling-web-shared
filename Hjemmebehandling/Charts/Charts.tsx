import { Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import React from "react";
import ChartData, { Dataset } from "./ChartData";
import { Line } from "react-chartjs-2";
import IDateHelper from "../Helpers/interfaces/IDateHelper";
import ChartDataLabels from 'chartjs-plugin-datalabels';

export interface TableChartProps extends Omit<ChartProps, "renderChart"> {

}

export const TableChart = (props: TableChartProps) => {

    const renderTable = (answerLabels: (string | undefined)[], datasets: Array<Dataset>): JSX.Element => {
        return (
            <>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Dato</TableCell>
                            <TableCell>Værdi</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {answerLabels.map((date, index) => {
                            const dateToRender = date;
                            const dataPointToRender = datasets[0].data[index];
                            return (
                                <TableRow>
                                    <TableCell>{dateToRender}</TableCell>
                                    <TableCell>{dataPointToRender}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </>
        )
    }

    return (
        <Chart
            chartData={props.chartData}
            renderChart={(data) => {
                let answerData = data.answerData
                let answerLabels = data.answerLabels


                const dataSets: Dataset[] = []; //Each entry represents one line in the chart


                dataSets.push({ // This is the question-line of the graph
                    data: answerData,
                    fill: false,
                    datalabels: {
                        align: "start",
                        offset: 10, //space between point (the dot) and the number
                        clip: false //if true, data will be removed if outside the chart-area
                    },
                    pointRadius: 5,
                    backgroundColor: "black", // point color
                    borderColor: "black",
                    order: -99999 //If order is lowest, the line will be in front of other lines
                })

                return (<>{renderTable(answerLabels, dataSets)}</>)
            }}
        />
    )
}


export interface LineChartProps extends Omit<ChartProps, "renderChart"> {
    showThresholds?: boolean
    minimal?: boolean;
    minHeight?: number;
    maxHeight?: number;
    range?: { min: number, max: number }
}

export const LineChart = (props: LineChartProps) => {

    const displayName = LineChart.name;
    const defaultProps = {
        dateToString: (date: Date) => date.toLocaleDateString()
    }

    //const dateHelper!: IDateHelper

    const renderGraph = (data: { labels: (string | undefined)[], datasets: {} }): JSX.Element => {
        //Remove all the legends for the thresholdvalues (since we are only interested in the question being a legend)
        const options = {
            maintainAspectRatio: false,
            scales: {
                y: {
                    offset: true,
                    ticks: {
                        display: !props.minimal
                    },
                    grid: {
                        display: !props.minimal,

                    },
                    suggestedMin: props.range?.min,
                    suggestedMax: props.range?.max,
                },
                x: {
                    ticks: {
                        display: !props.minimal,
                        autoSkip: true,
                        maxRotation: 90,
                        minRotation: 90
                    },
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                annotation: {
                    annotations: props.chartData.getThresholdDatasets(props.showThresholds)
                },
                legend: {
                    labels: {
                        filter: function (item: { text: string }) {
                            return false
                        }
                    }
                }
            }
        }
        let plugins: any[] = []
        if (!props.minimal) {
            plugins = [ChartDataLabels as any]
        }
        return (<Line style={{ minHeight: props.minHeight, maxHeight: props.maxHeight }} plugins={plugins} options={options} data={data as any} />)
    }


    return (
        <Chart
            chartData={props.chartData}
            renderChart={(data) => {

                let answerData = data.answerData
                let answerLabels = data.answerLabels

                const dataSets = []; //Each entry represents one line in the chart

                dataSets.push(data.getDataDatasets(props.minimal))

                const x = {
                    labels: answerLabels,
                    datasets: dataSets,
                };

                return (<>{renderGraph(x)}</>);
            }}
        />
    )
}

LineChart.defaultProps = {
    minimal: false,
    showThresholds: true,
    dateToString: (date: Date) => date.toLocaleDateString(),

    minHeight: "400px",
    maxHeight: "600px"
  }


interface ChartProps {
    chartData: ChartData
    renderChart: (props: ChartData) => React.ReactElement
}

export const Chart = (props: ChartProps) => {
    return (<>{props.renderChart(props.chartData)}</>)
}