import { Button } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import './CenterWrapper.css';
import screenNames from './variables/ScreenNames'
import exerciseGroups from './variables/ExerciseGroups'

function SetWorkout(props) {

  return (
    <div className="centerWrapper">
      <h1>What do you want to exercise?</h1>
      <div className="centerRow">
        <Button color="primary" variant="contained"
                onClick={() => props.onClickSetWorkoutType(exerciseGroups.UPPER)}>Upper</Button>
        &nbsp;
        <Button color="primary" variant="contained"
                onClick={() => props.onClickSetWorkoutType(exerciseGroups.LOWER)}>Lower</Button>
        &nbsp;
        <Button color="primary" variant="contained"
                onClick={() => props.onClickSetWorkoutType(exerciseGroups.CORE)}>Core</Button>
        &nbsp;
        <Button color="primary" variant="contained"
                onClick={() => props.onClickSetWorkoutType(exerciseGroups.CARDIO)}>Cardio</Button>
      </div>
      &nbsp;
      <Button color="primary" variant="contained"
              onClick={() => props.onClickNewScreen(screenNames.WELCOME)}>Let's go!</Button>
    </div>
  );
}

export default SetWorkout;
