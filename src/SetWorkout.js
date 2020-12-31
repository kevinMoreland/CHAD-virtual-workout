import { Button } from '@material-ui/core';
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
      </div>
      &nbsp;
      <div className="centerRow">
        <Button color="primary"
                variant="contained"
                onClick={() => props.onClickNewScreen(screenNames.SET_TIME, false)}>Back</Button>
        &nbsp;
        <Button color="primary"
                variant="contained"
                onClick={() => props.onClickNewScreen(screenNames.SET_REST, false)}>Let's go!</Button>
      </div>

    </div>
  );
}

export default SetWorkout;
