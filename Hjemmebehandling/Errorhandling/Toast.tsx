import * as React from 'react';
import { Component } from 'react';
import Alert, { AlertColor } from '@mui/material/Alert';
import { Slide, SlideProps, Snackbar } from '@mui/material';

export interface ToastData {
    snackbarColor: AlertColor,
    snackbarTitle: string
}

export interface State {
    snackbarOpen: boolean
}

export class Toast extends Component<ToastData, State> {
    static displayName = Toast.name;

    constructor(props: ToastData) {
        super(props);
        this.state = {
            snackbarOpen: true
        }
    }
    TransitionUp(props: SlideProps): JSX.Element {
        return <Slide {...props} direction="up" />;
    }
    closeSnackbar = (): void => {
        this.setState({ snackbarOpen: false })
    };

    render(): JSX.Element {
        let props = this.props
        return (
            <>
                <Snackbar TransitionComponent={this.TransitionUp} open={this.state.snackbarOpen} autoHideDuration={6000} onClose={this.closeSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                    <Alert severity={props.snackbarColor} sx={{ width: '100%' }}>
                        <h5>{props.snackbarTitle}</h5>
                        {props.children}
                    </Alert>
                </Snackbar>
            </>
        );
    }

}
