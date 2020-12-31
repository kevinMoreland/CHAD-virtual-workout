import { Button } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';

import screenNames from './variables/ScreenNames'
import './CenterWrapper.css';

//keep track of current position "i" in workout and time "s" in seconds into the workout
function Workout(props) {
  if(props.activities == []) {
    return (<div className="centerWrapper"><CircularProgress /></div>);
  }
  else if(props.currentIndexInWorkout >= props.activities.length) {
    return (<div className="centerWrapper"><CircularProgress /></div>);
  }
  else{
    let activities = props.activities;
    let currentExerciseName = activities[props.currentIndexInWorkout][0];
    let nextExerciseName = props.currentIndexInWorkout + 1 < activities.length ? activities[props.currentIndexInWorkout + 1][0] : null;
    let currentExerciseDescription = activities[props.currentIndexInWorkout][1];
    let timeRemaining = activities[props.currentIndexInWorkout][2] - props.timeInSecIntoCurrExercise;
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
                            onClick={() => props.onClickResume()}>
                              Test
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