import { Button } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import screenNames from './variables/ScreenNames'
import './CenterWrapper.css';

function Welcome(props) {
  return (
    <div className="centerWrapper">
        <h1>Welcome to CHAD.</h1>
        <Button color="primary" variant="contained" onClick={() => props.onClick(screenNames.SET_TIME)}>Begin Workout</Button>
    </div>
  );
}

export default Welcome;
