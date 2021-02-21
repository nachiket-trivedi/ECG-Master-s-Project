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

class MedicalProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      editGender: "",
      editDOB: "",
      editHeight: "",
      editweightUnits: "",
      editheightUnits: "",
      editWeight: "",
      editBloodType: "",
      editModalIsOpen: false
    };
    this.handleClose = this.handleClose.bind(this);
  }

  componentWillMount = async () => {
    axios.defaults.withCredentials = true;
    const data = {
      email: localStorage.getItem("email")
    };
    //backend call to get details for object user
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

  editProfile = () => {
    //Code to edit in backend
    alert(this.state.editDOB);
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
              placeholder="Date of Birth"
              onChange={this.inputChangeHandler}
            ></Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="editBloodType">
            <Form.Label>Blood group</Form.Label>
            <Form.Control
              as="select"
              name="editBloodType"
              onChange={this.inputChangeHandler}
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
              placeholder="Weight"
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
              placeholder="Height"
              name="editHeight"
              onChange={this.inputChangeHandler}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="editHeightUnits">
            <Form.Label>Select Height Units</Form.Label>
            <Form.Control
              as="select"
              name="editHightUnits"
              onChange={this.inputChangeHandler}
            >
              <option>ft</option>
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
              <b>Gender</b> {}{" "}
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
              <b>Date of Birth</b> {}{" "}
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
              <b>Blood Type</b> {}{" "}
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
            <b>Height</b>
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
            <b>Weight</b>
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
            <b>BMI</b>
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
