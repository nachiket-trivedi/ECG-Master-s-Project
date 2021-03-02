import React, { Component } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Redirect } from "react-router";
import styles from "../../Styles/styles.module.css";
import AdminUserCount from "../../Components/Dashboard/Admin/AdminUserCount";
import AdminECGCount from "../../Components/Dashboard/Admin/AdminECGCount";
import AdminAbnormalAgewise from "../../Components/Dashboard/Admin/AdminAbnormalAgewise";
import AdminAbnormalCountrywise from "../../Components/Dashboard/Admin/AdminAbnormalCountrywise";
import AdminAbnormalGenderwise from "../../Components/Dashboard/Admin/AdminAbnormalGenderwise";
import AdminAbnormalBMIwise from "../../Components/Dashboard/Admin/AdminAbnormalBMIwise";

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (localStorage.getItem("email") == null) {
      return <Redirect to="/" />;
    }

    if (localStorage.getItem("role") == "patient") {
      return <Redirect to="/" />;
    }

    return (
      <div className={styles.colorbg}>
        <br />
        <div className={styles.whiteBox}>
          <h2 className={styles.headingText}>Admin Dashboard</h2>
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
              <AdminUserCount />
            </Col>
          </Row>
          <br />
          <br />

          <Row>
            <Col>
              <AdminECGCount />
            </Col>
          </Row>
          <br />
          <br />

          <Row>
            <Col>
              <AdminAbnormalAgewise />
            </Col>
            <Col>
              <AdminAbnormalCountrywise />
            </Col>
          </Row>
          <br />
          <br />
          <Row>
            <Col>
              <AdminAbnormalGenderwise />
            </Col>
            <Col>
              <AdminAbnormalBMIwise />
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

export default AdminDashboard;
