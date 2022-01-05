import * as React from 'react';
import Box from '@mui/material/Box';
import { Component } from 'react';
import { Chip, Stack, Typography } from '@mui/material';
import { ThresholdNumber } from '../Models/ThresholdNumber';
import { Question } from '../Models/Question';
import { CategoryEnum } from '../Models/CategoryEnum';


export interface Props {
    question: Question
    threshold: ThresholdNumber[]
}


export class ThresholdSlider extends Component<Props, {}> {
    static displayName = ThresholdSlider.name;

    constructor(props: Props) {
        super(props);
        this.state = {
            questionnaireResponses: [],
            loading: true
        }
    }

    getColorFromCategory(category: CategoryEnum): "success" | "warning" | "error" | "info" {
        if (category === CategoryEnum.GREEN)
            return "success"
        if (category === CategoryEnum.YELLOW)
            return "warning"
        if (category === CategoryEnum.RED)
            return "error"

        return "info"
    }

    compareThresholdNumbers(a: ThresholdNumber, b: ThresholdNumber): number {
        // a < b => Negative value
        // a == b => 0
        // a > b => Positive value

        let aFromIsUndefined = a.from === undefined;
        let aToIsUndefined = a.to === undefined;
        let bFromIsUndefined = b.from === undefined;
        let bToIsUndefined = b.to === undefined;

        if (aFromIsUndefined)
            return Number.MIN_SAFE_INTEGER
        if (aToIsUndefined)
            return Number.MAX_SAFE_INTEGER
        if (bFromIsUndefined)
            return Number.MAX_SAFE_INTEGER
        if (bToIsUndefined)
            return Number.MIN_SAFE_INTEGER

        return a.from! - b.from!
    }

    render(): JSX.Element {
        let oldTo: number | undefined = undefined;

        return (
            <Stack direction="row">
                {this.props.threshold.sort(this.compareThresholdNumbers).map(x => {
                    const shouldShowNewFrom = oldTo !== x.from;

                    oldTo = x.to;

                    return (
                        <>
                            {shouldShowNewFrom ? <Typography variant="caption" padding={1}>{x.from}</Typography> : <></>}

                            <Chip className='darkColor' width={100 / this.props.threshold.length + "%"} component={Box} sx={{ height: 10 }} color={this.getColorFromCategory(x.category)} />
                            <Typography variant="caption" padding={1}>{x.to}</Typography>
                        </>
                    )
                })}

            </Stack>
        );
    }
}