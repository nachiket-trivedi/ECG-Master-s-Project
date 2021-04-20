import React, { Component } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Redirect } from "react-router";
import styles from "../../Styles/styles.module.css";
import PatientECGCount from "../../Components/Dashboard/Patient/PatientECGCount";
import PatientECGAgewise from "../../Components/Dashboard/Patient/PatientECGAgewise";
import PatientECGCountrywise from "../../Components/Dashboard/Patient/PatientECGCountrywise";

class PatientDashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (localStorage.getItem("email") == null) {
      return <Redirect to="/" />;
    }

    if (
      localStorage.getItem("role") == "patient" &&
      (localStorage.getItem("medicalFlag") == 0 ||
        localStorage.getItem("medicalFlag") == "false")
    ) {
      return <Redirect to="/completeMedicalProfile" />;
    }

    if (localStorage.getItem("role") == "admin") {
      return <Redirect to="/" />;
    }

    return (
      <div className={styles.colorbg}>
        <br />
        <div className={styles.whiteBox}>
          <h2 className={styles.headingText}>Dashboard</h2>
          <hr />
          <br />
          <Row>
            <Col sm={5}>
              <Form>
                <Form.Row>
                  <Form.Group as={Col} controlId="gender">
                    <Form.Label>Select Year</Form.Label>
                    <Form.Control
                      as="select"
                      name="year"
                      onChange={this.inputChangeHandler}
                      defaultValue="2021"
                      required
                    >
                      <option>2021</option>
                    </Form.Control>
                  </Form.Group>
                </Form.Row>
              </Form>
            </Col>
            <Col xs="auto" sm={1}>
              <Button variant="danger" className={styles.formButtonNonFloat}>
                Go!
              </Button>
            </Col>
          </Row>

          <Row>
            <Col>
              <PatientECGCount />
            </Col>
          </Row>
          <br />
          <br />
          <Row>
            <Col>
              <PatientECGAgewise />
            </Col>
            <Col>
              <PatientECGCountrywise />
            </Col>
          </Row>
          <br />
          <br />
        </div>
        <br />
      </div>
    );
  }
}

export default PatientDashboard;
