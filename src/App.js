import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { Catelog, Dashboard, Home, Login, Members } from "./pages";
import AddDVD from "./pages/AddDVD/AddDVD";
import MemberDetail from "./pages/Member/MemberDetail";


function App() {

  
  return (
    
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>}/>

        <Route path="/" element={<Home />}>

          <Route index element={<Dashboard />} />

          {localStorage.getItem('is_login')&&(
            <>
            <Route path="catelog" element={<Catelog />} />
            <Route path="members" element={<Members />} />
            <Route path="members/detail" element={<MemberDetail />} />
            <Route path="add-dvd" element={<AddDVD/>} />
            </>
          )}
          
        </Route>
      </Routes>
    </Router>
    
  );
}

export default App;
