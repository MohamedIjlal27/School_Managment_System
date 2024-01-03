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

  const TeachData = [
    {
      id: 1,
      first_name: "Mohamed Ijlal",
      last_name: "Mohamed Ijlal",

      contact_no: "0760527397",
      email_address: "ijlalssck1940@gmail.com",
    },
  ];

  const [data, setData] = useState([]);

  useEffect(() => {
    setData(TeachData);
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
            <Navbar.Brand href="#">Teachers</Navbar.Brand>
            <Navbar.Brand href="#">Subjects</Navbar.Brand>
            <Navbar.Brand href="#">Allocate_Subjects</Navbar.Brand>
            <Navbar.Brand href="#">Allocate_Classrooms</Navbar.Brand>
            <Navbar.Brand href="#">Student_Detail_Report</Navbar.Brand>
          </Navbar>
        </div>
        <Container>
          <p>
            <b>Allocate Subjects</b>
          </p>
          <br />
          <Row className="mb-3">
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
              <button className="btn btn-primary">Save</button>
            </Col>
          </Row>
        </Container>

        <Container>
          <p>
            <b>Existing Student Details</b>
          </p>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Contact Number</th>
                <th>Email Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data && data.length > 0
                ? data.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.first_name}</td>
                      <td>{item.last_name}</td>

                      <td>{item.contact_no}</td>
                      <td>{item.email_address}</td>

                      <td colSpan={2}>
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            handleEdit(item.id);
                          }}
                        >
                          Edit
                        </button>
                        &nbsp;
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            handleDelete(item.id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                : "Loading..."}
            </tbody>
          </Table>
        </Container>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modify / Update the Student Record</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row className="mb-3">
            <Col>
              <label htmlFor="first_name" className="form-label">
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                placeholder="Enter Your First Name"
                className="form-control"
              />
            </Col>
            <Col>
              <label htmlFor="last_name" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                placeholder="Enter Your Last Name"
                className="form-control"
              />
            </Col>
          </Row>

          <Row className="mb-3">
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
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default Student;
