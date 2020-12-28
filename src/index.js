import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import screenNames from './ScreenNames'
import reportWebVitals from './reportWebVitals';
import Welcome from './Welcome';
import SetTime from './SetTime';

class SiteWrapper extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      screen: screenNames.WELCOME,
      minutes: 45,
    }
  }
  changeScreenTo(i) {
    //some sort of transition?
    //http://reactcommunity.org/react-transition-group/transition
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
      return (<Welcome onClick={(i) => this.changeScreenTo(i)}/>);
    }
    else if(this.state.screen == screenNames.SET_TIME) {
      return (<SetTime minutes={this.state.minutes}
                       onClickNewScreen={(i) => this.changeScreenTo(i)}
                       onClickTimer={(i) => this.addMinutes(i)}/>);
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
