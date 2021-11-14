import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import "./TimeSelect.css";
import { Link , Redirect} from "react-router-dom";

const useInput = (initialState) => {
  const [value, setValue] = useState(initialState);
  const onChange = (event) => {
    const {
      target: { value }
    } = event;
    setValue(value);
  };

  return { value, onChange };
};

const movie_meta = [
  {
    theater : "영등포",
    movie : "이터널스",
    time : "12:00 ~ 13:00"
  },
  {
    theater : "용남",
    movie : "이터널스",
    time : "13:00 ~ 14:00"
  },
  {
    theater : "용남",
    movie : "이터널스",
    time : "16:00 ~ 17:00"
  },
  {
    theater : "노원",
    movie : "듄",
    time : "9:00 ~ 10:30"
  },
  {
    theater : "용남",
    movie : "듄",
    time : "10:00 ~ 11:30"
  },
  {
    theater : "노원",
    movie : "강릉",
    time : "21:20 ~ 22:30"
  },

];

const available_time = (theater, movie) => {
  const result = movie_meta.filter(element => (element.theater == theater && element.movie == movie));
  if (result.length == 0){
    return (<option value = "none">
      선택 가능한 시간이 없습니다
    </option>);
  }
  return(
    result.map(element =>{
      <option value = {element.time}>
        element.time
      </option>  
    })
  );
};

export default function TimeSelect() {
  const theater = useInput("");
  const movie = useInput("");
  const time = useInput("");
  const [status, setStatus] = useState(false);


  const submit_time = (event) => {
    event.preventDefault();
    console.log(event);
    return true;
  };
  return (
    <div className="TimeSelect">
    <h1 className="title">Movie App</h1>
    <div className="reserve_box">
      <h2>Time Select</h2>
      <hr />
      <br />
      <form className="Time" onSubmit={submit_time} >
        <select className="input_box" onChange = {theater.onChange}>
          <option value = "용산">
            용산
          </option>
          <option value = "노원">
            노원
          </option>
          <option value = "영등포">
            영등포
          </option>
        </select>
        <br />
        <select className="input_box" onChange = {movie.onChange}>
          <option value = "이터널스">
            이터널스
          </option>
          <option value = "듄">
            듄
          </option>
          <option value = "강릉">
            강릉
          </option>
        </select>
        <br />
        <select className="input_box" onChange = {time.onChange}>
          {available_time(theater.value, movie.value)}
        </select>
        <br />
        <br />
        <Link to = "/reservation">
          <button type="button" className="sign_in">
          좌석 선택
          </button>
        </Link>
      </form>
      {status && <Redirect to = "/" />}
    </div>
  </div>
  );
}
