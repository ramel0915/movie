import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <div className="menu">
      <Link className="links" to="/">
        LogIn
      </Link>
      <Link className="links" to="/about">
        About
      </Link>
    </div>
  );
}

export default Navigation;
