import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Get_All_Users_Detail, Post_Change_User_Password } from '../../../API/UserService'
import { ChangePasswordIcon, DataNotFoundImg, EditIcon } from '../../../assets/images';
import { dateConverter } from '../../Common/dateConverter';
import './userDetail.css';
import Swal from 'sweetalert2';
import UserDetailModel from './UserDetailModel';
import PasswordChecklist from "react-password-checklist";

function UserDetail() {
      const navigate = useNavigate();
      const [wantToRefresh, setWantToRefresh] = useState(false);
      const [editingUserDetail, setEditingUserDetail] = useState({ firstName: '', lastName: '', email: '', id: '', dateOfBirth: '', gender: '' });
      const [usersDetail, setUsersDetail] = useState();

      const [userId, setUserId] = useState("");

      const [password, setPassword] = useState("")
      const [passwordAgain, setPasswordAgain] = useState("")

      const get_all_users_detail = () => {
            Get_All_Users_Detail()
                  .then(({ data }) => {
                        setUsersDetail([...data])
                  })
                  .catch(({ response }) => {
                        console.log(response);
                        console.log("ERROR ON get_all_users_detail");
                  })
      }


      const editUserDetailHandler = (selectedUserDetail) => {
            setEditingUserDetail(selectedUserDetail);

            document.getElementById('openUserDetailModel1').click();
      }
      const refreshHandler = () => setWantToRefresh(!wantToRefresh)

      function openModel(mUserId) {
            var modelBtn = document.getElementById('change-pass-model');
            var title = document.getElementById('userPassModalLabel');

            setPassword("");
            setPasswordAgain("");

            setUserId(mUserId);

            title.innerHTML = `Change password of user`
            modelBtn.click();
      }

      function closeModal() {
            document.getElementById('model-close').click();
      }



      function changeUserPassword() {

            Post_Change_User_Password({ userId: userId, newPassword: password })
                  .then(({ data }) => {
                        Swal.fire(
                              'User Password Changed!',
                              data,
                              'success'
                        );
                        closeModal();
                  })
                  .catch(({ response }) => {
                        console.log(response.data);
                        Swal.fire(
                              'Invalid data!! ',
                              response.data,
                              'error'
                        )
                  });
      }

      useEffect(() => {
            get_all_users_detail();
      }, [wantToRefresh])
      return (
            <div id='loanDetail' style={{ marginTop: '2rem' }}>

                  <button id='change-pass-model' type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#userPassModal" hidden>
                  </button>


                  <div class="modal fade" id="userPassModal" tabindex="-1" aria-labelledby="userPassModalLabel" aria-hidden="true">
                        <div id='pass-change-modal' class="modal-dialog modal-dialog-centered modal-lg">
                              <div class="modal-content">
                                    <div class="modal-header">
                                          <h5 class="modal-title fw-bolder fs-1 moving-text---effect" id="userPassModalLabel"></h5>
                                    </div>
                                    <div id='pass-modal-body' class="modal-body">
                                          <form id='pass-change-form'>
                                                <div>
                                                      <div>
                                                            <label htmlFor="new-password">New Password</label>
                                                            <br />
                                                            <input type="password" id='new-password' value={password} onChange={e => setPassword(e.target.value)} required />
                                                      </div>

                                                      <div>
                                                            <label htmlFor="confirm-password">Confirm Password</label>
                                                            <br />
                                                            <input type="password" id='confirm-password' value={passwordAgain} onChange={e => setPasswordAgain(e.target.value)} required />
                                                      </div>
                                                </div>
                                                <div>
                                                      <PasswordChecklist
                                                            rules={["minLength", "specialChar", "number", "capital", "match"]}
                                                            minLength={6}
                                                            value={password}
                                                            valueAgain={passwordAgain}
                                                            onChange={(isValid) => {
                                                                  document.getElementById("change-pass-btn").disabled = !isValid;
                                                            }}
                                                      />
                                                      <div class="modal-footer">
                                                            <button type="button" id='model-close' class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                            <button type="button" id='change-pass-btn' onClick={() => changeUserPassword()} class="btn btn-primary">Save changes</button>
                                                      </div>
                                                </div>
                                          </form>
                                    </div>

                              </div>
                        </div>
                  </div>

                  <section id='loan-detail-wrrapper'>
                        <nav>
                              <p className='fw-bolder fs-1 moving-text---effect'>Users Detail</p>
                        </nav>
                        <hr />
                        <button id='openUserDetailModel1' data-bs-toggle="modal" data-bs-target="#editUserDetailModal" data-bs-whatever="@mdo" style={{ display: 'none' }}>OPEN</button>
                        <section>
                              <table class="table">
                                    <thead>
                                          <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">First Name</th>
                                                <th scope="col">Last Name</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Date Of Birth</th>
                                                <th scope="col">Gender</th>
                                                <th scope="col">Action</th>
                                          </tr>
                                    </thead>
                                    <tbody>
                                          {usersDetail !== undefined && (
                                                usersDetail.map(({ firstName, lastName, email, userId, dateOfBirth, gender }, index) => {
                                                      return (

                                                            <tr key={`loand${index}`}>
                                                                  <td>{index + 1}</td>
                                                                  {console.log(userId)}
                                                                  <td>{firstName}</td>
                                                                  <td>{lastName}</td>
                                                                  <td>{email}</td>
                                                                  <td>{dateConverter(dateOfBirth)}</td>
                                                                  <td>{gender}</td>
                                                                  <td className='d-flex gap-4 justify-content-center'>
                                                                        <img id='change-password-icon' src={ChangePasswordIcon} alt="change-password"
                                                                              onClick={() => openModel(userId)}
                                                                        />
                                                                        <img id='change-password-icon' src={EditIcon} alt="edit-detail"
                                                                              onClick={() => editUserDetailHandler({ firstName: firstName, lastName: lastName, email: email, id: userId, dateOfBirth: dateOfBirth, gender: gender })}
                                                                        />

                                                                  </td>
                                                            </tr>
                                                      )
                                                })
                                          )}
                                    </tbody>
                              </table>

                              {(usersDetail !== undefined) && (usersDetail.length <= 0) && (
                                    <img style={{ width: '30rem', marginLeft: '40%' }} src={DataNotFoundImg} alt="div" />
                              )}

                              {usersDetail === undefined && (
                                    <div class="spinner-grow" style={{ width: '3rem', height: '3rem' }} role="status">
                                          <span class="visually-hidden">Loading...</span>
                                    </div>
                              )}

                              <UserDetailModel selectedUserDetail={editingUserDetail} refreshHandler={refreshHandler} />
                        </section>
                  </section>

            </div>
      )
}

export default UserDetail