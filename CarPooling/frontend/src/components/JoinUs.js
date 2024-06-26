import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Image } from "react-bootstrap";
import {
  Container,
  Row,
  Col,
  Button,
  FormControl,
  InputGroup,
  Form,
} from "react-bootstrap";
import axios from "axios";

const JoinUs = () => {
  const [form, setForm] = React.useState({
    fullName: "",
    userName: "",
    emailId: "",
    isEmployee: true,
    password: "",
    phoneNumber: "",
    vehicleType: "",
    vehicleNumber: "",
  });

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    form.phoneNumber = parseInt(form.phoneNumber);
    console.log(form);
    await axios
      .post("http://localhost:1000/get-started/signup", form)
      .then((res) => {
        console.log("Response:", res);
        if (res.status === 200 && res.data.status === "success") {
          navigate("/SignUpSuccess");
        } else {
          alert("FAIL");
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setForm((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const handleClick = () => {
    navigate("/Login");
  };

  return (
    <Container>
      <Row className="text-center my-5">
        <Col className="m-4 p-3">
          <h1 className="mb-2 display-6">Join us</h1>
          <h2 className="mb-2 lead">Create Account</h2>
          <Form>
            <Form.Group>
              <Form.Control
                type="text"
                name="fullName"
                placeholder="Enter full name"
                value={form.fullName}
                onChange={handleChange}
              ></Form.Control>
              <br />
              <Form.Control
                type="text"
                name="userName"
                placeholder="Enter Username"
                value={form.userName}
                onChange={handleChange}
              ></Form.Control>
              <br />
              <InputGroup>
                <FormControl
                  type="email"
                  name="emailId"
                  placeholder="Email Address"
                  value={form.emailId}
                  onChange={handleChange}
                ></FormControl>
                <Form.Control
                  type="tel"
                  name="phoneNumber"
                  placeholder="Mobile Number"
                  value={form.phoneNumber}
                  onChange={handleChange}
                ></Form.Control>
              </InputGroup>
              <br />
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
              ></Form.Control>
              <br />
              <Form.Select
                aria-label="Default select example"
                name="vehicleType"
                value={form.vehicleType}
                onChange={handleChange}
              >
                <option value="">Select Your Vehicle Model</option>
                <option value="Sedan">Sedan</option>
                <option value="HatchBack">HatchBack</option>
                <option value="SUV">SUV</option>
              </Form.Select>
              <br />
              <Form.Control
                type="text"
                name="vehicleNumber"
                placeholder="Your Vehicle's Registration Number"
                value={form.vehicleNumber}
                onChange={handleChange}
              ></Form.Control>
            </Form.Group>
          </Form>
          <br />
          <div className={"text-start"}>
            Already an existing user{" "}
            <Link to="/Login" onClick={handleClick}>
              Login Here
            </Link>
          </div>
          <br />
          <Button
            variant="primary"
            className="align-items-end"
            onClick={handleSignUp}
            type="submit"
          >
            Register
          </Button>
        </Col>
        <Col className=" m-4 p-3">
          <br />
          <br />
          <Image className="m-5 =-5"  src="/images/driver_signup_page.jpg" fluid />
        </Col>
      </Row>
    </Container>
  );
};

export default JoinUs;
