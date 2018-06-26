import React, { Component } from "react";

import EventDashboard from '../../features/event/EventDashboard/EventDashboard';
import NavBar from '../../features/nav/NavBar/NavBar';

class App extends Component {
  render(){
    return(
      <div>
        <NavBar />
        <EventDashboard />
      </div>
    );
  }
}

export default App;