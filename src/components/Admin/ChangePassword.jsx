import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import { Post_Change_Own_Password, Post_Change_User_Password } from '../../API/UserService';
import { validateNewPassword } from './validation';
import jwt_decode from "jwt-decode";
import "./changePassword.css"


function ChangePassword() {
      const { pathname, state } = useLocation();
      const navigate = useNavigate();

      const [passwordDetail, setPasswordDetail] = useState({ userID: '', type: '', oldPassword: '', newPassword: '', newPassword2: '' })


      const inputChangeHandler = ({ target }) => {
            const { name, value } = target;

            passwordDetail[name] = value;

            setPasswordDetail({ ...passwordDetail });
      }

      const change_user_Password = () => {
            Post_Change_User_Password({ userId: passwordDetail.userID, newPassword: passwordDetail.newPassword })
                  .then(({ data }) => {
                        Swal.fire(
                              'User Password Changed!',
                              data,
                              'success'
                        )

                        resetHandler();
                        navigate('/admin/userDetail');
                  })
                  .catch(({ response }) => {
                        console.log(response.data);
                        Swal.fire(
                              'Invalid data!! ',
                              response.data,
                              'error'
                        )
                  })
      }

      const post_change_own_password = () => {
            Post_Change_Own_Password({ oldPassword: passwordDetail.oldPassword, newPassword: passwordDetail.newPassword })
                  .then(({ data }) => {
                        Swal.fire(
                              'User Password Changed!',
                              data,
                              'success'
                        )

                        resetHandler();
                  })
                  .catch(({ response }) => {
                        Swal.fire(
                              'Invalid data!! ',
                              response.data,
                              'error'
                        )
                  })
      }

      const resetHandler = () => {
            const link =
                  (jwt_decode(localStorage.getItem("token"))['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'Admin')
                        ? "/admin/changePassword"
                        : "/setting/changePassword";

            navigate(link, { state: { userID: '', name: jwt_decode(localStorage.getItem("token"))['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] } });
            setPasswordDetail({ userID: '', type: jwt_decode(localStorage.getItem("token"))['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'], newPassword: '', newPassword2: '', oldPassword: '' });
      }

      const submitButtonHandler = (e) => {
            e.preventDefault();
            const { userID, newPassword, newPassword2, oldPassword } = passwordDetail;

            if (validateNewPassword({ oldPassword: oldPassword, newPassword: newPassword, newPassword2: newPassword2, checkoldPassword: userID === '' })) {
                  if (userID.trim() !== '') {
                        // Changing password of other user.
                        change_user_Password();

                  }
                  else {
                        // Changing your own password.
                        post_change_own_password();
                  }

            }
      }

      useEffect(() => {

            if (state !== null) {

                  setPasswordDetail({ userID: (state.userId === undefined) ? '' : state.userId, type: state.name, newPassword: '', newPassword2: '', oldPassword: '' });
            }
            else {

                  setPasswordDetail({ userID: '', type: jwt_decode(localStorage.getItem("token"))['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'], newPassword: '', newPassword2: '', oldPassword: '' });
            }

      }, [])

      return (

            <div>

                  <div id='registerStaff' style={{ marginTop: '2rem' }}>



                        <section id='register-staff-wrrapper'>
                              <nav>
                                    <p className='fw-bolder fs-1 moving-text---effect'>Change Password</p>
                              </nav>
                              <hr />
                              <div id='password-container-div' onSubmit={submitButtonHandler} onReset={resetHandler}>

                                    <form className="row g-3">
                                          <div className="col-md-12 mb-3">Username:&nbsp;
                                                {(state !== null)
                                                      ? state.name
                                                      : jwt_decode(localStorage.getItem("token"))['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']
                                                }
                                          </div>

                                          {(passwordDetail.userID === '') && (
                                                <div className="col-md-12">
                                                      <label htmlFor="inputoldPassword" className="htmlForm-label">Old Password</label>
                                                      <span id='inputoldPassword-tooltip' className='valid' style={{ color: 'red', paddingleft: '0.4rem', display: 'none', fontSize: '1rem' }}>  * show not be empty</span>
                                                      <input type="password" className="form-control input--design" id="inputoldPassword" name='oldPassword' placeholder='Enter new password...' value={passwordDetail.oldPassword} onChange={inputChangeHandler} />
                                                </div>
                                          )}

                                          <div className="col-md-12">
                                                <label htmlFor="inputuserName" className="form-label">New Password</label>
                                                <span id='inputnewPassword-tooltip' className='valid' style={{ color: 'red', paddingleft: '0.4rem', display: 'none', fontSize: '1rem' }}>  * show not be empty</span>
                                                <input type="password" className="form-control input--design" id="inputnewPassword" name='newPassword' placeholder='Enter new password...' value={passwordDetail.newPassword} onChange={inputChangeHandler} />
                                          </div>

                                          <div className="col-md-12">
                                                <label htmlFor="inputuserName" className="form-label">Confirm New Password</label>
                                                <span id='inputnewPassword2-tooltip' className='valid' style={{ color: 'red', paddingleft: '0.4rem', display: 'none', fontSize: '1rem' }}>  * show not be empty</span>
                                                <input type="password" className="form-control input--design" id="inputnewPassword2" name='newPassword2' placeholder='Re-enter new password...' value={passwordDetail.newPassword2} onChange={inputChangeHandler} />
                                          </div>

                                          <div className="col-md-12 mt-5 d-flex gap-5 justify-content-end" style={{ height: '2.6rem' }}>
                                                <button type="submit" className="save-dvd-btn btn btn-primary">Submit</button>
                                                <button type="reset" className=" save-dvd-btn btn btn-danger">Reset</button>
                                          </div>

                                    </form>
                              </div>
                        </section>
                  </div>
            </div>
      )
}

export default ChangePassword