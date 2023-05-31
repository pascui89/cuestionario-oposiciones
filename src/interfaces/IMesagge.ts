import { AlertColor } from "@mui/material";

export interface IMessage {
    severity?: AlertColor | undefined;
    showMessage: boolean;
    message: string;
}