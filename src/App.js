import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { AddDVD, Catelog, Dashboard, DVDCopies, Home, Login, MemberDetail, Members, RegisterMember } from "./pages";
// import AddDVD from "./pages/AddDVD/AddDVD";
// import MemberDetail from "./pages/Member/MemberDetail";


function App() {

  console.log("HELLO")
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
            <Route path="members/register" element={<RegisterMember/>} />
            <Route path="add-dvd" element={<AddDVD/>} />
            <Route path="inventory/dvdcopies" element={<DVDCopies/>} />
            </>
          )}
          
        </Route>
      </Routes>
    </Router>
    
  );
}

export default App;
