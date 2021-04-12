import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PatientECGAgewise from "../components/Patient/PatientECGAgewise";
import PatientECGCount from "../components/Patient/PatientECGCount";
import PatientECGCountrywise from "../components/Patient/PatientECGCountrywise";
import ECGAnalysis from "../components/Analysis/ECGAnalysis";

class Main extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={PatientECGAgewise} />
        <Route
          path="/patientECGAgewiseDashboard"
          exact
          component={PatientECGAgewise}
        />
        <Route
          path="/patientECGCountDashboard"
          exact
          component={PatientECGCount}
        />
        <Route
          path="/patientECGCountrywiseDashboard"
          exact
          component={PatientECGCountrywise}
        />
        <Route path="/analysis" exact component={ECGAnalysis} />
      </Router>
    );
  }
}
//Export The Main Component
export default Main;
