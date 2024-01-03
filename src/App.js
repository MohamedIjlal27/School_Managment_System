import React, { useEffect, useState } from "react";
import "./App.css";
import Allocate_Classroom from "./components/Allocate_Classroom";
import Allocate_Subjects from "./components/Allocate_Subjects";
import Classroom from "./components/Classroom";
import Student_details_Report from "./components/Student_details_Report";
import Student from "./components/Student";
import Subject from "./components/Subject";
import Teacher from "./components/Teacher";
import Home from "./components/Home";

function App() {
  const [component, setComponent] = useState(null);

  useEffect(() => {
    // Function to handle URL changes
    const handleUrlChange = () => {
      switch (window.location.pathname) {
        case "/Allocate_Classroom":
          setComponent(<Allocate_Classroom />);
          break;

        case "/Allocate_Subjects":
          setComponent(<Allocate_Subjects />);
          break;

        case "/Classroom":
          setComponent(<Classroom />);
          break;

        case "/Student_details_Report":
          setComponent(<Student_details_Report />);
          break;

        case "/Student":
          setComponent(<Student />);
          break;

        case "/Subject":
          setComponent(<Subject />);
          break;

        case "/Teacher":
          setComponent(<Teacher />);
          break;

        default:
          setComponent(<Home />);
          break;
      }
    };

    // Add event listener for URL changes
    window.addEventListener("popstate", handleUrlChange);

    // Call the handler once to set the initial component
    handleUrlChange();

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("popstate", handleUrlChange);
    };
  }, []); // Empty dependency array to run only once when the component mounts

  // Conditionally render the Home component based on the current route
  return <>{window.location.pathname === "/" ? <Home /> : component}</>;
}

export default App;
