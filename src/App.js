import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { Catelog, Dashboard, Home, Login } from "./pages";


function App() {

  
  return (
    
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>}/>

        <Route path="/" element={<Home />}>

          <Route index element={<Dashboard />} />

          {localStorage.getItem('is_login')&&(
            <Route path="catelog" element={<Catelog />} />
          )}
          
        </Route>
      </Routes>
    </Router>
    
  );
}

export default App;
