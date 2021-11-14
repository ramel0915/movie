import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import "./Home.css";
import { Link,  Redirect } from "react-router-dom";
import { login_validation } from "./Register";

const useInput = (initialState, validator) => {
  const [value, setValue] = useState(initialState);
  const onChange = (event) => {
    const {
      target: { value }
    } = event;
    let willUpdate = true;
    if (typeof validator === "function") {
      willUpdate = validator(value);
    }
    if (willUpdate) {
      setValue(value);
    }
  };

  return { value, onChange };
};

export default function Home() {
  const maxLen = (value) => value.length < 12;
  const id = useInput("", maxLen);
  const password = useInput("", maxLen);
  const [status, setStatus] = useState(false);

  const submit_login = (event) => {
    event.preventDefault();
    console.log(event);
    setStatus(login_validation(id.value, password.value));
    return status;
  };
  return (
    <div className="Home">
      <h1 className="title">Movie App</h1>
      <div className="login_box">
        <h2>Login</h2>
        <hr />
        <br />
        <form className="idpw" onSubmit={submit_login}>
          <input className="input_box" placeholder="ID" {...id} />
          <br />
          <input
            type="password"
            className="input_box"
            placeholder="password"
            {...password}
          />
          <br />
          <button type="submit" className="login_button">
            Sign In
          </button>
          <Link to = "/register">
            <button type="button" className="register">
            Sign Up
            </button>
          </Link>
        </form>
        {status && <Redirect to = "/time" />}
      </div>
    </div>
  );
}
