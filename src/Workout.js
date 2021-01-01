import { Button } from '@material-ui/core';
import React from 'react';

import { CircularProgress } from '@material-ui/core';
import activityObjectElements from './variables/ActivityArray'
import screenNames from './variables/ScreenNames'
import './CenterWrapper.css';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

//keep track of current position "i" in workout and time "s" in seconds into the workout
function Workout(props) {
    const [open, setOpen] = React.useState(false);

    //For the confirmation box on if a user wants to cancel a workout
    const handleClickOpen = () => {
      if(!props.workoutPaused) {
        props.onClickPause();
      }
      setOpen(true);
    };

    const handleClose = (exitConfirmed) => {
      setOpen(false);
      if(exitConfirmed) {
        props.onClickResetWorkoutData();
        props.onClickNewScreen(screenNames.WELCOME, true);
      }
    };

  if(props.activities == []) {
    return (<div className="centerWrapper"><CircularProgress /></div>);
  }
  else if(props.currentIndexInWorkout >= props.activities.length) {
    return (<div className="centerWrapper"><CircularProgress /></div>);
  }
  else{
    let activities = props.activities;
    let currentActivity = activities[props.currentIndexInWorkout];
    let currentExerciseName = currentActivity[activityObjectElements.NAME];
    let nextExerciseName = props.currentIndexInWorkout + 1 < activities.length ? activities[props.currentIndexInWorkout + 1][activityObjectElements.NAME] : null;
    let currentExerciseDescription = currentActivity[activityObjectElements.DESC];
    let timeRemaining = currentActivity[activityObjectElements.TIME_IN_SEC] - props.timeInSecIntoCurrExercise;

    let numReps = currentActivity[activityObjectElements.NUM_REPS];
    let numSecToDoReps = currentActivity[activityObjectElements.NUM_SEC_TO_DO_REPS];
    let isForTime = (numReps == null || numSecToDoReps == null);
    var interval = null;
    //do something if (props.timeInSecIntoCurrExercise) % 30 == 0  || props.timeInSecIntoCurrExercise - 1 & 30 == 0 so display changes for 2 seconds to alert user


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
                  onClick={props.workoutPaused ? () => props.onClickResume() : () => props.onClickPause()}>
                    {props.workoutPaused ? "Start!" : "Pause."}
          </Button>
          &nbsp;
          <Button color="primary"
                  variant="contained"
                  onClick={handleClickOpen}>Cancel</Button>
          </div>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Cancel workout?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you a lazy bones that want to cancel this workout and return to the home screen?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>handleClose(true)} color="primary">
              Yes.
            </Button>
            <Button onClick={()=>handleClose(false)} color="primary" autoFocus>
              No, continue workout!
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default Workout;