import { Button } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import screenNames from './ScreenNames'

function Welcome(props) {
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      style={{ minHeight: '100vh' }}>
        <h1>Welcome to CHAD.</h1>
        <Button color="secondary" variant="contained" onClick={() => props.onClick(screenNames.SET_TIME)}>Begin Workout</Button>
    </Grid>
  );
}

export default Welcome;
