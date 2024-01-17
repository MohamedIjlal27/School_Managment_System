import React, { Fragment, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Allocate_Classroom = () => {
  const [teachName, setTeachName] = useState([]);
  const [clsRoom, setClsRoom] = useState([]);

  const [data, setData] = useState([]);

  const fetchTeachData = async () => {
    try {
      // Fetch Teacher data
      const teacherResponse = await fetch(
        "https://localhost:7019/api/Teacher/GetTeacherNames"
      );
      const teacherResult = await teacherResponse.json();

      setTeachName(teacherResult);
    } catch (error) {
      console.error("Error fetching teacher data:", error);
    }
  };

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

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get("https://localhost:7019/api/AllocateClassroom")
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSave = () => {
    const url = "https://localhost:7019/api/AllocateClassroom";
    const data = {
      teachName: selectedTeachOption,
      clsRoom: selectedClassRoomOption,
    };

    axios
      .post(url, data)
      .then((result) => {
        getData();
        clear();
        toast.success("Classrooms have been allocated");
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error(error.message);
      });
  };

  const clear = () => {
    setClsRoom("");
    setTeachName("");
  };

  const handleDelete = (allocateClassRoomId) => {
    if (window.confirm("Are You Sure to delete this employee") === true) {
      axios
        .delete(
          `https://localhost:7019/api/AllocateClassroom/${allocateClassRoomId}`
        )
        .then((result) => {
          if (result.status === 200) {
            toast.success("Class Room has been De-Allocated");
            getData();
          }
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  const [selectedTeachOption, setSelectedTeachOption] = useState("");
  const [selectedClassRoomOption, setSelectedClassRoomOption] = useState("");

  const handleTechSelectChange = (event) => {
    setSelectedTeachOption(event.target.value);
  };

  const handleClassRoomSelectChange = (event) => {
    setSelectedClassRoomOption(event.target.value);
  };

  const handleTeacherDropdownClick = () => {
    // Fetch Teacher data when the dropdown is clicked
    fetchTeachData();
  };

  const handleClassRoomDropDownClick = () => {
    fetchClassRoomData();
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
              <a href="/">Allocate_Classroom</a>
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
            <b>Allocate ClassRooms</b>
          </p>
          <br />
          <Row className="mb-3">
            <p>Teacher Details</p>
            <Col>
              <label htmlFor="teacher_details" className="form-label">
                Teacher Name
              </label>
              <select
                id="teacher_dropdown"
                value={selectedTeachOption}
                onChange={handleTechSelectChange}
                onClick={handleTeacherDropdownClick}
                className="form-control"
              >
                <option value="">Select an option</option>
                {Array.isArray(teachName) &&
                  teachName.map((name, index) => (
                    <option key={index} value={name}>
                      {name}
                    </option>
                  ))}
              </select>
            </Col>
          </Row>

          <Row className="mb-3">
            <p>ClassRooms Details</p>
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
              <button className="btn btn-primary" onClick={handleSave}>
                Allocate
              </button>
            </Col>
          </Row>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Class Room</th>
                <th>Teacher Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data && data.length > 0 ? (
                data.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.clsRoom}</td>
                    <td>{item.teachName}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          handleDelete(item.allocateClassRoomId);
                        }}
                      >
                        De-Allocate
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">Loading...</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Container>
      </div>
    </Fragment>
  );
};

export default Allocate_Classroom;
