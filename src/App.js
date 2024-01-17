import React from "react";
import "./App.css";
import AllocateClassroom from "./components/AllocateClassroom";
import AllocateSubjects from "./components/AllocateSubjects";
import Classroom from "./components/Classroom";
import StudentDetailsReport from "./components/StudentDetailsReport";
import Student from "./components/Student";
import Subject from "./components/Subject";
import Teacher from "./components/Teacher";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/Layout";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="" element={<AllocateClassroom />} />
        <Route path="allocate_subject" element={<AllocateSubjects />} />
        <Route path="class_room" element={<Classroom />} />
        <Route path="student" element={<Student />} />
        <Route path="subject" element={<Subject />} />
        <Route path="teacher" element={<Teacher />} />
        <Route
          path="student_detail_report"
          element={<StudentDetailsReport />}
        />
      </Route>
    )
  );

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
