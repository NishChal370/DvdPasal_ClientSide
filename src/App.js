import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Home, Login } from "./pages";


function App() {

  
  return (
    
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </Router>
    
  );
}

export default App;

 {/* <Route path="overview" element={<h1>Overview</h1>}>
          <Route index element={<h1>HE 1</h1>} />
          <Route path="b" element={<h1>HE 2</h1>} />
        </Route> */}