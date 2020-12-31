import { Button } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';

import screenNames from './variables/ScreenNames'
import './CenterWrapper.css';

function Workout(props) {
  if(props.generatedWorkout == null) {
    return (<div className="centerWrapper"><CircularProgress /></div>);
  }
  else{
    return (
      <div className="centerWrapper">
          <h1>[Graphic]</h1>
          <h1>Workout Name Here</h1>
          <h1>00:00</h1>
          <Button color="primary"
                  variant="contained"
                  onClick={() => alert(JSON.parse(props.generatedWorkout).activities)}>View Workout</Button>
          <Button color="primary"
                  variant="contained"
                  onClick={() => props.onClickNewScreen(screenNames.SET_REST, true)}>Back</Button>
      </div>
    );
  }
}

export default Workout;