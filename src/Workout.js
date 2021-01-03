import { Button } from '@material-ui/core';
import React from 'react';

import { CircularProgress } from '@material-ui/core';
import activityObjectElements from './variables/ActivityArray'
import screenNames from './variables/ScreenNames'
import './mainStyle.css';
import ConfirmBox from './SubComponents/ConfirmBox'
import Toast from './SubComponents/Toast'
import AlertBoxWithVideo from './SubComponents/AlertBoxWithVideo'

function Workout(props) {

  //------------------------
  //For the pop-up boxes
  const boxName = {EXIT_BOX: 'exitBox', VIDEO_BOX: 'videoBox'};
  const [openExitBox, setOpenExitBox] = React.useState(false);
  const [openVideoBox, setOpenVideoBox] = React.useState(false);

  const handleOpenBox = (boxUsing) => {
    if(!props.workoutPaused) {
      props.onClickPause();
    }
    if(boxUsing === boxName.EXIT_BOX) {
      setOpenExitBox(true);
    }
    else if(boxUsing === boxName.VIDEO_BOX) {
      setOpenVideoBox(true);
    }
  };
  const handleCloseBox = (boxUsing, exitConfirmed) => {
    if(boxUsing === boxName.EXIT_BOX) {
      setOpenExitBox(false);
      if(exitConfirmed) {
        props.onClickResetWorkoutData();
        props.onClickNewScreen(screenNames.WELCOME, true);
      }
    }
    else if(boxUsing === boxName.VIDEO_BOX) {
      setOpenVideoBox(false);
    }
  };
  //-------------------
  const secondsToTimer = (amountTimeInSec) => {
    var output = "";
    if(Math.floor(amountTimeInSec / 60) < 10) {
      output += "0";
    }
    output += Math.floor(amountTimeInSec / 60);
    output += ":"
    var seconds = amountTimeInSec - (Math.floor(amountTimeInSec / 60) * 60);
    if(seconds < 10) {
      output += "0";
    }
    output += seconds;
    return output;
  }
  if(props.activities == []) {
    return (<div className="centerWrapper"><CircularProgress /></div>);
  }
  else if(props.currentIndexInWorkout >= props.activities.length) {
    return (<div className="centerWrapper"><CircularProgress /></div>);
  }
  else{
    let activities = props.activities;
    let currentActivity = activities[props.currentIndexInWorkout];
    let currentActivityVideoLink = currentActivity[activityObjectElements.VIDEO_URL];
    let currentExerciseName = currentActivity[activityObjectElements.NAME];
    let nextExerciseName = props.currentIndexInWorkout + 1 < activities.length ? activities[props.currentIndexInWorkout + 1][activityObjectElements.NAME] : null;
    let currentExerciseDescription = currentActivity[activityObjectElements.DESC];
    let timeRemaining = currentActivity[activityObjectElements.TIME_IN_SEC] - props.timeInSecIntoCurrExercise;
    let isBeginningOfWorkout = (props.currentIndexInWorkout === 0 && props.timeInSecIntoCurrExercise === 0)
    let numReps = currentActivity[activityObjectElements.NUM_REPS];
    let numSecToDoReps = currentActivity[activityObjectElements.NUM_SEC_TO_DO_REPS];
    let isForTime = (numReps == null || numSecToDoReps == null);
    let openUpNextToast = (timeRemaining > 1 && timeRemaining < 10 && nextExerciseName != null);
    let openRepReminderToast = (numSecToDoReps != null &&
      (props.timeInSecIntoCurrExercise % numSecToDoReps > 0 && props.timeInSecIntoCurrExercise % numSecToDoReps <= 4));
    var interval = null;
    //do something if (props.timeInSecIntoCurrExercise) % 30 == 0  || props.timeInSecIntoCurrExercise - 1 & 30 == 0 so display changes for 2 seconds to alert user

    //for how do I do this: on click, pause workout and open in an alert box a video demonstration
    return (
      <div className="centerWrapper">
        <h1 style={{fontSize: "600%"}}>{currentExerciseName}</h1>
        <h1 style={{fontSize: "200%"}}>{currentExerciseDescription}</h1>
        <Button display={currentActivityVideoLink == null ? "none" : "inline"} color="primary" onClick={()=>handleOpenBox(boxName.VIDEO_BOX)} padding={100} margin={0}>
          How do I do this exercise?
        </Button>

        <h1 style={{fontSize: "400%", fontFamily: "monospace"}}>{secondsToTimer(timeRemaining)}</h1>
        <h3 style={{fontSize: "200%", fontFamily: "monospace"}}>{secondsToTimer(props.timeLeftInWorkoutTotal)}</h3>
        &nbsp;
        <div>
          <Button color="primary"
                  variant={props.workoutPaused? "contained" : "outlined"}
                  onClick={props.workoutPaused ? () => props.onClickResume() : () => props.onClickPause()}>
                    <h3>{props.workoutPaused ? (isBeginningOfWorkout ? "Start!" : "Resume!") : "Pause."}</h3>
          </Button>
          &nbsp;
          &nbsp;
          &nbsp;
          &nbsp;
          &nbsp;

          <Button color="primary"
                  variant="contained"
                  onClick={()=>handleOpenBox(boxName.EXIT_BOX)}>
            <h3>Cancel</h3>
          </Button>
        </div>
        <ConfirmBox title="Cancel workout?"
                    description="Do you want to be a lazy bones and cancel this workout?"
                    handleConfirmClose={()=>handleCloseBox(boxName.EXIT_BOX, true)}
                    confirmText="Yes."
                    handleDeclineClose={()=>handleCloseBox(boxName.EXIT_BOX, false)}
                    declineText="No, continue the workout!"
                    open={openExitBox}/>
        <AlertBoxWithVideo title={"Example of " + currentExerciseName}
                           videoURL={currentActivityVideoLink}
                           handleClose={()=>handleCloseBox(boxName.VIDEO_BOX, null)}
                           open={openVideoBox}/>

        <Toast open={openUpNextToast}
                message={"Up Next: " + nextExerciseName}
                horizontalPos="center"
                verticalPos="bottom"
                type="info"/>

        <Toast open={openRepReminderToast}
                        message={"Do another " + numReps + " now!"}
                        horizontalPos="center"
                        verticalPos="top"
                        type="error"/>

      </div>
    );
  }
}

export default Workout;