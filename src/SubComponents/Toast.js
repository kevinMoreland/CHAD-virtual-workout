import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

//also accept an audio to play as option
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(0),
    },
    "& .MuiAlert-icon": {
          fontSize: 0
    },
  },
}));

function Toast(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Snackbar open={props.open}
                anchorOrigin={{vertical: props.verticalPos, horizontal: props.horizontalPos}}>
        <Alert severity={props.type}>
          <h2 style={{marginRight:24, marginLeft:20}}>{props.message}</h2>
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Toast;
