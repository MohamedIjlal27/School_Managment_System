import React, { Fragment, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Teacher = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [teachFirstName, setTeachFirstName] = useState("");
  const [teachSecondName, setTeachSecondName] = useState("");
  const [teachContactNo, setTeachContactNo] = useState("");
  const [teachEmailAddress, setTeachEmailAddress] = useState("");

  const [editTeachId, setEditTeachId] = useState("");
  const [editTeachFirstName, setEditTeachFirstName] = useState("");
  const [editTeachSecondName, setEditTeachSecondName] = useState("");
  const [editTeachContactNo, setEditTeachContactNo] = useState("");
  const [editTeachEmailAddress, setEditTeachEmailAddress] = useState("");

  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get("https://localhost:7019/api/Teacher")
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSave = () => {
    const url = "https://localhost:7019/api/Teacher";
    const data = {
      teachFirstName: teachFirstName,
      teachSecondName: teachSecondName,
      teachContactNo: teachContactNo,
      teachEmailAddress: teachEmailAddress,
    };

    axios
      .post(url, data)
      .then((result) => {
        getData();
        clear();
        toast.success("Teacher has been added");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const clear = () => {
    setTeachFirstName("");
    setTeachSecondName("");
    setTeachContactNo("");
    setTeachEmailAddress("");

    setEditTeachFirstName("");
    setEditTeachSecondName("");
    setEditTeachContactNo("");
    setEditTeachEmailAddress("");
  };

  const handleEdit = (teachId) => {
    handleShow();
    axios
      .get(`https://localhost:7019/api/Teacher/${teachId}`)
      .then((result) => {
        setEditTeachFirstName(result.data.teachFirstName);
        setEditTeachSecondName(result.data.teachSecondName);
        setEditTeachContactNo(result.data.teachContactNo);
        setEditTeachEmailAddress(result.data.teachEmailAddress);
        setEditTeachId(teachId);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (teachId) => {
    if (window.confirm("Are You Sure to delete this employee") === true) {
      axios
        .delete(`https://localhost:7019/api/Teacher/${teachId}`)
        .then((result) => {
          if (result.status === 200) {
            toast.success("Teacher has been deleted");
            getData();
          }
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  const handleUpdate = (id) => {
    const url = `https://localhost:7019/api/Teacher/${editTeachId}`;
    const data = {
      teachId: editTeachId,
      teachFirstName: editTeachFirstName,
      teachSecondName: editTeachSecondName,
      teachContactNo: editTeachContactNo,
      teachEmailAddress: editTeachEmailAddress,
    };

    axios
      .put(url, data)
      .then((result) => {
        handleClose();
        getData();
        clear();
        toast.success("Student has been updated");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <Fragment>
      <ToastContainer />
      <div className="header">
        <Row className="mb-3">
          <Col>
            <p>Student Management System</p>
          </Col>
        </Row>
      </div>
      <div className="container">
        {/* <nav className="nav">
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
        </nav> */}
        <Container>
          <p>
            <b>Teachers Details</b>
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
                value={teachFirstName}
                onChange={(e) => setTeachFirstName(e.target.value)}
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
                value={teachSecondName}
                onChange={(e) => setTeachSecondName(e.target.value)}
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
                value={teachContactNo}
                onChange={(e) => setTeachContactNo(e.target.value)}
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
                value={teachEmailAddress}
                onChange={(e) => setTeachEmailAddress(e.target.value)}
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <button className="btn btn-primary" onClick={() => handleSave()}>
                Save
              </button>
            </Col>
          </Row>
        </Container>

        <Container>
          <p>
            <b>Existing Teachers Details</b>
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
                      <td>{item.teachFirstName}</td>
                      <td>{item.teachSecondName}</td>
                      <td>{item.teachContactNo}</td>
                      <td>{item.teachEmailAddress}</td>

                      <td colSpan={2}>
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            handleEdit(item.teachId);
                          }}
                        >
                          Edit
                        </button>
                        &nbsp;
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            handleDelete(item.teachId);
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
                value={editTeachFirstName}
                onChange={(e) => setEditTeachFirstName(e.target.value)}
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
                value={editTeachSecondName}
                onChange={(e) => setEditTeachSecondName(e.target.value)}
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
                value={editTeachContactNo}
                onChange={(e) => setEditTeachContactNo(e.target.value)}
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
                value={editTeachEmailAddress}
                onChange={(e) => setEditTeachEmailAddress(e.target.value)}
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

export default Teacher;
