import { Button } from '@material-ui/core';
import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function ConfirmBox(props) {

    return (
      <Dialog
        open={props.open}
        onClose={()=>props.handleDeclineClose()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{props.description}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>props.handleConfirmClose()} color="primary">
            {props.confirmText}
          </Button>
          <Button onClick={()=>props.handleDeclineClose()} color="primary" autoFocus>
            {props.declineText}
          </Button>
        </DialogActions>
      </Dialog>
    );

}

export default ConfirmBox;