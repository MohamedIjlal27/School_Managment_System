import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

export default function Login() {
  const handleSubmit = (event) => {
    event.preventDefault();

    // Get the values of username and password
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Check if username and password are correct
    if (username === "admin" && password === "admin") {
      // Redirect to the next page
      window.location.href = "/Allocate_Classroom";
    } else {
      // Display an error message
      alert("Invalid username or password. Please try again.");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row min-vh-100 justify-content-center align-items-center">
        <div className="col-lg-4 col-md-6 col-sm-8">
          <div className="card">
            <div className="card-body p-5">
              <h2 className="card-title text-center mb-4">Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Enter your username"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Log In
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
