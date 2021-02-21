import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "../Landing/Landing";
import Profile from "../../Containers/Profile/Profile";

class Main extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={Landing} />
        <Route path="/profile" exact component={Profile} />
      </Router>
    );
  }
}
//Export The Main Component
export default Main;
