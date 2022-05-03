import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { UnpopularDvd, RegisterMember, OldDvdDetail, AddLoan, CurrentLoans, InactiveMemberDetail } from "./components";
import { AddDVD, Catelog, Dashboard, DVDCopies, Home, LoanDetail, Login, MemberDetail, Members, PageNotFound } from "./pages";


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
            <Route path="members" element={<Members />} />
            <Route path="members/detail" element={<MemberDetail />} />
            <Route path="members/inactive" element={<InactiveMemberDetail/>} />
            <Route path="members/register" element={<RegisterMember/>} />
            <Route path="dvd/add" element={<AddDVD/>} />
            <Route path="dvd/unpopular" element={<UnpopularDvd/>} />
            <Route path="inventory/dvdcopies" element={<DVDCopies/>} />
            <Route path="dvd/oldDvds" element={<OldDvdDetail/>} />
            <Route path="loan/detail" element={<LoanDetail/>} />
            <Route path="loan/add" element={<AddLoan/>} />
            
            <Route path="loan/currentLoans" element={<CurrentLoans />} />
            </>
          )}

          
        </Route>

        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
    </Router>

  );
}

export default App;
