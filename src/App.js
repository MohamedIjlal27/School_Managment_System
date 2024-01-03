import "./App.css";
import Student from "./components/Student";
import Teacher from "./components/Teacher";
import ClassRoom from "./components/Classroom";
import Subject from "./components/Subject";
import Allocate_Subjects from "./components/Allocate_Subjects";
import Allocate_Classroom from "./components/Allocate_Classroom";
import Student_details_Report from "./components/Student_details_Report";

function App() {
  return (
    <div className="App">
      <Student_details_Report />
    </div>
  );
}

export default App;
