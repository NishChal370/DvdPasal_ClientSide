import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import'./login.css';


let initialLoginDetail = {email:'', password:''};
function Login({setLoggeedIn}) {
  const navigate = useNavigate();
  const [loginDetail, setLoginDetail] = useState(initialLoginDetail);

  const inputChangeHandler=({target})=>{
    let {type, value} = target;

    loginDetail[type] = value;
    setLoginDetail({...loginDetail});
  }

  const submitHandler=(e)=>{
    e.preventDefault();
    console.log('Hello');
    console.log(loginDetail);

    localStorage.setItem('is_login', true);
    setLoggeedIn(true);

    navigate('/');
    resetInput();
  }

  const resetInput=()=>{
    loginDetail.email = '';
    loginDetail.password = '';

    setLoginDetail({...loginDetail});

    document.getElementById('rememberMeCheck').checked = false;
  }

  return (
    <div id='login' >
      <section className='login-wrapper'>
        <div className='title'>
          <p>L</p>
          <p>o</p>
          <p>g</p>
          <p>i</p>
          <p>n</p>
        </div>

        <form id='login-form' onSubmit={submitHandler}>
          <div className="login-form-group">
            <label htmlFor="formEmailInput">Email</label>
            <input type="email" className="form-control" id="formEmailInput" placeholder="Email input"  pattern="[^@\s]+@[^@\s]+\.[^@\s]+" value={loginDetail.email} onChange={inputChangeHandler}  required/>
          </div>
          <br/>
          <div className="login-form-group">
            <label htmlFor="formPassswordInput">Password</label>
            <input type="password" className="form-control" id="formPassswordInput" placeholder="Password input" value={loginDetail.password} onChange={inputChangeHandler} required/>
          </div>

          <div className="login-form-check">
            <input type="checkbox" className="login-form-check-input" id="rememberMeCheck"/>
            <label className="login-form-check-label" htmlFor="rememberMeCheck">Remember me</label>
          </div>

          <div className='button-wrapper'>
            <button type='submit'>Login</button>
          </div>
        </form>
        
      </section>

    </div>
  ) 
  
}

export default Login