import React from "react";
import { Pie } from "react-chartjs-2";
import { Redirect } from "react-router";
import { Row, Col, Form } from "react-bootstrap";

//https://www.educative.io/edpresso/how-to-use-chartjs-to-create-charts-in-react
class PatientECGCountrywise extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Form>
        <Form.File 
          id="custom-file"
          label="Custom file input"
          custom
        />
      </Form>
    );
  }
}

export default PatientECGCountrywise;
