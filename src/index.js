import React from 'react';
import ReactDOM from 'react-dom';
import { API } from 'aws-amplify';

import './index.css';
import screenNames from './variables/ScreenNames'
import exerciseGroups from './variables/ExerciseGroups'
import reportWebVitals from './reportWebVitals';
import Welcome from './Welcome';
import SetTime from './SetTime';
import SetWorkout from './SetWorkout';
import Workout from './Workout';

class SiteWrapper extends React.Component{
  async componentDidMount() {
    const data = await API.get('chadApi', '/workout')
    console.log(data);
  }
  constructor(props) {
    super(props)
    this.state = {
      screen: screenNames.WELCOME,
      minutes: 45,
      selectedExerciseGroups: []
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
  addMinutes(i) {
    if(this.state.minutes + i > 0 && this.state.minutes + i <= 180)
    this.setState({
        minutes: this.state.minutes + i,
    });
  }
  render() {
    if(this.state.screen == screenNames.WELCOME) {
      return (<Welcome onClickNewScreen={(i, b) => this.changeScreenTo(i, b)}/>);
    }
    else if(this.state.screen == screenNames.SET_TIME) {
      return (<SetTime minutes={this.state.minutes}
                       onClickNewScreen={(i, b) => this.changeScreenTo(i, b)}
                       onClickTimer={(i) => this.addMinutes(i)}/>);
    }
    else if(this.state.screen == screenNames.SET_WORKOUT) {
      return (<SetWorkout onClickNewScreen={(i, b) => this.changeScreenTo(i, b)}
                          onClickSetWorkoutType={(i) => this.setExerciseGroups(i)}/>);
    }
    else if(this.state.screen == screenNames.WORKOUT) {
      return (<Workout onClickNewScreen={(i, b) => this.changeScreenTo(i, b)}/>);
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
