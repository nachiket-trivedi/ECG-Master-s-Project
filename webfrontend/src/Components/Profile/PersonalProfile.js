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

class PersonalProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      user: "",
      editPassword: "",
      editFirstName: "",
      editLastName: "",
      editContact: "",
      editAddress1: "",
      editAddress2: "",
      editCity: "",
      editState: "",
      editZipcode: "",
      editCountry: "",
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
  };

  render() {
    let personalProfileDetails = null;
    let modalContent = null;
    let modalTitle = "Edit Personal Profile";
    modalContent = (
      <Form>
        <Form.Row>
          <Form.Group as={Col} controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Text type="email" value={this.state.email} name="email" />
          </Form.Group>

          <Form.Group as={Col} controlId="editPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="editPassword"
              onChange={this.inputChangeHandler}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="editFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="First Name"
              name="editFirstName"
              onChange={this.inputChangeHandler}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="editLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Last Name"
              name="editLastName"
              onChange={this.inputChangeHandler}
            />
          </Form.Group>
        </Form.Row>
       
        <Form.Row>
        <Form.Group as={Col} controlId="editContact">
          <Form.Label>Mobile</Form.Label>
          <Form.Control
            type="number"
            placeholder="6695657890"
            name="editContact"
            onChange={this.inputChangeHandler}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="editCountry">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="USA"
            name="editCountry"
            onChange={this.inputChangeHandler}
          />
        </Form.Group>
        </Form.Row>

        <Form.Group controlId="editAddress1">
          <Form.Label>Address Line 1</Form.Label>
          <Form.Control
            placeholder="1234 Main St"
            name="editAddress1"
            onChange={this.inputChangeHandler}
          />
        </Form.Group>

        <Form.Group controlId="editAddress2">
          <Form.Label>Address Line 2</Form.Label>
          <Form.Control
            placeholder="Apartment, studio, or floor"
            name="editAddress2"
            onChange={this.inputChangeHandler}
          />
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col} controlId="editCity">
            <Form.Label>City</Form.Label>
            <Form.Control
              placeholder="San Jose"
              name="editCity"
              onChange={this.inputChangeHandler}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="editState">
            <Form.Label>State</Form.Label>
            <Form.Control
              placeholder="California"
              name="editState"
              onChange={this.inputChangeHandler}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="editZipcode">
            <Form.Label>Zip</Form.Label>
            <Form.Control
              type="number"
              placeholder="95126"
              name="editZipcode"
              onChange={this.inputChangeHandler}
            />
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

    personalProfileDetails = (
      <div>
        <Row>
          <Col>
            <i
              class="fas fa-user"
              style={{
                margin: "10px 10px 20px 0px",
                fontSize: "1.2rem",
                color: "rgb(233, 116, 116)"
              }}
            ></i>
            <span>
              <b>Full Name</b> {}{" "}
            </span>
          </Col>
          <Col>
            {" "}
            <i
              class="fas fa-mobile"
              style={{
                margin: "10px 10px 20px 0px",
                fontSize: "1.2rem",
                color: "rgb(233, 116, 116)"
              }}
            ></i>
            <b>Mobile</b>
          </Col>
        </Row>
        <Row>
          <Col>
            {" "}
            <i
              class="fas fa-envelope"
              style={{
                margin: "10px 10px 20px 0px",
                fontSize: "1.2rem",
                color: "rgb(233, 116, 116)"
              }}
            ></i>
            <b>Email</b>
          </Col>
          <Col>
            {" "}
            <i
              class="fa fa-globe"
              style={{
                margin: "10px 10px 20px 0px",
                fontSize: "1.2rem",
                color: "rgb(233, 116, 116)"
              }}
            ></i>
            <b>Country</b>
          </Col>
        </Row>
        <Row>
          <Col>
            {" "}
            <i
              class="fas fa-address-card"
              style={{
                margin: "10px 10px 20px 0px",
                fontSize: "1.2rem",
                color: "rgb(233, 116, 116)"
              }}
            ></i>
            <b>Address Line 1</b>
          </Col>
        </Row>
        <Row>
          <Col>
            {" "}
            <i
              class="fas fa-address-card"
              style={{
                margin: "10px 10px 20px 0px",
                fontSize: "1.2rem",
                color: "rgb(233, 116, 116)"
              }}
            ></i>
            <b>Address Line 2</b>
          </Col>
        </Row>
        <Row>
          <Col>
            {" "}
            <i
              class="fas fa-city"
              style={{
                margin: "10px 10px 20px 0px",
                fontSize: "1.2rem",
                color: "rgb(233, 116, 116)"
              }}
            ></i>
            <b>City</b>
          </Col>
          <Col>
            {" "}
            <i
              class="fas fa-flag-usa"
              style={{
                margin: "10px 10px 20px 0px",
                fontSize: "1.2rem",
                color: "rgb(233, 116, 116)"
              }}
            ></i>
            <b>State</b>
          </Col>
          <Col>
            {" "}
            <i
              class="fas fa-hashtag"
              style={{
                margin: "10px 10px 20px 0px",
                fontSize: "1.2rem",
                color: "rgb(233, 116, 116)"
              }}
            ></i>
            <b>Zipcode</b>
          </Col>
        </Row>
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
            <h3>Personal Details</h3>
            {personalProfileDetails}
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
export default PersonalProfile;
