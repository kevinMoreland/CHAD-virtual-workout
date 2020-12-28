import { Button } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import './CenterWrapper.css';

function SetTime() {
  return (
    <div className="centerWrapper">
      <h1>Select a workout length.</h1>
      <h1>00:00</h1>
      <div className="centerRow">
        <Button color="primary" variant="contained" padding={6}>-</Button>
        &nbsp;
        <Button color="primary" variant="contained" padding={6}>+</Button>
      </div>
    </div>
  );
}

export default SetTime;
