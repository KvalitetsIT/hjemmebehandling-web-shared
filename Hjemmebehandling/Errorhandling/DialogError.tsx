import { Dialog, DialogTitle, Typography, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import React, { Component, ReactNode } from "react";
import { BaseServiceError } from "./BaseServiceError";

interface Props {
    error: BaseServiceError
}

interface State {
    open: boolean
}

export class DialogError extends Component<Props, State>{

    constructor(props: Props) {
        super(props)
        this.state = {
            open: true
        }

        this.closeDialog = this.closeDialog.bind(this);
        this.logout = this.logout.bind(this);
        this.reloadPage = this.reloadPage.bind(this);
    }

    render(): ReactNode {
        const error = this.props.error;
        const shouldShowReloadButton = error.displaySettings().showRefreshButton;
        const shouldShowLogout = error.displaySettings().showLogoutButton;
        const showCloseButton = error.displaySettings().showCloseButton;

        return (
            <Dialog fullWidth open={this.state.open}>
                <DialogTitle id="alert-dialog-title">
                    <Typography variant="subtitle1">{error.displayTitle()}</Typography>
                    <Typography variant="caption">{error.displayUrl()}</Typography>

                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography variant="caption">{error.displayMessage()}</Typography>
                    </DialogContentText>


                </DialogContent>

                <DialogActions>
                    {showCloseButton ? <Button onClick={() => this.closeDialog()}>Luk besked</Button> : <></>}
                    {shouldShowReloadButton ? <Button autoFocus onClick={this.reloadPage}>Opdatér siden</Button> : <></>}
                    {shouldShowLogout ? <Button variant="contained" onClick={this.logout}>Log ud</Button> : <></>}
                </DialogActions>
            </Dialog>
        )
    }

    logout(): void {
        window.location.href = "/oauth2/sign_out";
    }

    reloadPage(): void {
        window.location.replace("/");
    }

    closeDialog() {
        const error = this.props.error
        if (error instanceof BaseServiceError && error?.displaySettings().whenClosed)
            error?.displaySettings()?.whenClosed();

        this.setState({ open: false })

    }
}