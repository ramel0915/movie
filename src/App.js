import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route} from "react-router-dom";
import Home from "./routes/Home";
import About from "./routes/About";
import Register from "./routes/Register";
import TimeSelect from "./routes/TimeSelect";
import Navigation from "./components/Navigation";
import "./styles.css";

export default function App() {
  return (
    <Router>
      <Route path="/" exact={true} component={Home} />
      <Route path="/about" component={About} />
      <Route path="/register" component={Register} />
      <Route path="/time" component ={TimeSelect} />
    </Router>
  );
}
