import { Button } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import './CenterWrapper.css';
import screenNames from './variables/ScreenNames'

function SetTime(props) {

  return (
    <div className="centerWrapper">
      <h1>How long do you want to workout?</h1>
      <h1>0{Math.floor(props.minutes / 60)}:{props.minutes % 60 == 0 ? "0" : ""}{props.minutes % 60}</h1>
      <div className="centerRow">
        <Button color="primary" variant="contained" onClick={() => props.onClickTimer(-15)}>-</Button>
        &nbsp;
        <Button color="primary" variant="contained" onClick={() => props.onClickTimer(15)}>+</Button>
      </div>
      &nbsp;
      <Button color="primary" variant="contained" onClick={() => props.onClickNewScreen(screenNames.SET_WORKOUT)}>Let's go!</Button>
    </div>
  );
}

export default SetTime;
