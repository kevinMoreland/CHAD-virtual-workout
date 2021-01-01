import { Button } from '@material-ui/core';
import './CenterWrapper.css';
import screenNames from './variables/ScreenNames'
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';

function SetRest(props) {

  return (
    <div className="centerWrapper">
      <h1>How much rest do you need?</h1>
      <div className="centerRow">
        <Button color="primary" variant={props.workRestRatio == 5 ? "contained" : "outlined"}
                onClick={() => props.onClickSetWorkRestRatio(5)}>Less Rest</Button>
        &nbsp;
        <Button color="primary" variant={props.workRestRatio == 3 ? "contained" : "outlined"}
                onClick={() => props.onClickSetWorkRestRatio(3)}>Medium Rest</Button>
        &nbsp;
        <Button color="primary" variant={props.workRestRatio == 1 ? "contained" : "outlined"}
                onClick={() => props.onClickSetWorkRestRatio(1)}>More Rest</Button>
      </div>
      &nbsp;
      <div className="centerRow">
        <Button color="primary"
                variant="contained"
                onClick={() => props.onClickNewScreen(screenNames.SET_WORKOUT)}>Back</Button>
        &nbsp;
        <Button color="primary"
                variant="contained"
                onClick={() => props.onClickNewScreen(screenNames.WORKOUT)}>Let's go!</Button>
      </div>

    </div>
  );
}

export default SetRest;
