import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import "./Register.css";
import { Link , Redirect} from "react-router-dom";

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

var id_data = [{
  id: "admin",
  password: "123"
}];

export function login_validation(id, password){
  if (id.length == 0) {
    alert("Please enter ID");
    return false;
  } else if (password.length == 0) {
    alert("Please enter password");
    return false;
  }
  const duplicated = id_data.find(element => { return (element.id === id && element.password === password);});
  if ( typeof duplicated == "undefined"){
      alert("Invalid ID or password");
      return false;
  }
  alert("Login success!");
  return true;
};

export default function Register() {
  const maxLen = (value) => value.length < 12;
  const id = useInput("", maxLen);
  const password = useInput("", maxLen);
  const confirm_password = useInput("", maxLen);
  const [status, setStatus] = useState(false);

  const id_validation = (id) => {
    const duplicated = id_data.find(element => { return (element.id === id);});
    console.log(duplicated);
    if ( typeof duplicated == "undefined"){
        return true;
    }
    return false;
  };
  const register_validation = (id, password) => {
    if (!id_validation(id)){
        alert("이미 사용중인 아이디입니다.");
        return false;
    }
    id_data.push({id, password});
    alert("회원가입이 완료되었습니다.");
    return true;
  };

  const submit_registration = (event) => {
    event.preventDefault();
    console.log(event);
    if(password.value != confirm_password.value){
        alert("비밀번호가 일치하지 않습니다.")
        return;
    }
    setStatus(register_validation(id.value, password.value));
    return status;
  };
  return (
    <div className="Register">
      <h1 className="title">Movie App</h1>
      <div className="register_box">
        <h2>Sign Up</h2>
        <hr />
        <br />
        <form className="idpw" onSubmit={submit_registration} >
          <input className="input_box" placeholder="ID" {...id} />
          <br />
          <input
            type="password"
            className="input_box"
            placeholder="password"
            {...password}
          />
          <br />
          <input
            type="password"
            className="input_box"
            placeholder="confirm password"
            {...confirm_password}
          />
          <br />
          <button type="submit" className="sign_up">
            Sign Up
          </button>
          <br />
          <br />
          <div>계정이 이미 있으신가요?</div>
          <Link to = "/">
            <button type="button" className="sign_in">
            Sign In
            </button>
          </Link>
        </form>
        {status && <Redirect to = "/" />}
      </div>
    </div>
  );
}
