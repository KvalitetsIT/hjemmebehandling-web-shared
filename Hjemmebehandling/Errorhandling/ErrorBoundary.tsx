import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";
import React, { ErrorInfo } from "react";
import { BaseServiceError } from "./BaseServiceError";
import { InternalServerError } from "./ServiceErrors/InternalServerError";
import { NotCorrectRightsError } from "./ServiceErrors/NotCorrectRightsError";
import { ToastError } from "./ToastError";

export interface Props {
  rerenderChildren: boolean
  ekstraText: string;
  showReloadButton: boolean;
}
export interface State {
  error?: Error
}

export class ErrorBoundary extends React.Component<Props, State> {
  public static defaultProps = {
    rerenderChildren: false,
    ekstraText: "",
    showReloadButton: false
  };

  constructor(props: Props) {
    super(props);
    this.state = { error: undefined };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { error: error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // You can also log the error to an error reporting service
    console.error(error)
    console.debug(errorInfo)

  }

  render(): JSX.Element {
    if (this.state.error) {
      // You can render any custom fallback UI
      if (this.shouldBeLargeError()) {
        return this.renderLargeError();
      }

      return (<>
        <Alert severity="error" title={this.props.ekstraText}>
          <Typography variant={this.props.ekstraText ? "caption" : "inherit"}>Der er opstået en fejl</Typography>
          <Typography>{this.props.ekstraText}</Typography>
          {this.props.showReloadButton ? <Button onClick={() => { this.reloadPage() }}>Genindlæs</Button> : <></>}
        </Alert>
        <ToastError error={this.state.error}></ToastError>
      </>)
    }

    return (
      <>
        {this.props.children}
      </>);
  }

  shouldBeLargeError(): boolean {
    if (this.state.error instanceof NotCorrectRightsError)
      return true;
    if (this.state.error instanceof InternalServerError)
      return true;

    return false;
  }
  logout(): void {
    window.location.href = "/oauth2/sign_out";
  }
  reloadPage(): void {
    window.location.replace("/");
  }

  renderLargeError() {
    const error = this.state.error as BaseServiceError
    const shouldShowLogout = error instanceof NotCorrectRightsError;
    const shouldShowReloadButton = true;

    return (
      <Dialog fullWidth open={true}>
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
          {shouldShowReloadButton ? <Button onClick={this.reloadPage}>Opdatér siden</Button> : <></>}
          {shouldShowLogout ? <Button variant="contained" onClick={this.logout}>Log ud</Button> : <></>}
        </DialogActions>
      </Dialog>
    )
  }
}
