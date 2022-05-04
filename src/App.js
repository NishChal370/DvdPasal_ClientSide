import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import jwt_decode from "jwt-decode";

import { AdminContainer, Catelog, Dashboard, DvdContainer, Home, InventoryContainer, LoanContainer, Login, MemberContainer, PageNotFound } from "./pages";
import { UnpopularDvd, RegisterMember, AddDVD, OldDvdDetail, AddLoan, CurrentLoans, InactiveMemberDetail, Members, LoanDetail, DVDCopies, RegisterUser, ChangePassword, UserDetail } from "./components";



function App() {
  const [loginStatus, setLoginStatus] = useState({isloggedIn :localStorage.getItem('is_login'), userType: ''});

  const setLoggeedIn = ({isLogin, userType}) =>{
    loginStatus.isloggedIn = isLogin;
    loginStatus.userType = userType;

    setLoginStatus({...loginStatus});
  }

  useEffect(()=>{
    if(localStorage.getItem('token') !== null){
      loginStatus.userType = jwt_decode(localStorage.getItem('token'))['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']

      setLoginStatus({...loginStatus});
    }
    
  },[])
  
  return (

    <Router>
      <Routes>
        <Route path="/login" element={<Login  setLoggeedIn={setLoggeedIn}/>} />

        <Route path="/" element={<Home />}>

          <Route index element={<Dashboard />} />

          {localStorage.getItem('token') !== null && (
            <>
            <Route path="catelog" element={<Catelog />} />

            <Route path="members" element={<MemberContainer/>}>
              <Route index element={<Members />} />
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

            {(loginStatus.userType === 'Admin')&&(
              <Route path="admin" element={<AdminContainer/>}>
                <Route path="registerUser" element={<RegisterUser/>} />
                <Route path="changePassword" element={<ChangePassword/>} />
                <Route path="userDetail" element={<UserDetail/>}>
                </Route>
              </Route>
            )}
            
            </>
          )}

          
        </Route>

        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
    </Router>

  );
}

export default App;
