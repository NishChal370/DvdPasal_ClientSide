import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AXIOS } from "../../API/Constant";
import { Post_Login } from "../../API/UserService";
import "./login.css";
import jwt_decode from "jwt-decode";

let initialLoginDetail = { username: "", password: "" };
function Login({ setLoggeedIn }) {
  const navigate = useNavigate();
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
    })
      .then(({ data }) => {
        Swal.fire("Logged in!", "Welcome", "success");

        localStorage.setItem("token", data.token);
        localStorage.setItem("is_login", true);
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
    setLoginDetail({ username: "", password: "" });

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
            {/* <input type="text" className="form-control" id="email" placeholder="Email input" pattern="[^@\s]+@[^@\s]+\.[^@\s]+" value={loginDetail.email} onChange={inputChangeHandler}  required/> */}
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter username..."
              value={loginDetail.username}
              onChange={inputChangeHandler}
              required
            />
            {/* <input type="text" className="form-control" id="formEmailInput" placeholder="Email input"  value={loginDetail.email} onChange={inputChangeHandler}  required/> */}
          </div>
          <br />
          <div className="login-form-group">
            <label htmlFor="formPassswordInput">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter password..."
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
            />
            <label className="login-form-check-label" htmlFor="rememberMeCheck">
              Remember me
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
