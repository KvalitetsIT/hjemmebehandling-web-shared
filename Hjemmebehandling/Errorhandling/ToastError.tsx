import React, { Component } from "react";
import { Stack, Typography } from '@mui/material';
import { BaseServiceError } from "./BaseServiceError";
import { Toast } from "./Toast";

export interface Props {
    error: any
    severity: "error" | "info"
}

export class ToastError extends Component<Props, {}>{
    static defaultProps = {
        severity: "error"
    }

    constructor(props: Props) {
        super(props);
    }

    closeSnackbar = (): void => {
        this.setState({ snackbarOpen: false })
    };

    render(): JSX.Element {
        return (<>
            {[this.props.error].map(e => {

                const error = e as BaseServiceError
                return (
                    <>
                        <Toast snackbarColor="error" snackbarTitle="">
                            <Stack>
                                <Typography variant="subtitle1">{error.displayTitle()}</Typography>
                                <Typography variant="caption">{error.displayUrl()}</Typography>
                            </Stack>
                            {error.displayMessage()}
                        </Toast>
                    </>
                )
            })}

        </>
        )
    }
}