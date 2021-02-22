import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "../Landing/Landing";
import Profile from "../../Containers/Profile/Profile";
import AddMedicalProfile from "../../Components/Profile/AddMedicalProfile";

class Main extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={Landing} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/completeMedicalProfile" exact component={AddMedicalProfile} />
      </Router>
    );
  }
}
//Export The Main Component
export default Main;
