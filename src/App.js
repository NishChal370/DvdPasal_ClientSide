import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { Catelog, Dashboard, DvdContainer, Home, InventoryContainer, LoanContainer, Login, MemberContainer, PageNotFound } from "./pages";
import { UnpopularDvd, RegisterMember, AddDVD, OldDvdDetail, AddLoan, CurrentLoans, InactiveMemberDetail, Members, LoanDetail, DVDCopies } from "./components";



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('is_login'));

  const setLoggeedIn = () => setIsLoggedIn(true);
  
  return (

    <Router>
      <Routes>
        <Route path="/login" element={<Login  setLoggeedIn={setLoggeedIn}/>} />

        <Route path="/" element={<Home />}>

          <Route index element={<Dashboard />} />
          
          {isLoggedIn && (
            <>
            <Route path="catelog" element={<Catelog />} />

            <Route path="members" element={<MemberContainer/>}>
              <Route index element={<Members />} />
              {/* <Route path="detail" element={<MemberDetail />} /> */}
              <Route path="inactive" element={<InactiveMemberDetail/>} />
              <Route path="register" element={<RegisterMember/>} />
            </Route>

            <Route path="loan" element={<LoanContainer/>}>
              <Route path="add" element={<AddLoan/>} />
              <Route path="detail" element={<LoanDetail/>} />
              <Route path="currentLoans" element={<CurrentLoans />} />
            </Route>

            <Route path="dvd" element={<DvdContainer/>}>
              <Route path="oldDvds" element={<OldDvdDetail/>} />
              <Route path="add" element={<AddDVD/>} />
              <Route path="unpopular" element={<UnpopularDvd/>} />
            </Route>

            <Route path="inventory" element={<InventoryContainer/>}>
              <Route path="dvdcopies" element={<DVDCopies/>} />
            </Route>
            </>
          )}

          
        </Route>

        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
    </Router>

  );
}

export default App;
