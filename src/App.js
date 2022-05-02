import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { AddDVD, AddLoan, Catelog, CurrentLoans, Dashboard, DVDCopies, Home, InactiveMemberDetail, LoanDetail, Login, MemberDetail, Members, OldDvdDetail, RegisterMember, UnpopularDvd } from "./pages";
// import AddDVD from "./pages/AddDVD/AddDVD";
// import MemberDetail from "./pages/Member/MemberDetail";


function App() {

  console.log("HELLO")
  return (

    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Home />}>

          <Route index element={<Dashboard />} />

          {localStorage.getItem('is_login') && (
            <>
            <Route path="catelog" element={<Catelog />} />
            <Route path="members" element={<Members />} />
            <Route path="members/detail" element={<MemberDetail />} />
            <Route path="members/inactive" element={<InactiveMemberDetail/>} />
            <Route path="members/register" element={<RegisterMember/>} />
            <Route path="dvd/add" element={<AddDVD/>} />
            <Route path="dvd/unpopular" element={<UnpopularDvd />} />
            <Route path="inventory/dvdcopies" element={<DVDCopies/>} />
            {/* <Route path="inventory/oldDvds" element={<OldDvdDetail/>} /> */}
            <Route path="dvd/oldDvds" element={<OldDvdDetail/>} />
            <Route path="loan/detail" element={<LoanDetail/>} />
            <Route path="loan/add" element={<AddLoan/>} />
            
            <Route path="loan/currentLoans" element={<CurrentLoans />} />
            {/* <Route path="currentLoans" element={<CurrentLoans />} /> */}
            
            {/* add-dvd */}
            </>
          )}

        </Route>
      </Routes>
    </Router>

  );
}

export default App;
