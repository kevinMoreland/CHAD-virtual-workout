import { Button } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import screenNames from './variables/ScreenNames'
import './CenterWrapper.css';

function Workout(props) {
  return (
    <div className="centerWrapper">
        <h1>[Graphic]</h1>
        <h1>Workout Name Here</h1>
        <h1>00:00</h1>
        <Button color="primary"
                variant="contained"
                onClick={() => props.onClickNewScreen(screenNames.SET_WORKOUT, true)}>Back</Button>
    </div>
  );
}

export default Workout;
