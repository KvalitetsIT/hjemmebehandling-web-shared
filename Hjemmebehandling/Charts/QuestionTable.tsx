import * as React from 'react';
import { Component } from 'react';
import { Line } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Button, ButtonGroup, Table, TableCell, TableRow, Tooltip } from '@mui/material';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import TableRowsIcon from '@mui/icons-material/TableRows';
import ChartData, { Dataset } from './ChartData';
import IDateHelper from '../Helpers/interfaces/IDateHelper';


export interface Props {
    chartData: ChartData
}

export class QuestionTable extends Component<Props, {}> {
    static displayName = QuestionTable.name;
    static defaultProps = {
        dateToString: (date: Date) => date.toLocaleDateString()
    }

    dateHelper!: IDateHelper


    renderTable(answerLabels: (string | undefined)[], datasets: Array<Dataset>): JSX.Element {
        return (
            <>
                <Table>
                    <TableRow>
                        <TableCell>

                        </TableCell>
                        {answerLabels.map(label => {
                            return (<TableCell>{label}</TableCell>)
                        })}
                    </TableRow>
                    <TableRow>
                        <TableCell>

                        </TableCell>
                        {datasets[0].data.map(label => {
                            return (<TableCell>{label}</TableCell>)
                        })}
                    </TableRow>
                </Table>
            </>
        )
    }



    render(): JSX.Element {

        let answerData = this.props.chartData.answerData
        let answerLabels = this.props.chartData.answerLabels


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
        const data: unknown = {
            labels: answerLabels,
            datasets: dataSets,
        };

        return (<>{this.renderTable(answerLabels, dataSets)}</>)

    }



}