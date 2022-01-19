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
  showThresholds: boolean
  minimal: boolean;
}

export class QuestionChart extends Component<Props, {}> {
  static displayName = QuestionChart.name;
  static defaultProps = {
    minimal: false,
    showThresholds: true,
    dateToString: (date: Date) => date.toLocaleDateString()
  }

  dateHelper!: IDateHelper

  renderGraph(data: { labels: (string | undefined)[], datasets: {} }): JSX.Element {
    //Remove all the legends for the thresholdvalues (since we are only interested in the question being a legend)
    const options = {

      scales: {
        y: {
          ticks: {
            display: !this.props.minimal
          },
          grid: {
            display: !this.props.minimal,

          }
        },
        x: {
          ticks: {
            display: !this.props.minimal,
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
    if (!this.props.minimal) {
      plugins = [ChartDataLabels as any]
    }

    return (<Line height={100} plugins={plugins} options={options} data={data as any} />)
  }



  render(): JSX.Element {

    let answerData = this.props.chartData.answerData
    let answerLabels = this.props.chartData.answerLabels


    const dataSets = []; //Each entry represents one line in the chart


    dataSets.push(this.props.chartData.getDataDatasets(this.props.minimal))
    this.props.chartData.getThresholdDatasets(this.props.showThresholds).forEach(x => dataSets.push(x))

    const data = {
      labels: answerLabels,
      datasets: dataSets,
    };

    return (<>{this.renderGraph(data)}</>);
  }



}