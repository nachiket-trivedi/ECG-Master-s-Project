import React from "react";
import styles from "../../Styles/styles.module.css";
import axios from "axios";
import {
  Modal,
  Container,
  Row,
  Col,
  Button,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Form,
  FormGroup,
  Label,
  Input
} from "react-bootstrap";
import { backendIp, backendPort } from "../../config";

const hostAddress = `${backendIp}:${backendPort}`;
const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("jwtToken"),
    "Content-Type": "application/json"
  }
};

class MedicalProfile extends React.Component {
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
      bloodType: "",
      BMI: "",
      editGender: "",
      editDOB: "",
      editHeight: "",
      editWeightUnits: "",
      editHeightUnits: "",
      editWeight: "",
      editBloodType: "",
      editModalIsOpen: !localStorage.getItem("medicalFlag")
    };
    this.handleClose = this.handleClose.bind(this);
  }

  componentWillMount = async () => {
    //backend call to get details for object user
    if (this.state.userId) {
      axios.defaults.withCredentials = true;
      axios
        .get(
          hostAddress + "/profile/medicalProfile/" + this.state.userId,
          config
        )
        .then(response => {
          console.log(response);

          this.setState({
            gender: response.data.gender,
            DOB: (new Date(response.data.dob)).toISOString().slice(0,10),
            height: response.data.height,
            weightUnits: response.data.weight_unit,
            heightUnits: response.data.height_unit,
            weight: response.data.weight,
            bloodType: response.data.blood_type,
            BMI: response.data.BMI
          });
        });
    }
  };

  inputChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleClose = () => {
    this.setState({
      editModalIsOpen: false
    });
  };

  handleEditModal = () => {
    this.setState({
      editModalIsOpen: true
    });
  };

  editProfile = e => {
    e.preventDefault();
    //Code to edit in backend

    const data = {
      userId: this.state.userId,
      gender: (this.state.editGender == "") ? this.state.gender : this.state.editGender,
      dob: (this.state.editDOB == "") ? this.state.DOB : this.state.editDOB,
      bloodType: (this.state.editBloodType == "") ? this.state.bloodType : this.state.editBloodType,
      height: (this.state.editHeight == "") ? this.state.height : this.state.editHeight,
      weight: (this.state.editWeight == "") ? this.state.weight : this.state.editWeight,
      weightUnit: (this.state.editWeightUnits == "") ? this.state.weightUnits : this.state.editWeightUnits,
      heightUnit: (this.state.editHeightUnits == "") ? this.state.heightUnits : this.state.editHeightUnits,
    };

    console.log(data);
    axios.defaults.withCredentials = true;
    axios
      .post(hostAddress + "/profile/updateMedicalProfile", data, config)
      .then(response => {
        console.log(response.data);
        if (response.status == 200) {
          alert("Updated Successfully");
          console.log("Response data after  post-->" + response.data);
          window.location.reload();
        } else {
          window.alert("Could Not Update Data!");
        }
      });
  };

  render() {
    let medicalProfileDetails = null;
    let modalContent = null;
    let modalTitle = "Edit Medical Profile";

    modalContent = (
      <Form>
        <Form.Row>
          <Form.Group as={Col} controlId="editGender">
            <Form.Label>Gender</Form.Label>
            <Form.Control
              as="select"
              name="editGender"
              placeholder={this.state.gender}
              onChange={this.inputChangeHandler}
            >
              <option>Female</option>
              <option>Male</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="editDOB">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="editDOB"
              onChange={this.inputChangeHandler}
            ></Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="editBloodType">
            <Form.Label>Blood group</Form.Label>
            <Form.Control
              as="select"
              name="editBloodType"
              onChange={this.inputChangeHandler}
              defaultValue={this.state.bloodType}
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
          <Form.Group as={Col} controlId="editWeight">
            <Form.Label>Weight</Form.Label>
            <Form.Control
              type="text"
              placeholder={this.state.weight}
              name="editWeight"
              onChange={this.inputChangeHandler}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="editweightUnits">
            <Form.Label>Select Weight Units</Form.Label>
            <Form.Control
              as="select"
              name="editweightUnits"
              onChange={this.inputChangeHandler}
              defaultValue={this.state.weightUnits}
            >
              <option>lb</option>
              <option>kg</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="editHeight">
            <Form.Label>Height</Form.Label>
            <Form.Control
              type="text"
              name="editHeight"
              placeholder={this.state.height}
              onChange={this.inputChangeHandler}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="editHeightUnits">
            <Form.Label>Select Height Units</Form.Label>
            <Form.Control
              as="select"
              name="editHightUnits"
              onChange={this.inputChangeHandler}
              defaultValue={this.state.heightUnits}
            >
              <option>inch</option>
              <option>cm</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>

        <Button
          variant="danger"
          type="submit"
          className={styles.formButton}
          onClick={this.editProfile}
        >
          Edit
        </Button>
      </Form>
    );

    medicalProfileDetails = (
      <div>
        <br></br>
        <Row>
          <Col>
            <i
              class="fa fa-venus-mars"
              style={{
                margin: "10px 10px 20px 0px",
                fontSize: "1.2rem",
                color: "rgb(233, 116, 116)"
              }}
            ></i>
            <span>
              <b>Gender</b> {this.state.gender}{" "}
            </span>
          </Col>
          <Col>
            <i
              class="fa fa-calendar"
              style={{
                margin: "10px 10px 20px 0px",
                fontSize: "1.2rem",
                color: "rgb(233, 116, 116)"
              }}
            ></i>
            <span>
              <b>Date of Birth</b> {this.state.DOB}{" "}
            </span>
          </Col>
          <Col>
            <i
              class="fa fa-tint"
              style={{
                margin: "10px 10px 20px 0px",
                fontSize: "1.2rem",
                color: "rgb(233, 116, 116)"
              }}
            ></i>
            <span>
              <b>Blood Type</b> {this.state.bloodType}{" "}
            </span>
          </Col>
        </Row>
        <Row>
          <Col>
            {" "}
            <i
              class="fa fa-long-arrow-up"
              style={{
                margin: "10px 10px 20px 0px",
                fontSize: "1.2rem",
                color: "rgb(233, 116, 116)"
              }}
            ></i>
            <b>Height</b> {this.state.height} {this.state.heightUnit}
          </Col>
          <Col>
            {" "}
            <i
              class="fa fa-balance-scale"
              style={{
                margin: "10px 10px 20px 0px",
                fontSize: "1.2rem",
                color: "rgb(233, 116, 116)"
              }}
            ></i>
            <b>Weight</b> {this.state.weight} {this.state.weightUnits}
          </Col>
          <Col>
            {" "}
            <i
              class="fa fa-male"
              style={{
                margin: "10px 10px 20px 0px",
                fontSize: "1.2rem",
                color: "rgb(233, 116, 116)"
              }}
            ></i>
            <b>BMI</b> {this.state.BMI}
          </Col>
        </Row>
        <br></br>
      </div>
    );

    return (
      <Container>
        <Modal show={this.state.editModalIsOpen} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <h6>
                <b>{modalTitle}</b>
              </h6>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>{modalContent}</Modal.Body>
        </Modal>
        <br></br>
        <Row>
          <Col sm={10}>
            <h3>Medical Details</h3>
            {medicalProfileDetails}
          </Col>
          <Col>
            <Button variant="danger" onClick={this.handleEditModal}>
              Edit Details
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default MedicalProfile;
