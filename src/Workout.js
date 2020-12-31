import { Button } from '@material-ui/core';
import screenNames from './variables/ScreenNames'
import './CenterWrapper.css';

function Workout(props) {
  return (
    <div className="centerWrapper">
        <h1>[Graphic]</h1>
        <h1>Workout Name Here</h1>
        <h1>00:00</h1>
        <Button color="primary"
                variant="contained"
                onClick={() => props.onClickGenerateWorkout(props.exerciseGroups, props.workoutLength)}>Get Workout</Button>
        <Button color="primary"
                variant="contained"
                onClick={() => alert(props.generatedWorkout)}>View Workout</Button>
        <Button color="primary"
                variant="contained"
                onClick={() => props.onClickNewScreen(screenNames.SET_REST, true)}>Back</Button>
    </div>
  );
}

export default Workout;
//onClickGenerateWorkout