import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={() => <p>List</p>} />
          <Route path="/creator" component={() => <p>Creator</p>} />
          <Route path="/:id" component={() => <p>Form</p>} />
        </Switch>
      </Router>
    );
  }
}

export default App;
