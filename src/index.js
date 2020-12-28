import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Welcome from './Welcome';
import reportWebVitals from './reportWebVitals';

class SiteWrapper extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      screen: 0,
    }
  }
  render() {
    if(this.state.screen == 0) {
      return (<Welcome />);
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
