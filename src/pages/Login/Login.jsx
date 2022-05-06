import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import Swal from "sweetalert2";
import jwt_decode from "jwt-decode";
import { AXIOS } from "../../API/Constant";
import { Post_Login } from "../../API/UserService";

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 800,
  timerProgressBar: false,
});

let initialLoginDetail = { username: "", password: "", rememberMe: false };
function Login({ setLoggeedIn }) {
  const navigate = useNavigate();
  const [isRememberMe, setIsRememberMe] = useState(false);
  const [loginDetail, setLoginDetail] = useState(initialLoginDetail);

  const inputChangeHandler = ({ target }) => {
    let { id, value } = target;

    loginDetail[id] = value;
    setLoginDetail({ ...loginDetail });
  };

  const post_login = () => {
    Post_Login({
      username: loginDetail.username,
      password: loginDetail.password,
      rememberMe: isRememberMe
    })
      .then(({ data }) => {
        Toast.fire({
          icon: 'success',
          title: 'Logged in !!!'
        });

        localStorage.setItem("token", data.token);
        localStorage.setItem("is_login", true);
        // localStorage.setItem("is_checked", isRememberMe);
        AXIOS.defaults.headers["Authorization"] = "Bearer " + localStorage.getItem("token");

        setLoggeedIn({
          isLogin: true,
          userType: jwt_decode(localStorage.getItem("token"))[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ],
        });

        navigate("/");
        resetInput();
      })
      .catch(({ response }) => {
        Swal.fire("Invalid data!! ", response.data, "error");
      });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    post_login();
  };

  const resetInput = () => {
    setLoginDetail({ username: "", password: "", rememberMe: false});

    document.getElementById("rememberMeCheck").checked = false;
  };

  return (
    <div id="login">
      <section className="login-wrapper">
        <div className="title">
          <p>L</p>
          <p>o</p>
          <p>g</p>
          <p>i</p>
          <p>n</p>
        </div>

        <form id="login-form" onSubmit={submitHandler}>
          <div className="login-form-group">
            <label htmlFor="formUsernameInput">User name</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter username..."
              style={{color:'white'}}
              value={loginDetail.username}
              onChange={inputChangeHandler}
              required
            />
          </div>
          <br />
          <div className="login-form-group">
            <label htmlFor="formPassswordInput">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter password..."
              style={{color:'white'}}
              value={loginDetail.password}
              onChange={inputChangeHandler}
              required
            />
          </div>

          <div className="login-form-check">
            <input
              type="checkbox"
              className="login-form-check-input"
              id="rememberMeCheck"
              style={{color:'white'}}
              checked={isRememberMe}
              onChange={()=>setIsRememberMe(!isRememberMe)}
            />
            <label className="login-form-check-label" htmlFor="rememberMeCheck">
              Remember me
            </label>
          </div>

          <div className="login-form-check">
            <label htmlFor="">
              Don't have account?
            </label>

            <label htmlFor="" style={{fontSize:'1.4rem', textDecoration:'underline', marginTop:'0.2rem', cursor:'pointer'}}
              onClick={()=>navigate('/registration')}  
            >
              Click Here
            </label>
          </div>

          <div className="button-wrapper">
            <button type="submit">Login</button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Login;
