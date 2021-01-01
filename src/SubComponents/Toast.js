import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

function Toast(props) {
  return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={props.open}
        message={props.message}
        style={{backgroundColor: "#EBE686"}}/>
  );
}

export default Toast;
