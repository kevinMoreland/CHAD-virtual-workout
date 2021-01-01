import { Button } from '@material-ui/core';
import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function AlertBoxWithVideo(props) {
    return (
      <Dialog
        open={props.open}
        onClose={()=>props.handleClose()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <iframe
            id="video"
            width="560" height="315"
            src={props.videoURL}
            frameBorder="0"
            allow="accelerometer, autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>props.handleClose()} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );

}

export default AlertBoxWithVideo;