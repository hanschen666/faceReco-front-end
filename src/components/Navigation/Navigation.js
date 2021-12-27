import React from "react";
const Navigation = ({ onRouteChange, route, onDelete }) => {
  if (route === "home") {
    return (
      <nav
        style={{
          display: "flex",
          justifyContent: "right",
        }}
      >
        <p
          onClick={() => onRouteChange("signin")}
          className="f3 link dim black underline pa3 pv0 pointer"
        >
          Sign Out
        </p>

        <p
          onClick={() => {
            onDelete;
            onRouteChange("signin");
          }}
          className="f3 link dim black underline pa3 pv0 pointer"
        >
          Delete Account
        </p>
      </nav>
    );
  } else {
    return (
      <nav
        style={{
          display: "flex",
          justifyContent: "right",
        }}
      >
        <p
          onClick={() => onRouteChange("signin")}
          className="f3 link dim black underline pa3 pv0 pointer"
        >
          Sign In
        </p>

        <p
          onClick={() => onRouteChange("register")}
          className="f3 link dim black underline pa3 pv0 pointer"
        >
          Register
        </p>
      </nav>
    );
  }
};
export default Navigation;
