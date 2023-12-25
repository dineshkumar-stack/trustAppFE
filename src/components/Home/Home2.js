import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Modal,
  Button,
  Form,
  InputGroup,
} from "react-bootstrap";
import myImg from "../../Assets/pp2.svg";
import Tilt from "react-parallax-tilt";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

function Home2() {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    bloodType: "",
    contact: "",
    age: "",
    weight: "",
    gender: "",
    lastDonationDate: "",
    healthConditions: "",
    donateTotalCount: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
    additionalInfo: "",
  });

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = {};
    if (!formData.name.trim()) {
      formErrors.name = "Name is required";
    }
    if (!formData.bloodType.trim()) {
      formErrors.bloodType = "blood Type is required";
    }
    if (!formData.contact.trim()) {
      formErrors.contact = "Contact is required";
    }
    if (!formData.gender.trim()) {
      formErrors.gender = "Gender is required";
    }
    // Check other required fields and add errors if necessary

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setLoading(true);

    try {
      // Make a POST request to your backend API
      await axios.post(
        "https://trustappbe.onrender.com/api/DonationFroms",
        formData
      );
      toast.success("Donation submitted successfully!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000, // Close toast after 3 seconds
      });
      setLoading(false);

      // Handle success, show a success message or redirect
      console.log("Donation submitted successfully!");
      dones();
      handleCloseModal(); // Close the modal after submission
    } catch (error) {
      // Handle error, show an error message
      console.error("Error submitting donation:", error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const dones = () => {
    setFormData({
      name: "",
      bloodType: "",
      contact: "",
      age: "",
      weight: "",
      gender: "",
      lastDonationDate: "",
      healthConditions: "",
      donateTotalCount: "",
      address: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      },
      additionalInfo: "", // Other form fields...
    });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      address: {
        ...formData.address,
        [name]: value,
      },
    });
  };
  return (
    <Container fluid className="home-about-section" id="about">
      <Button variant="primary" onClick={handleShowModal}>
        Add Donor Information
      </Button>
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              <span className="purple"></span> Agni Siragugal Trust
            </h1>
            <p className="home-about-body">
              Our Startup
              <br />
              <br />
              This Trust was started on March 2020 for social activities and
              services{" "}
              <b className="purple">
                Mainly towards Health and kids Development
              </b>{" "}
              We serve in all fields
              <br />
              <br />
              &nbsp;
              <i>
                <b className="purple">
                  we started in Nellakottai-Gudalur-The Nilgiris
                </b>{" "}
                <b className="purple">But we do our services in all places</b>
              </i>
            </p>
          </Col>
          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="home-about-social">
            <h1>FIND ME ON</h1>
            <p>
              Feel free to <span className="purple">connect </span>with me
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/dineshkumar-stack"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://twitter.com/stardineshk"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiOutlineTwitter />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/dinesh-kumar-494745243/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.instagram.com/iam_stardinesh"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillInstagram />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
      <Button variant="primary" onClick={dones}>
        Donor
      </Button>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Donor Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <InputGroup>
                <InputGroup.Text>
                  Name<span style={{ color: "red" }}>*</span>:
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  name="name"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    setErrors({ ...errors, name: "" }); // Clear the error when user starts typing
                  }}
                  required
                />
              </InputGroup>
              {errors.name && (
                <Form.Text className="text-danger">{errors.name}</Form.Text>
              )}
            </Form.Group>

            <Form.Group className="my-3" controlId="formBloodType">
              <InputGroup>
                <InputGroup.Text>
                  Blood Type<span style={{ color: "red" }}>*</span>:
                </InputGroup.Text>

                <Form.Control
                  type="text"
                  placeholder="Enter blood type"
                  name="bloodType"
                  as="select"
                  value={formData.bloodType}
                  onChange={(e) => {
                    setFormData({ ...formData, bloodType: e.target.value });
                    setErrors({ ...errors, bloodType: "" }); // Clear the error when user starts typing
                  }}
                  required
                >
                  <option value="other">Other</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>

                </Form.Control>
              </InputGroup>

              {errors.bloodType && (
                <Form.Text className="text-danger">
                  {errors.bloodType}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="formContact">
              <InputGroup>
                <InputGroup.Text>
                  Contact<span style={{ color: "red" }}>*</span>:
                </InputGroup.Text>
                <Form.Control
                  type="number"
                  placeholder="Enter Contact Number"
                  name="contact"
                  value={formData.contact}
                  onChange={(e) => {
                    setFormData({ ...formData, contact: e.target.value });
                    setErrors({ ...errors, contact: "" }); // Clear the error when user starts typing
                  }}
                  required
                />
                
              </InputGroup>

              {errors.contact && (
                <Form.Text className="text-danger">{errors.contact}</Form.Text>
              )}
            </Form.Group>

            {/* Age */}
            <Row className="align-items-center">
              <Col className="my-3">
                <Form.Group controlId="formAge">
                  <Form.Label visuallyHidden>Age:</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              <Col className="my-3">
                <Form.Group controlId="formWeight">
                  <Form.Label visuallyHidden>Weight</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Weight"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              <Col xs={5} className="my-1">
                <Form.Label visuallyHidden>Gender</Form.Label>
                <InputGroup controlId="formGender">
                  <InputGroup.Text>Gender</InputGroup.Text>
                  <Form.Control
                    placeholder="Gender"
                    as="select"
                    name="gender"
                    value={formData.gender}
                    onChange={(e) => {
                      setFormData({ ...formData, gender: e.target.value });
                      setErrors({ ...errors, gender: "" }); // Clear the error when user starts typing
                    }}
                    required                  >
                    <option value="other">Other</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Form.Control>
                  {errors.gender && (
                <Form.Text className="text-danger">{errors.gender}</Form.Text>
              )}
                </InputGroup>
              </Col>
            </Row>

            {/* Last Donation Date */}
            <Form.Group controlId="formLastDonationDate">
              <InputGroup>
                <InputGroup.Text>Last Donation Date:</InputGroup.Text>
                <Form.Control
                  type="date"
                  name="lastDonationDate"
                  value={formData.lastDonationDate}
                  onChange={handleChange}
                />
              </InputGroup>
            </Form.Group>

            {/* donateTotalCount */}

            <Form.Group className="my-3" controlId="formAge">
              <InputGroup>
                <InputGroup.Text>How many times donated:</InputGroup.Text>
                <Form.Control
                  type="number"
                  placeholder="Donate Count"
                  name="donateTotalCount"
                  value={formData.donateTotalCount}
                  onChange={handleChange}
                />
              </InputGroup>
            </Form.Group>

            {/* Health Conditions */}
            <Form.Group controlId="formHealthConditions">
              <Form.Label>Health Conditions:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter health conditions (comma-separated)"
                name="healthConditions"
                value={formData.healthConditions}
                onChange={handleChange}
              />
            </Form.Group>

            {/* address fields: city, state, zipCode, country */}

            <Row className="my-3">
              <Col xs={5}>
                <Form.Group controlId="formCity">
                  <Form.Control
                    type="text"
                    placeholder="City"
                    name="city"
                    value={formData.address.city}
                    onChange={handleAddressChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formState">
                  <Form.Control
                    type="text"
                    placeholder="State"
                    name="state"
                    value={formData.address.state}
                    onChange={handleAddressChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formZipCode">
                  <Form.Control
                    type="text"
                    placeholder="ZipCode"
                    name="zipCode"
                    value={formData.address.zipCode}
                    onChange={handleAddressChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Additional Information */}
            <Form.Group controlId="formAdditionalInfo">
              <Form.Label>Additional Information:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter additional information"
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
              />
            </Form.Group>
            <div class="d-grid gap-2 col-6 mx-auto">

            <Button
              variant="primary"
              xs="auto"
              className="my-2"
              type="submit"
              disabled={isLoading}
              onClick={!isLoading ? handleSubmit : null}
            >
              {isLoading ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                "Submit"
              )}
            </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </Container>
  );
}
export default Home2;
