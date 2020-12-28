import { Button } from '@material-ui/core';
import { Grid } from '@material-ui/core';

function SetTime() {
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      style={{ minHeight: '100vh' }}>
      <h1>Select a workout length.</h1>
      <Button color="secondary" variant="contained">Begin Workout</Button>
    </Grid>
  );
}

export default SetTime;
