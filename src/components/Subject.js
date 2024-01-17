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

const Student = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [data, setData] = useState([]);

  const [subName, setSubName] = useState("");

  const [editSubId, setEditSubId] = useState("");
  const [editSubName, setEditSubName] = useState(0);
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get("https://localhost:7019/api/Subject")
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSave = () => {
    const url = "https://localhost:7019/api/Subject";
    const data = {
      subName: subName,
    };

    axios
      .post(url, data)
      .then((result) => {
        getData();
        clear();
        toast.success("Student has been added");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const clear = () => {
    setSubName("");

    setEditSubId("");
    setEditSubName("");
  };

  const handleEdit = (subId) => {
    handleShow();
    axios
      .get(`https://localhost:7019/api/Subject/${subId}`)
      .then((result) => {
        setEditSubId(result.data.subId);
        setEditSubName(result.data.subName);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (subId) => {
    if (window.confirm("Are You Sure to delete this employee") === true) {
      axios
        .delete(`https://localhost:7019/api/Subject/${subId}`)
        .then((result) => {
          if (result.status === 200) {
            toast.success("Subject has been deleted");
            getData();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleUpdate = (id) => {
    const url = `https://localhost:7019/api/Subject/${editSubId}`;
    const data = {
      subId: editSubId,
      subName: editSubName,
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
            <b>Subject Details</b>
          </p>
          <br />
          <Row className="mb-3">
            <Col>
              <label htmlFor="sub_name" className="form-label">
                Subject Name
              </label>
              <input
                type="text"
                id="sub_name"
                placeholder="Subject Name"
                className="form-control"
                value={subName}
                onChange={(e) => setSubName(e.target.value)}
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
                      <td>{item.subName}</td>

                      <td colSpan={2}>
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            handleEdit(item.subId);
                          }}
                        >
                          Edit
                        </button>
                        &nbsp;
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            handleDelete(item.subId);
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
              <label htmlFor="sub_name" className="form-label">
                Subject Name
              </label>
              <input
                type="text"
                id="sub_name"
                placeholder="Subject Name"
                className="form-control"
                value={editSubName}
                onChange={(e) => setEditSubName(e.target.value)}
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
