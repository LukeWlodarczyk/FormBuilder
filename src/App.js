import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";

import Header from "./components/layout/Header";
import Forms from "./components/formlist/Forms";
import FormPreview from "./components/formpreview/FormPreview";
import FormExport from "./components/formexport/FormExport";
import FormCreator from "./components/formcreator/FormCreator";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Header />
          <Switch>
            <Route path="/" exact component={Forms} />
            <Route path="/creator" component={FormCreator} />
            <Route path="/:id/edit" component={FormCreator} />
            <Route path="/:id/export" component={FormExport} />
            <Route path="/:id" component={FormPreview} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
