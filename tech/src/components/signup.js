import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';

export var userData;

export default function Signup() {
  const navigate = useNavigate();
  const [data, setData] = useState("default");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const submithandler = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    if (data != null && data != "default") {
      navigate("/stack", { state: data });
    }
  }, [data]);
  return (
    <div
      className="login-form-container"
      style={{
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        height: "auto",
      }}
    >
      <form className="login-form" onSubmit={submithandler}>
        <div className="login-form-content">
          <h3 className="login-form-title">Sign Up</h3>
          <div className="text-center">
            Returning User?{" "}
            <span className="link-primary" onClick={() => navigate("/")}>
              <u>Log in</u>
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              type="text"
              name="email"
              className="form-control mt-1"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              name="password"
              type="password"
              className="form-control mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
