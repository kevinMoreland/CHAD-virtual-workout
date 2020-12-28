import './Welcome.css';
import { Button } from '@material-ui/core';
import { TextField } from '@material-ui/core';

function Welcome() {
  return (
    <div className="Welcome">
      <header className="Welcome-header">
        <h1>Welcome to CHAD.</h1>
        <Button color="secondary" variant="contained">Begin Workout</Button>
      </header>
    </div>
  );
}

export default Welcome;
