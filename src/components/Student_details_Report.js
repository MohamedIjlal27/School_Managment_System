import React, { Fragment, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";

const Student = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const stdData = [
    {
      id: 1,
      subject_name: "Mohamed Ijlal",
      teacher: "Mohamed Ijlal",
    },
  ];

  const [data, setData] = useState([]);

  useEffect(() => {
    setData(stdData);
  }, []);

  const handleEdit = (id) => {
    // alert(id);
    handleShow();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are You Sure to delete this employee") === true) {
      alert(id);
    }
  };

  const handleUpdate = (id) => {};

  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <Fragment>
      <div className="header">
        <Row className="mb-3">
          <Col>
            <p>Student Management System</p>
          </Col>
        </Row>
      </div>
      <div className="container">
        <div className="navbar">
          <Navbar expand="lg" className="bg-body-tertiary">
            <Navbar.Brand href="Student.js">Student_Details</Navbar.Brand>
            <Navbar.Brand href="">Classrooms</Navbar.Brand>
            <Navbar.Brand href="">Teachers</Navbar.Brand>
            <Navbar.Brand href="#">Subjects</Navbar.Brand>
            <Navbar.Brand href="#">Allocate_Subjects</Navbar.Brand>
            <Navbar.Brand href="#">Allocate_Classrooms</Navbar.Brand>
            <Navbar.Brand href="#">Student_Detail_Report</Navbar.Brand>
          </Navbar>
        </div>
        <Container>
          <p>
            <b>Student Details Report</b>
          </p>
          <br />
          <Row className="mb-3">
            <Col>
              <label htmlFor="student" className="form-label">
                Student
              </label>
              <select
                id="myDropdown"
                value={selectedOption}
                onChange={handleSelectChange}
                className="form-control"
              >
                <option value="">Select an option</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </Col>
            <Col>
              <label htmlFor="classroom" className="form-label">
                Classroom
              </label>
              <input type="text" id="last_name" className="form-control" />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <label htmlFor="contact_person" className="form-label">
                Contact Person Name
              </label>
              <input
                type="text"
                id="contact_person"
                placeholder="Contact Person Name"
                className="form-control"
              />
            </Col>
            <Col>
              <label htmlFor="contact_number" className="form-label">
                Contact Number
              </label>
              <input
                type="text"
                id="contact_number"
                placeholder="Enter Your Contact Number"
                className="form-control"
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <label htmlFor="email_address" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                id="email_address"
                placeholder="Enter Your Email Address"
                className="form-control"
              />
            </Col>

            <Col>
              <label htmlFor="date_of_birth" className="form-label">
                Date of Birth
              </label>
              <input
                type="date"
                id="date_of_birth"
                placeholder="Date of Birth"
                className="form-control"
              />
            </Col>
          </Row>
        </Container>

        <Container>
          <p>
            <b>Teachers & Subject Details</b>
          </p>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Subject</th>
                <th>Teacher</th>
              </tr>
            </thead>
            <tbody>
              {data && data.length > 0
                ? data.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.subject_name}</td>
                      <td>{item.teacher}</td>
                    </tr>
                  ))
                : "Loading..."}
            </tbody>
          </Table>
        </Container>
      </div>
    </Fragment>
  );
};

export default Student;
