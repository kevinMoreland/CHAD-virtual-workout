import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import screenNames from './variables/ScreenNames'
import exerciseGroups from './variables/ExerciseGroups'
import activityObjectElements from './variables/ActivityArray'
import reportWebVitals from './reportWebVitals';
import Welcome from './Welcome';
import SetTime from './SetTime';
import SetWorkout from './SetWorkout';
import SetRest from './SetRest';
import Workout from './Workout';

class SiteWrapper extends React.Component{

  constructor(props) {
    super(props)
    this.state = {
      screen: screenNames.WELCOME,
      workoutLength: 45,
      selectedExerciseGroups: [],
      workRestRatio: 3,
      activities: [],
      workoutPaused: true,
      currentIndexInWorkout: 0,
      timeInSecIntoCurrExercise: 0,
      timeLeftInWorkoutTotal: 45 * 60
    }
  }
  resetWorkoutData() {
    this.setState({
      workoutLength: 45,
      selectedExerciseGroups: [],
      workRestRatio: 3,
      activities: [],
      workoutPaused: true,
      currentIndexInWorkout: 0,
      timeInSecIntoCurrExercise: 0,
      timeLeftInWorkoutTotal: 45 * 60
    });
  }
  pauseWorkout() {
    this.setState({
      workoutPaused: true
    });
    clearInterval(this.interval);
  }
  resumeWorkout() {
    this.setState({
      workoutPaused: false
    });

    this.interval = setInterval(() => {
      this.setState({
        timeInSecIntoCurrExercise: this.state.timeInSecIntoCurrExercise + 1,
        timeLeftInWorkoutTotal: this.state.timeLeftInWorkoutTotal - 1});
      if(this.state.currentIndexInWorkout < this.state.activities.length &&
         this.state.timeInSecIntoCurrExercise === this.state.activities[this.state.currentIndexInWorkout][2]) {
        console.log("exercise: " + this.state.activities[this.state.currentIndexInWorkout]);
        console.log("exercise time: " + this.state.activities[this.state.currentIndexInWorkout][2]);
        console.log("current index: " +  this.state.currentIndexInWorkout + " out of " + this.state.activities.length);
        this.setState({
          timeInSecIntoCurrExercise: 0,
          currentIndexInWorkout: this.state.currentIndexInWorkout + 1
        });
      }
    }, 200);

    setTimeout(() => { clearInterval(this.interval); alert("workout Finished! transition to finish screen, which has button to go to entry screen, and clears all data"); }, this.state.workoutLength * 60 * 1000);
  }
  setExerciseGroups(i) {
    if(this.state.selectedExerciseGroups.includes(i)) {
      const index = this.state.selectedExerciseGroups.indexOf(i);
      this.setState({
        selectedExerciseGroups: this.state.selectedExerciseGroups.slice(0, index).concat(
          this.state.selectedExerciseGroups.slice(index + 1)),
      });
    }
    else {
      this.setState({
        selectedExerciseGroups: this.state.selectedExerciseGroups.concat([i]),
      });
    }
  }
  setWorkRestRatio(i) {
    this.setState({
      workRestRatio: i,
    });
  }

  changeScreenTo(i) {
    //some sort of transition?
    //http://reactcommunity.org/react-transition-group/transition

    //generate workout before accessing that screen
    if(i === screenNames.WORKOUT) {
      this.getWorkout();
    }

    this.setState({
      screen: i,
    });
  }
  addMinutesToWorkout(i) {
    if(this.state.workoutLength + i > 0 && this.state.workoutLength + i <= 180)
    this.setState({
      workoutLength: this.state.workoutLength + i,
      timeLeftInWorkoutTotal: (this.state.workoutLength + i) * 60
    });
  }

  async getWorkout() {
    const params =  '?workoutLength=' + this.state.workoutLength
                  + '&hasUpper='      + this.state.selectedExerciseGroups.includes(exerciseGroups.UPPER)
                  + '&hasLower='      + this.state.selectedExerciseGroups.includes(exerciseGroups.LOWER)
                  + '&hasCore='       + this.state.selectedExerciseGroups.includes(exerciseGroups.CORE)
                  + '&workRestRatio=' + this.state.workRestRatio;
    const url = 'https://x9txjb9yi5.execute-api.eu-west-1.amazonaws.com/staging/workout' + params;
    const response = await fetch(url);
    const data = await response.json();
    var activitiesArray = data.map(activity =>
      {var mappedTo = new Array(activityObjectElements.NUM_ELEMENTS);
       mappedTo[activityObjectElements.NAME] = activity.name;
       mappedTo[activityObjectElements.DESC] = activity.description;
       mappedTo[activityObjectElements.TIME_IN_SEC] = parseInt(activity.amountTime);
       mappedTo[activityObjectElements.NUM_REPS] = activity.numReps;
       mappedTo[activityObjectElements.NUM_SEC_TO_DO_REPS] = activity.numSecToDoReps;
       return mappedTo;});
    console.log(activitiesArray);
    this.setState({
      activities: activitiesArray
    });
  }
  render() {
    if(this.state.screen === screenNames.WELCOME) {
      return (<Welcome onClickNewScreen={(i, b) => this.changeScreenTo(i)}/>);
    }
    else if(this.state.screen === screenNames.SET_TIME) {
      return (<SetTime workoutLength={this.state.workoutLength}
                       onClickNewScreen={(i, b) => this.changeScreenTo(i)}
                       onClickTimer={(i) => this.addMinutesToWorkout(i)}/>);
    }
    else if(this.state.screen === screenNames.SET_WORKOUT) {
      return (<SetWorkout onClickNewScreen={(i, b) => this.changeScreenTo(i)}
                          onClickSetWorkoutType={(i) => this.setExerciseGroups(i)}
                          selectedExerciseGroups={this.state.selectedExerciseGroups}/>);
    }
    else if(this.state.screen === screenNames.SET_REST) {
      return (<SetRest onClickNewScreen={(i, b) => this.changeScreenTo(i)}
                       onClickSetWorkRestRatio={(i) => this.setWorkRestRatio(i)}
                       workRestRatio={this.state.workRestRatio}/>);
    }
    else if(this.state.screen === screenNames.WORKOUT) {
      return (<Workout onClickNewScreen={(i, b) => this.changeScreenTo(i)}
                       activities={this.state.activities}
                       currentIndexInWorkout={this.state.currentIndexInWorkout}
                       timeInSecIntoCurrExercise={this.state.timeInSecIntoCurrExercise}
                       workoutPaused={this.state.workoutPaused}
                       onClickPause={()=>this.pauseWorkout()}
                       onClickResume={()=>this.resumeWorkout()}
                       onClickResetWorkoutData={()=>this.resetWorkoutData()}
                       timeLeftInWorkoutTotal={this.state.timeLeftInWorkoutTotal}/>);
    }
  }

}

ReactDOM.render(
  <React.StrictMode>
    <SiteWrapper />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
