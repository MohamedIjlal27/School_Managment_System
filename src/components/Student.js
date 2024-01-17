import React, { Fragment, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./styles.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Student = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [contactperson, setContactPerson] = useState("");
  const [contactno, setContactNo] = useState("");
  const [emailaddress, setEmailAddress] = useState("");
  const [dateofbirth, setDateOfBirth] = useState(null);
  const [age, setAge] = useState(0);
  const [classroom, setClassroom] = useState("");

  const [editId, setEditId] = useState("");
  const [editFirstName, setEditFirstName] = useState("");
  const [editLastName, setEditLastName] = useState("");
  const [editcontactperson, setEditContactPerson] = useState("");
  const [editContactNo, setEditContactNo] = useState("");
  const [editEmailAddress, setEditEmailAddress] = useState("");
  const [editDateOfBirth, setEditDateOfBirth] = useState(null);
  const [editAge, setEditAge] = useState(0);
  const [editClassroom, setEditClassroom] = useState("");

  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get("https://localhost:7019/api/Student")
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [clsRoom, setClsRoom] = useState([]);

  const fetchClassRoomData = async () => {
    try {
      // Fetch Teacher data
      const classroomResponse = await fetch(
        "https://localhost:7019/api/Classroom/GetClassRoomNames"
      );
      const classroomResult = await classroomResponse.json();

      setClsRoom(classroomResult);
    } catch (error) {
      console.error("Error fetching subject data:", error);
    }
  };

  const [selectedTeachOption, setSelectedTeachOption] = useState("");
  const [selectedClassRoomOption, setSelectedClassRoomOption] = useState("");

  const [editSelectedClassRoomOption, setEditSelectedClassRoomOption] =
    useState("");

  const handleTechSelectChange = (event) => {
    setSelectedTeachOption(event.target.value);
  };

  const handleClassRoomSelectChange = (event) => {
    setSelectedClassRoomOption(event.target.value);
  };

  const handleClassRoomDropDownClick = () => {
    fetchClassRoomData();
  };

  const handleEdit = (id) => {
    handleShow();
    axios
      .get(`https://localhost:7019/api/Student/${id}`)
      .then((result) => {
        setEditFirstName(result.data.firstname);
        setEditLastName(result.data.lastname);
        setEditContactPerson(result.data.contactperson);
        setEditContactNo(result.data.contactno);
        setEditEmailAddress(result.data.emailaddress);
        setEditDateOfBirth(result.data.dateofbirth);
        setEditAge(result.data.age);
        setEditClassroom(result.data.classroom);
        setEditId(id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSave = () => {
    const url = "https://localhost:7019/api/Student";
    const data = {
      firstname: firstname,
      lastname: lastname,
      contactperson: contactperson,
      contactno: contactno,
      emailaddress: emailaddress,
      dateofbirth: dateofbirth,
      age: age,
      classroom: selectedClassRoomOption,
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
    setFirstName("");
    setLastName("");
    setContactPerson("");
    setContactNo("");
    setEmailAddress("");
    setDateOfBirth("");
    setAge(0);
    setClassroom("");

    setEditId("");
    setEditFirstName("");
    setEditLastName("");
    setEditContactPerson("");
    setEditContactNo("");
    setEditEmailAddress("");
    setEditDateOfBirth("");
    setEditAge(0);
    setEditClassroom("");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are You Sure to delete this employee") === true) {
      axios
        .delete(`https://localhost:7019/api/Student/${id}`)
        .then((result) => {
          if (result.status === 200) {
            toast.success("Student has been deleted");
            getData();
          }
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  const handleUpdate = (id) => {
    const url = `https://localhost:7019/api/Student/${editId}`;
    const data = {
      id: editId,
      firstname: editFirstName,
      lastname: editLastName,
      contactperson: editcontactperson,
      contactno: editContactNo,
      emailaddress: editEmailAddress,
      dateofbirth: editDateOfBirth,
      age: editAge,
      classroom: editSelectedClassRoomOption,
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
        {/*  <nav className="nav">
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
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
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
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
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
                value={contactperson}
                onChange={(e) => setContactPerson(e.target.value)}
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
                value={contactno}
                onChange={(e) => setContactNo(e.target.value)}
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
                value={emailaddress}
                onChange={(e) => setEmailAddress(e.target.value)}
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
                value={dateofbirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
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
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </Col>
            <Col>
              <label htmlFor="teacher_details" className="form-label">
                ClassRoom
              </label>
              <select
                id="subject_dropdown"
                value={selectedClassRoomOption}
                onChange={handleClassRoomSelectChange}
                onClick={handleClassRoomDropDownClick}
                className="form-control"
              >
                <option value="">Select an option</option>
                {Array.isArray(clsRoom) &&
                  clsRoom.map((name, index) => (
                    <option key={index} value={name}>
                      {name}
                    </option>
                  ))}
              </select>
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
                      <td>{item.firstname}</td>
                      <td>{item.lastname}</td>
                      <td>{item.contactperson}</td>
                      <td>{item.contactno}</td>
                      <td>{item.emailaddress}</td>
                      <td>{item.dateofbirth}</td>
                      <td>{item.age}</td>
                      <td>{item.classroom}</td>
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
                value={editFirstName}
                onChange={(e) => setEditFirstName(e.target.value)}
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
                value={editLastName}
                onChange={(e) => setEditLastName(e.target.value)}
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
                value={editcontactperson}
                onChange={(e) => setEditContactPerson(e.target.value)}
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
                value={editContactNo}
                onChange={(e) => setEditContactNo(e.target.value)}
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
                value={editEmailAddress}
                onChange={(e) => setEditEmailAddress(e.target.value)}
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
                value={editDateOfBirth}
                onChange={(e) => setEditDateOfBirth(e.target.value)}
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
                value={editAge}
                onChange={(e) => setEditAge(e.target.value)}
              />
            </Col>
            <Col>
              <label htmlFor="teacher_details" className="form-label">
                ClassRoom
              </label>
              <select
                id="subject_dropdown"
                value={editSelectedClassRoomOption}
                onChange={(e) => setEditSelectedClassRoomOption(e.target.value)}
                onClick={handleClassRoomDropDownClick}
                className="form-control"
              >
                <option value="">Select an option</option>
                {Array.isArray(clsRoom) &&
                  clsRoom.map((name, index) => (
                    <option key={index} value={name}>
                      {name}
                    </option>
                  ))}
              </select>
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
