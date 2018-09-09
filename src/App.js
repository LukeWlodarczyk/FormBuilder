import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";

import Header from "./components/Header";
import Forms from "./components/Forms";
import FormCreator from "./components/FormCreator";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Header />
          <Switch>
            <Route path="/" exact component={Forms} />
            <Route path="/:id/edit" component={FormCreator} />
            <Route path="/creator" component={FormCreator} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
