import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

export default function Home() {
  return (
    <nav className="nav">
      <div className="btn1">
        <button className="btn btn-primary">
          <a href="/Allocate_Classroom">Allocate Classroom</a>
        </button>
      </div>

      <div className="btn2">
        <button className="btn btn-primary">
          <a href="/Allocate_Subjects">Allocate Subjects</a>
        </button>
      </div>

      <div className="btn3">
        <button className="btn btn-primary">
          <a href="/Classroom">Classroom</a>
        </button>
      </div>

      <div className="btn4">
        <button className="btn btn-primary">
          <a href="/Student_details_Report">Student Details Report</a>
        </button>
      </div>

      <div className="btn5">
        <button className="btn btn-primary">
          <a href="/Student">Student Details</a>
        </button>
      </div>

      <div className="btn6">
        <button className="btn btn-primary">
          <a href="/Subject">Subject</a>
        </button>
      </div>

      <div className="btn7">
        <button className="btn btn-primary">
          <a href="/Teacher">Teacher</a>
        </button>
      </div>
    </nav>
  );
}
