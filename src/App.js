import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import "semantic-ui-css/semantic.min.css";

import Main from "./Main";

const App = () => {
  return (
    <>
      {" "}
      {/* <Cards /> */}
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
