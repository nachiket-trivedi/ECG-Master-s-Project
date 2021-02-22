import React from "react";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import { Redirect } from "react-router";
import styles from "../../Styles/styles.module.css";
import { backendIp, backendPort } from "../../config";

const hostAddress = `${backendIp}:${backendPort}`;
const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("jwtToken"),
    "Content-Type": "application/json"
  }
};

class AddMedicalProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: localStorage.getItem("email"),
      userId: localStorage.getItem("userId"),
      gender: "",
      DOB: "",
      height: "",
      weightUnits: "",
      heightUnits: "",
      weight: "",
      bloodType: ""
    };
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
  }

  inputChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  addProfile = e => {
    e.preventDefault();
    //Code to edit in backend

    if (
      this.state.gender == "" ||
      this.state.DOB == "" ||
      this.state.bloodType == "" ||
      this.state.height == "" ||
      this.state.weight == "" ||
      this.state.weightUnits == "" ||
      this.state.heightUnits == ""
    ) {
      alert("Please fill all fields");
    } else {
      const data = {
        userId: this.state.userId,
        gender: this.state.gender,
        dob: this.state.DOB,
        bloodType: this.state.bloodType,
        height: this.state.height,
        weight: this.state.weight,
        weightUnit: this.state.weightUnits,
        heightUnit: this.state.heightUnits
      };

      console.log(data);
      axios.defaults.withCredentials = true;
      axios
        .post(hostAddress + "/profile/addMedicalProfile", data, config)
        .then(response => {
          console.log(response.data);
          if (response.status == 200) {
            alert("Added Successfully");
            console.log("Response data after  post-->" + response.data);
            localStorage.setItem("medicalFlag", response.data["medicalFlag"]);
            window.location.reload();
          } else {
            window.alert("Could Not Update Data!");
          }
        });
    }
  };
  render() {
    var nextpage = null;

    if (
      localStorage.getItem("email") == null ||
      localStorage.getItem("medicalFlag") != 0
    ) {
      return <Redirect to="/" />;
    }

    return (
      <div className={styles.imgbox}>
        {nextpage}
        <Col sm={8} className={styles.leftHome}>
          <div></div>
        </Col>
        <Col sm={4} className={styles.rightHome}>
          <Container>
            <br></br>
            <br></br>
            <br></br>
            <h4> Complete Your Medical Profile</h4>
            <br></br>

            <Form>
              <Form.Row>
                <Form.Group as={Col} controlId="gender">
                  <Form.Label>Gender</Form.Label>
                  <Form.Control
                    as="select"
                    name="gender"
                    onChange={this.inputChangeHandler}
                    defaultValue="Female"
                    required
                  >
                    <option>Female</option>
                    <option>Male</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="bloodType">
                  <Form.Label>Blood group</Form.Label>
                  <Form.Control
                    as="select"
                    name="bloodType"
                    onChange={this.inputChangeHandler}
                    defaultValue="A+"
                    required
                  >
                    <option>A+</option>
                    <option>A-</option>
                    <option>B+</option>
                    <option>B-</option>
                    <option>AB+</option>
                    <option>AB-</option>
                    <option>O+</option>
                    <option>O-</option>
                  </Form.Control>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="DOB">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    name="DOB"
                    onChange={this.inputChangeHandler}
                    required
                  ></Form.Control>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="weight">
                  <Form.Label>Weight</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Weight"
                    name="weight"
                    onChange={this.inputChangeHandler}
                    required
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="weightUnits">
                  <Form.Label>Select Weight Units</Form.Label>
                  <Form.Control
                    as="select"
                    name="weightUnits"
                    onChange={this.inputChangeHandler}
                    defaultValue="lb"
                    required
                  >
                    <option>lb</option>
                    <option>kg</option>
                  </Form.Control>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="height">
                  <Form.Label>Height</Form.Label>
                  <Form.Control
                    type="text"
                    name="height"
                    placeholder="Enter Height"
                    onChange={this.inputChangeHandler}
                    required
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="heightUnits">
                  <Form.Label>Select Height Units</Form.Label>
                  <Form.Control
                    as="select"
                    name="heightUnits"
                    onChange={this.inputChangeHandler}
                    defaultValue="inch"
                    required
                  >
                    <option>inch</option>
                    <option>cm</option>
                  </Form.Control>
                </Form.Group>
              </Form.Row>
              <br></br>
              <Button
                variant="danger"
                type="submit"
                className={styles.formButton}
                onClick={this.addProfile}
              >
                Add Details
              </Button>
            </Form>
          </Container>
        </Col>
      </div>
    );
  }
}

export default AddMedicalProfile;
