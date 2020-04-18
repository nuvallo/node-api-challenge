import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import Navigationbar from "./components/layout/Navigationbar";
import Homepage from "./components/pages/Homepage";
import Aboutpage from "./components/pages/Aboutpage";
import "./App.css";

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/projects")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  }, []);

  return (
    <div className="App">
      <Route path="/" component={Navigationbar} />
      <Route exact path="/" render={() => <Homepage />} />
      <Route path="/about" component={Aboutpage} />
    </div>
  );
}

export default App;
