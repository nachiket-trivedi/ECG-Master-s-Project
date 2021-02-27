import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "../Landing/Landing";
import Profile from "../../Containers/Profile/Profile";
import AddMedicalProfile from "../../Components/Profile/AddMedicalProfile";
import ECGAnalysis from "../ECGAnalysisPage/ECGAnalysis";

class Main extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={Landing} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/completeMedicalProfile" exact component={AddMedicalProfile} />
        <Route path="/analyze" exact component={ECGAnalysis}/>
      </Router>
    );
  }
}
//Export The Main Component
export default Main;
