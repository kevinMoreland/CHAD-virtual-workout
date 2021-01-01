import { Button } from '@material-ui/core';
import './mainStyle.css';
import screenNames from './variables/ScreenNames'

function SetTime(props) {

  return (
    <div className="centerWrapper">
      <h1>How long do you want to workout?</h1>
      <h1>0{Math.floor(props.workoutLength / 60)}:{props.workoutLength % 60 === 0 ? "0" : ""}{props.workoutLength % 60}</h1>
      <div className="centerRow">
        <Button color="primary" variant="contained" onClick={() => props.onClickTimer(-15)}>-</Button>
        &nbsp;
        <Button color="primary" variant="contained" onClick={() => props.onClickTimer(15)}>+</Button>
      </div>
      &nbsp;
      <Button color="primary" variant="contained" onClick={() => props.onClickNewScreen(screenNames.SET_WORKOUT)}>ok!</Button>
    </div>
  );
}

export default SetTime;
