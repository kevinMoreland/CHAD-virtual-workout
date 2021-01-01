import { Button } from '@material-ui/core';
import './CenterWrapper.css';
import screenNames from './variables/ScreenNames'
import exerciseGroups from './variables/ExerciseGroups'

function SetWorkout(props) {

  return (
    <div className="centerWrapper">
      <h1>What do you want to exercise?</h1>
      <div className="centerRow">
        <Button color="primary" variant={props.selectedExerciseGroups.includes(exerciseGroups.UPPER) ? "contained" : "outlined"}
                onClick={() => props.onClickSetWorkoutType(exerciseGroups.UPPER)}>Upper</Button>
        &nbsp;
        <Button color="primary" variant={props.selectedExerciseGroups.includes(exerciseGroups.LOWER) ? "contained" : "outlined"}
                onClick={() => props.onClickSetWorkoutType(exerciseGroups.LOWER)}>Lower</Button>
        &nbsp;
        <Button color="primary" variant={props.selectedExerciseGroups.includes(exerciseGroups.CORE)  ? "contained" : "outlined"}
                onClick={() => props.onClickSetWorkoutType(exerciseGroups.CORE)}>Core</Button>
      </div>
      &nbsp;
      <div className="centerRow">
        <Button color="primary"
                variant="contained"
                onClick={() => props.onClickNewScreen(screenNames.SET_TIME)}>Back</Button>
        &nbsp;
        <Button color="primary"
                variant="contained"
                onClick={() => props.onClickNewScreen(screenNames.SET_REST)}>Let's go!</Button>
      </div>

    </div>
  );
}

export default SetWorkout;
