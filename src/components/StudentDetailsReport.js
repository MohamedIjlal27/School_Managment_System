import React, { Fragment, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";

const Student = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [classroom, setClassroom] = useState("");
  const [subjectTeacherList, setSubjectTeacherList] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    if (selectedStudent) {
      fetchStudentDetails(selectedStudent);
    }
  }, [selectedStudent]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("https://localhost:7019/api/Student");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const fetchStudentDetails = async (studentId) => {
    try {
      const response = await axios.get(
        `https://localhost:7019/api/Student/${studentId}`
      );
      const studentDetails = response.data;

      console.log("Student Details Response:", studentDetails);

      setContactPerson(studentDetails.contactperson);
      setContactNo(studentDetails.contactno);
      setEmailAddress(studentDetails.emailaddress);

      const formattedDate = new Date(studentDetails.dateofbirth)
        .toISOString()
        .split("T")[0];
      setDateOfBirth(formattedDate);

      setClassroom(studentDetails.classroom);

      fetchSubjectTeacherList(studentId);
    } catch (error) {
      console.error("Error fetching student details:", error);
    }
  };

  const fetchSubjectTeacherList = async (allocatedSubId) => {
    try {
      const response = await axios.get(
        `https://localhost:7019/api/AllocateSubjects/${allocatedSubId}`
      );
      setSubjectTeacherList(response.data);
    } catch (error) {
      console.error("Error fetching subject & teacher list:", error);
    }
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
            <b>Student Details Report</b>
          </p>
          <br />
          <Row className="mb-3">
            <Col>
              <label htmlFor="student" className="form-label">
                Student
              </label>
              <select
                id="studentSelect"
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                className="form-control"
              >
                <option value="">Select a student</option>
                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.firstname} {student.lastname}
                  </option>
                ))}
              </select>
            </Col>
            <Col>
              <label htmlFor="classroom" className="form-label">
                Classroom
              </label>
              <input
                type="text"
                id="last_name"
                className="form-control"
                value={classroom}
                readOnly
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
                value={contactPerson}
                readOnly
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
                value={contactNo}
                readOnly
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
                value={emailAddress}
                readOnly
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
                value={dateOfBirth}
                readOnly
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
              {subjectTeacherList.map((item, index) => (
                <tr key={index}>
                  <td>{item.subject}</td>
                  <td>{item.teacher}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>
    </Fragment>
  );
};

export default Student;
