import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { sendMessageByEmail } from "../helpers";
import { IMessage } from "../interfaces/IMesagge";
import { useState } from "react";

interface IProps {
    open: boolean;
    handleClose: any;
    setMessage: any;
    setReportDisabled: any;
    questionaryName: string;
}

export default function FormDialog(props: IProps) { 
  
  const [ text, setText ] = useState("");

  const sendEmail = (e: any) => { 
    e.preventDefault(); 
    props.setReportDisabled(true);
    sendMessageByEmail(`${props.questionaryName}. Message form user: ${text}`) 
    .then((result) => { 
     console.log(result.text); 
     props.setMessage({
      severity: 'info',
      message: 'Se ha enviado el email de aviso a su administrador. En breve lo arreglamos.',
      showMessage: true
     } as IMessage);
    }, 
    (error) => { 
     console.log(error.text); 
     props.setMessage({
      severity: 'error',
      message: 'Se ha producido un error al enviar el email, contacte con su administrador.',
      showMessage: true
     } as IMessage);
    }); 
   };

   const handleOnClick = (e: any) => {
    sendEmail(e);
    setText('');
    props.handleClose(false);
   }

  return (
    <main>
      <Dialog open={props.open} onClose={() => props.handleClose(false)}>
        <DialogTitle>Ups!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Parece que ha habido un error en tu cuestionario, ¿podrías describir brevemente dónde?
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="answer"
            label="Respuesta"
            type="text"
            fullWidth
            variant="standard"
            value={text}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setText(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.handleClose(false)}>Cancelar</Button>
          <Button onClick={handleOnClick}>Enviar</Button>
        </DialogActions>
      </Dialog>
    </main>
  );
}