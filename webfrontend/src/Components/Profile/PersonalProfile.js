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

class PersonalProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: localStorage.getItem("email"),
      userId: localStorage.getItem("userId"),
      firstName: "",
      lastName: "",
      contact: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zipcode: "",
      country: "",
      editFirstName: "",
      editLastName: "",
      editContact: "",
      editAddress1: "",
      editAddress2: "",
      editCity: "",
      editState: "",
      editZipcode: "",
      editCountry: "",
      editPassword: "",
      confirmEditPassword: "",
      editModalIsOpen: false
    };
    this.handleClose = this.handleClose.bind(this);
  }

  componentWillMount = async () => {
    if (this.state.userId) {
      axios.defaults.withCredentials = true;
      axios
        .get(
          hostAddress + "/profile/personalProfile/" + this.state.userId,
          config
        )
        .then(response => {
          console.log(response);
          this.setState({
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            contact: response.data.contact,
            address1: response.data.addressLine1,
            address2: response.data.addressLine2,
            city: response.data.city,
            state: response.data.state,
            zipcode: response.data.zipcode,
            country: response.data.country,
          });
        });
    }
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

  editProfile = e => {
    //Code to edit in backend
    e.preventDefault();
    if((this.state.editPassword!= "") && (this.state.confirmEditPassword != this.state.editPassword)){
      alert("Passwords do not not match!")
    } else{
      const data = {
        userId: this.state.userId,
        firstName: (this.state.editFirstName == "") ? this.state.firstName : this.state.editFirstName,
        lastName: (this.state.editLastName == "") ? this.state.lastName : this.state.editLastName,
        contact: (this.state.editContact == "") ? this.state.contact : this.state.editContact,
        addressLine1: (this.state.editAddress1 == "") ? this.state.address1 : this.state.editAddress1,
        addressLine2: (this.state.editAddress2 == "") ? this.state.address2 : this.state.editAddress2,
        city: (this.state.editCity == "") ? this.state.city : this.state.editCity,
        state: (this.state.editState == "") ? this.state.state : this.state.editState,
        zipcode: (this.state.editZipcode == "") ? this.state.zipcode : this.state.editZipcode,
        country: (this.state.editCountry == "") ? this.state.country : this.state.editCountry,
        password: this.state.editPassword 
      };

      console.log(data);
      axios.defaults.withCredentials = true;
      axios
        .post(hostAddress + "/profile/updatePersonalProfile", data, config)
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
    }

  };

  render() {
    let personalProfileDetails = null;
    let modalContent = null;
    let modalTitle = "Edit Personal Profile";
    modalContent = (
      <Form className={styles.fontFam}>
        <Form.Row>
        <Form.Group as={Col} controlId="editPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="*******"
              name="editPassword"
              onChange={this.inputChangeHandler}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="confirmEditPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="*******"
              name="confirmEditPassword"
              onChange={this.inputChangeHandler}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="editFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder={this.state.firstName}
              name="editFirstName"
              onChange={this.inputChangeHandler}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="editLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder={this.state.lastName}
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
            placeholder={this.state.contact}
            name="editContact"
            onChange={this.inputChangeHandler}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="editCountry">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder={this.state.country}
            name="editCountry"
            onChange={this.inputChangeHandler}
          />
        </Form.Group>
        </Form.Row>

        <Form.Group controlId="editAddress1">
          <Form.Label>Address Line 1</Form.Label>
          <Form.Control
            placeholder={this.state.address1}
            name="editAddress1"
            onChange={this.inputChangeHandler}
          />
        </Form.Group>

        <Form.Group controlId="editAddress2">
          <Form.Label>Address Line 2</Form.Label>
          <Form.Control
            placeholder={this.state.address2}
            name="editAddress2"
            onChange={this.inputChangeHandler}
          />
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col} controlId="editCity">
            <Form.Label>City</Form.Label>
            <Form.Control
              placeholder={this.state.city}
              name="editCity"
              onChange={this.inputChangeHandler}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="editState">
            <Form.Label>State</Form.Label>
            <Form.Control
              placeholder={this.state.state}
              name="editState"
              onChange={this.inputChangeHandler}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="editZipcode">
            <Form.Label>Zip</Form.Label>
            <Form.Control
              type="number"
              placeholder={this.state.zipcode}
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
      <div >
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
              <b>Full Name</b> {}{" "} {this.state.firstName} {" "} {this.state.lastName}
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
            <b>Mobile</b> {" "}{this.state.contact}
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
            <b>Email</b> {" "}{this.state.email}
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
            <b>Country</b> {" "}{this.state.country}
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
            <b>Address Line 1</b> {" "}{this.state.address1}
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
            <b>Address Line 2</b> {" "}{this.state.address2}
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
            <b>City</b> {" "}{this.state.city}
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
            <b>State</b> {" "}{this.state.state}
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
            <b>Zipcode</b> {" "}{this.state.zipcode}
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
        <br/>
        <Row>
          <Col sm={10}>
            <h3 className={styles.fontFam}>Personal Details</h3>
            <br/>
            {personalProfileDetails}
          </Col>
          <Col>
            <Button variant="danger" onClick={this.handleEditModal} className={styles.fontFam}>
              Edit Details
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default PersonalProfile;
