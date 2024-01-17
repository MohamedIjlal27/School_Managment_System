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

const Classroom = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [clsName, setClsName] = useState("");

  const [editClsID, setEditClsID] = useState("");
  const [editClsName, setEditClsName] = useState("");

  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get("https://localhost:7019/api/Classroom")
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = (clsID) => {
    handleShow();
    axios
      .get(`https://localhost:7019/api/Classroom/${clsID}`)
      .then((result) => {
        setEditClsName(result.data.clsName);
        setEditClsID(clsID);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSave = () => {
    const url = "https://localhost:7019/api/Classroom";
    const data = {
      clsName: clsName,
    };

    axios
      .post(url, data)
      .then((result) => {
        getData();
        clear();
        toast.success("Class Room has been added");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const clear = () => {
    setClsName("");

    setEditClsID();
    setEditClsName("");
  };

  const handleDelete = (clsID) => {
    if (window.confirm("Are You Sure to delete this classroom") === true) {
      axios
        .delete(`https://localhost:7019/api/Classroom/${clsID}`)
        .then((result) => {
          if (result.status === 200) {
            toast.success("Class Room has been deleted");
            getData();
          }
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  const handleUpdate = (clsID) => {
    const url = `https://localhost:7019/api/Classroom/${editClsID}`;
    const data = {
      clsID: editClsID,
      clsName: editClsName,
    };

    axios
      .put(url, data)
      .then((result) => {
        handleClose();
        getData();
        clear();
        toast.success("Class Room has been updated");
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
            <b>ClassRoom Details</b>
          </p>
          <br />
          <Row className="mb-3">
            <Col>
              <label htmlFor="cls-name" className="form-label">
                ClassRoom Name
              </label>
              <input
                type="text"
                id="cls-name"
                placeholder="ClassRoom Name"
                className="form-control"
                value={clsName}
                onChange={(e) => setClsName(e.target.value)}
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => handleSave()}
              >
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
                      <td>{item.clsName}</td>

                      <td colSpan={2}>
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            handleEdit(item.clsID);
                          }}
                        >
                          Edit
                        </button>
                        &nbsp;
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            handleDelete(item.clsID);
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
          <Modal.Title>Add / Edit Class Room</Modal.Title>
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
                value={editClsName}
                onChange={(e) => setEditClsName(e.target.value)}
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

export default Classroom;
