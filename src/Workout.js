import { Button } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';

import screenNames from './variables/ScreenNames'
import './CenterWrapper.css';

//keep track of current position "i" in workout and time "s" in seconds into the workout
function Workout(props) {
  if(props.generatedWorkout == null) {
    return (<div className="centerWrapper"><CircularProgress /></div>);
  }
  else{
    let activities = props.generatedWorkout.activities;
    let currentExerciseName = activities[props.currentIndexInWorkout].name;
    let nextExerciseName = props.currentIndexInWorkout != activities.length - 1 ? activities[props.currentIndexInWorkout + 1].name : null;
    let currentExerciseDescription = props.generatedWorkout.activities[props.currentIndexInWorkout].description;
    let timeRemaining = activities[props.currentIndexInWorkout].amountTime - props.timeInSecIntoCurrExercise;
    return (
      <div className="centerWrapper">
        <div>
          <h1>[Graphic]</h1>
          <h1>{currentExerciseName}</h1>
          <h1>{currentExerciseDescription}</h1>
          <h1>{timeRemaining}</h1>
          <h1>{timeRemaining < 10 && nextExerciseName != null ? "Up next: " + nextExerciseName : " "}</h1>
        </div>
        &nbsp;
        <div>
          <Button color="primary"
                  variant="contained"
                  onClick={props.workoutPaused == true ? () => props.onClickResume() : () => props.onClickPause()}>
                    {props.workoutPaused == true ? "Start!" : "Pause."}
          </Button>
          <Button color="primary"
                  variant="contained"
                  onClick={() => props.onClickNewScreen(screenNames.WELCOME, true)}>Exit</Button>
          </div>
      </div>
    );
  }
}

export default Workout;