import React from 'react';
import { Button } from '@material-ui/core';
import screenNames from './variables/ScreenNames'
import './mainStyle.css';
import ConfirmBox from './SubComponents/ConfirmBox'

function Welcome(props) {
  const [openBox, setOpenBox] = React.useState(false);

  return (
    <div className="centerWrapper">
        <h1 className="largeHeader">Welcome to CHAD.</h1>
        <Button color="primary"
                variant="contained"
                onClick={() => props.onClickNewScreen(screenNames.SET_TIME)}>Begin Workout</Button>
          &nbsp;
          &nbsp;
          &nbsp;
          <Button color="primary" onClick={()=>setOpenBox(true)} padding={100} margin={0}>
            What is CHAD?
          </Button>
          <ConfirmBox title="What is CHAD?"
                      description="CHAD (Calisthenics Home Activity Designer) is a home workout generator. Just let CHAD know what type of workout you want, how long you want your workout to be, and how much rest you'll need, and a new, unique workout will be created for you that can be done completely equipment free."
                      handleConfirmClose={()=>setOpenBox(false)}
                      confirmText="Ok."
                      handleDeclineClose={()=>setOpenBox(false)}
                      declineText=""
                      open={openBox}/>
    </div>
  );
}

export default Welcome;
