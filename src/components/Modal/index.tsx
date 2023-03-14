import React from "react";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Dialog } from "@mui/material";
import { Recado } from "../../types/recadoType";

interface ModalProps {
  open: boolean;
  handleClose: () => void;
  conteudo: Recado;
  indice: number;
}

function Modal({ open, handleClose, conteudo, indice }: ModalProps) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>
        {`Tem certeza que deseja excluir o recado de ID ${indice}?`}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          Ao confirmar esta ação, não poderá ser desfeita.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Confirmo</Button>
        <Button onClick={handleClose} autoFocus>
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Modal;
