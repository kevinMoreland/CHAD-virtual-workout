import { Button } from '@material-ui/core';
import './mainStyle.css';
import screenNames from './variables/ScreenNames'

function SetRest(props) {

  return (
    <div className="centerWrapper">
      <h1>How much rest do you need?</h1>
      <div className="centerRow">
        <Button color="primary" variant={props.restLevel == 0 ? "contained" : "outlined"}
                onClick={() => props.onClickSetRestLevel(0)}>Less Rest</Button>
        &nbsp;
        <Button color="primary" variant={props.restLevel == 1 ? "contained" : "outlined"}
                onClick={() => props.onClickSetRestLevel(1)}>Medium Rest</Button>
        &nbsp;
        <Button color="primary" variant={props.restLevel == 2 ? "contained" : "outlined"}
                onClick={() => props.onClickSetRestLevel(2)}>More Rest</Button>
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
