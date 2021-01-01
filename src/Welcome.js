import { Button } from '@material-ui/core';
import screenNames from './variables/ScreenNames'
import './CenterWrapper.css';

function Welcome(props) {
  return (
    <div className="centerWrapper" style={{backgroundColor: "#EBE686"}}>
        <h1 style={{fontSize: "400%"}}>Welcome to CHAD.</h1>
        <Button color="primary"
                variant="contained"
                onClick={() => props.onClickNewScreen(screenNames.SET_TIME)}>Begin Workout</Button>
    </div>
  );
}

export default Welcome;
