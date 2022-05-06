import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import Swal from "sweetalert2";
import jwt_decode from "jwt-decode";
import { AXIOS } from "../../API/Constant";
import { Post_Login } from "../../API/UserService";
import { back } from "../../assets/images";

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
    setLoginDetail({ username: "", password: "", rememberMe: false });

    document.getElementById("rememberMeCheck").checked = false;
  };

  return (
    <div>

      <img src={back} alt="background image" id="back-img" />


      <div id="login">
        <section className="login-wrapper">

          <h1 class="neonText">
            L<span id="flickering-text">o</span>gin
          </h1>

          <form id="login-form" onSubmit={submitHandler}>
            <div className="login-form-group">
              <label htmlFor="username" class="input-label">Username</label>
              <input
                type="text"
                className="form-control text-input"
                id="username"
                placeholder="Enter username..."
                value={loginDetail.username}
                onChange={inputChangeHandler}
                required
              />
            </div>
            <br />
            <div className="login-form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control text-input"
                id="password"
                placeholder="Enter password..."

                value={loginDetail.password}
                onChange={inputChangeHandler}
                required
              />
            </div>

            <div className="form-check">
              <input
                type="checkbox"
                class="form-check-input"
                id="rememberMeCheck"

                checked={isRememberMe}
                onChange={() => setIsRememberMe(!isRememberMe)}
              />
              <label class="form-check-label" id="check-label" htmlFor="rememberMeCheck">
                Remember me
              </label>
            </div>

            <div className="login-form-check">
              <p id="no-account-p">
                Don't have an account? <a href="/registration">Register</a>
              </p>
            </div>

            <div className="d-grid gap-2 col-6 mx-auto">
              <button class="btn btn-outline-light " id="login-btn" type="submit">Login</button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Login;
