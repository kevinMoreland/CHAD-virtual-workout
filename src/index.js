import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import screenNames from './variables/ScreenNames'
import exerciseGroups from './variables/ExerciseGroups'
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
      generatedWorkout: null
    }
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
  changeScreenTo(i, warningEnabled) {
    //some sort of transition?
    //http://reactcommunity.org/react-transition-group/transition
    if(warningEnabled) {
      alert("Add a warning here to ensure a use is sure about action");
    }
    this.setState({
      screen: i,
    });

  }
  addMinutesToWorkout(i) {
    if(this.state.workoutLength + i > 0 && this.state.workoutLength + i <= 180)
    this.setState({
      workoutLength: this.state.workoutLength + i,
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
    this.setState({
      generatedWorkout: data,
    });
  }
  render() {
    if(this.state.screen == screenNames.WELCOME) {
      return (<Welcome onClickNewScreen={(i, b) => this.changeScreenTo(i, b)}/>);
    }
    else if(this.state.screen == screenNames.SET_TIME) {
      return (<SetTime workoutLength={this.state.workoutLength}
                       onClickNewScreen={(i, b) => this.changeScreenTo(i, b)}
                       onClickTimer={(i) => this.addMinutesToWorkout(i)}/>);
    }
    else if(this.state.screen == screenNames.SET_WORKOUT) {
      return (<SetWorkout onClickNewScreen={(i, b) => this.changeScreenTo(i, b)}
                          onClickSetWorkoutType={(i) => this.setExerciseGroups(i)}/>);
    }
    else if(this.state.screen == screenNames.SET_REST) {
      return (<SetRest onClickNewScreen={(i, b) => this.changeScreenTo(i, b)}
                       onClickSetWorkRestRatio={(i) => this.setWorkRestRatio(i)}/>);
    }
    else if(this.state.screen == screenNames.WORKOUT) {
      return (<Workout onClickNewScreen={(i, b) => this.changeScreenTo(i, b)}
                       generatedWorkout={this.state.generatedWorkout}
                       onClickGenerateWorkout={() => this.getWorkout()}/>);
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
