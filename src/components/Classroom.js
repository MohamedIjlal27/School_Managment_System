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

  const clssData = [
    {
      id: 1,

      class_room: "A2201",
    },
  ];

  const [data, setData] = useState([]);

  useEffect(() => {
    setData(clssData);
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
            <b>ClassRoom Details</b>
          </p>
          <br />
          <Row className="mb-3">
            <Col>
              <label htmlFor="first_name" className="form-label">
                ClassRoom Name
              </label>
              <input
                type="text"
                id="first_name"
                placeholder="ClassRoom Name"
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
            <b>ClassRoom Details</b>
          </p>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>

                <th>ClassRoom</th>

                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data && data.length > 0
                ? data.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
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
                Class Room
              </label>
              <input
                type="text"
                id="first_name"
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
