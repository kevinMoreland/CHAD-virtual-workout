import React from 'react';
import ReactDOM from 'react-dom';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import screenNames from './variables/ScreenNames'
import exerciseGroups from './variables/ExerciseGroups'
import activityObjectElements from './variables/ActivityArray'
import backgroundColorBehavior from './variables/BackgroundColorBehavior'
import reportWebVitals from './reportWebVitals';
import Welcome from './Welcome';
import WorkoutComplete from './WorkoutComplete';
import SetTime from './SetTime';
import SetWorkout from './SetWorkout';
import SetRest from './SetRest';
import Workout from './Workout';
import './mainStyle.css';
import './index.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#FF6161',
      contrastText: "#fff"
    },
  }
});

class SiteWrapper extends React.Component{
  constructor(props) {
    super(props)
    this.color = 0;
    this.state = {
      screen: screenNames.WELCOME,
      workoutLength: 45,
      selectedExerciseGroups: [],
      workRestRatio: 3,
      activities: [],
      workoutPaused: true,
      currentIndexInWorkout: 0,
      timeInSecIntoCurrExercise: 0,
      timeLeftInWorkoutTotal: 45 * 60,
      backgroundHue: 198,
      backgroundSat: backgroundColorBehavior.MID_SATURATION,
      backGroundBehavior: backgroundColorBehavior.RAINBOW
    }
  }

  componentDidMount() {
    setInterval(() => {
      if(this.state.backGroundBehavior === backgroundColorBehavior.RAINBOW) {
        this.setState({
          backgroundHue: (this.state.backgroundHue + 50) % 360,
          backgroundSat: backgroundColorBehavior.MID_SATURATION
        })
      }
      else if(this.state.backGroundBehavior === backgroundColorBehavior.SATURATION_PULSE) {
        this.setState({
          backgroundSat: this.state.backgroundSat === backgroundColorBehavior.HIGHER_SATURATION ?
            backgroundColorBehavior.LOWER_SATURATION : backgroundColorBehavior.HIGHER_SATURATION
        })
      }
      else if(this.state.backGroundBehavior === backgroundColorBehavior.SATURATION_PULSE_WITH_WORKOUT) {
        this.setState({
          backgroundHue: (this.state.currentIndexInWorkout * 40) % 360,
          backgroundSat: this.state.backgroundSat === backgroundColorBehavior.HIGHER_SATURATION ?
            backgroundColorBehavior.LOWER_SATURATION : backgroundColorBehavior.HIGHER_SATURATION
        })
      }
    }, 2000);
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
    var oneSecondInMilli = 10;
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
    }, oneSecondInMilli);

    setTimeout(() => { clearInterval(this.interval);
                       this.resetWorkoutData();
                       this.changeScreenTo(screenNames.WORKOUT_COMPLETE); }, this.state.workoutLength * 60 * oneSecondInMilli);
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

  updateBackgroundTransitions(i) {
    const rainbowScreens = [screenNames.WORKOUT, screenNames.WORKOUT_COMPLETE];
    this.setState({
          backGroundBehavior: !rainbowScreens.includes(i) ? backgroundColorBehavior.SATURATION_PULSE_WITH_WORKOUT : backgroundColorBehavior.RAINBOW
    });
  }
  changeScreenTo(i) {
    this.updateBackgroundTransitions(i);

    //generate workout before accessing workout screen
    if(i === screenNames.WORKOUT) {
      this.getWorkout();
    }

    //change screen
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
       mappedTo[activityObjectElements.VIDEO_LINK] = activity.videoLink;
       return mappedTo;});
    console.log(activitiesArray);
    this.setState({
      activities: activitiesArray
    });
  }
  render() {
    let pageHTML = (<h1>Page Not Found</h1>);
    if(this.state.screen === screenNames.WELCOME) {
      pageHTML = (<Welcome onClickNewScreen={(i) => this.changeScreenTo(i)}/>);
    }
    else if(this.state.screen === screenNames.SET_TIME) {
      pageHTML = (<SetTime workoutLength={this.state.workoutLength}
                       onClickNewScreen={(i) => this.changeScreenTo(i)}
                       onClickTimer={(i) => this.addMinutesToWorkout(i)}/>);
    }
    else if(this.state.screen === screenNames.SET_WORKOUT) {
      pageHTML = (<SetWorkout onClickNewScreen={(i) => this.changeScreenTo(i)}
                          onClickSetWorkoutType={(i) => this.setExerciseGroups(i)}
                          selectedExerciseGroups={this.state.selectedExerciseGroups}/>);
    }
    else if(this.state.screen === screenNames.SET_REST) {
      pageHTML = (<SetRest onClickNewScreen={(i) => this.changeScreenTo(i)}
                       onClickSetWorkRestRatio={(i) => this.setWorkRestRatio(i)}
                       workRestRatio={this.state.workRestRatio}/>);
    }
    else if(this.state.screen === screenNames.WORKOUT) {
      pageHTML = (<Workout onClickNewScreen={(i) => this.changeScreenTo(i)}
                       activities={this.state.activities}
                       currentIndexInWorkout={this.state.currentIndexInWorkout}
                       timeInSecIntoCurrExercise={this.state.timeInSecIntoCurrExercise}
                       workoutPaused={this.state.workoutPaused}
                       onClickPause={()=>this.pauseWorkout()}
                       onClickResume={()=>this.resumeWorkout()}
                       onClickResetWorkoutData={()=>this.resetWorkoutData()}
                       timeLeftInWorkoutTotal={this.state.timeLeftInWorkoutTotal}/>);
    }
    else if(this.state.screen === screenNames.WORKOUT_COMPLETE) {
     pageHTML = (<WorkoutComplete onClickNewScreen={(i) => this.changeScreenTo(i)} />);
    }

    var hslValue = "hsl(" + this.state.backgroundHue + ", " + this.state.backgroundSat + "%, 75%)";
    return <div className="backgroundPulse" style={{backgroundColor: hslValue}}>{pageHTML}</div>
  }

}

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={theme}>
      <SiteWrapper />
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
