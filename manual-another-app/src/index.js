import React from "react";
import ReactDOM from "react-dom";

const App = () => {
  return (
    <div>
      <h1>This is react</h1>
    </div>
  );
};

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<App />, wrapper) : false;
