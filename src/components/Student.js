import React, { Fragment, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import "./styles.css";

const Student = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const stdData = [
    {
      id: 1,
      first_name: "Mohamed Ijlal",
      last_name: "Mohamed Ijlal",
      contact_person: "Rihana",
      contact_no: "0760527397",
      email_address: "ijlalssck1940@gmail.com",
      date_of_birth: "2000-08-27",
      age: 23,
      class_room: "A2201",
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
        <nav className="nav">
          <ul>
            <li>
              <a href="/Allocate_Classroom">Allocate_Classroom</a>
            </li>

            <li>
              <a href="/Allocate_Subjects">Allocate_Subjects</a>
            </li>

            <li>
              <a href="/Classroom">Classroom</a>
            </li>
            <li>
              <a href="/Student_details_Report">Student_details_Report</a>
            </li>
            <li>
              <a href="Student">Student</a>
            </li>
            <li>
              <a href="/Teacher">Teacher</a>
            </li>
            <li>
              <a href="/Subject">Subject</a>
            </li>
          </ul>
        </nav>

        <Container>
          <p>
            <b>Student Details</b>
          </p>
          <br />
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

          <Row className="mb-3">
            <Col>
              <label htmlFor="age" className="form-label">
                Age
              </label>
              <input
                type="number"
                id="age"
                placeholder="Age"
                className="form-control"
              />
            </Col>
            <Col>
              <label htmlFor="class_room" className="form-label">
                Class Room
              </label>
              <input
                type="text"
                id="class_room"
                placeholder="Class Room"
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
                <th>Contact Person</th>
                <th>Contact Number</th>
                <th>Email Address</th>
                <th>Date Of Birth</th>
                <th>Age</th>
                <th>Class Room</th>
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
                      <td>{item.contact_person}</td>
                      <td>{item.contact_no}</td>
                      <td>{item.email_address}</td>
                      <td>{item.date_of_birth}</td>
                      <td>{item.age}</td>
                      <td>{item.class_room}</td>
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

          <Row className="mb-3">
            <Col>
              <label htmlFor="age" className="form-label">
                Age
              </label>
              <input
                type="number"
                id="age"
                placeholder="Age"
                className="form-control"
              />
            </Col>
            <Col>
              <label htmlFor="class_room" className="form-label">
                Class Room
              </label>
              <input
                type="text"
                id="class_room"
                placeholder="Class Room"
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
