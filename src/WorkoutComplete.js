import { Button } from '@material-ui/core';
import screenNames from './variables/ScreenNames'
import './mainStyle.css';

function Welcome(props) {
  return (
    <div className="centerWrapper">
        <h1 style={{fontSize: "400%"}}>Workout Complete!</h1>
        <Button color="primary"
                variant="contained"
                onClick={() => props.onClickNewScreen(screenNames.WELCOME)}>Go back to homepage</Button>
    </div>
  );
}

export default Welcome;
