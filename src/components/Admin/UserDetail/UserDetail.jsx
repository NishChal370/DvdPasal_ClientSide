import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Get_All_Users_Detail } from '../../../API/UserService'
import { ChangePasswordIcon, DataNotFoundImg, EditIcon } from '../../../assets/images';
import { dateConverter } from '../../Common/dateConverter';
import './userDetail.css'
import UserDetailModel from './UserDetailModel';

function UserDetail() {
      const navigate = useNavigate();
      const [wantToRefresh, setWantToRefresh] = useState(false);
      const [editingUserDetail, setEditingUserDetail] = useState({firstName:'', lastName:'', email:'', id:'', dateOfBirth:'', gender:''});
      const [usersDetail, setUsersDetail] = useState();

      const get_all_users_detail = () =>{
            Get_All_Users_Detail()
                  .then(({data})=>{
                        setUsersDetail([...data])
                  })
                  .catch(({response})=>{
                        console.log(response);
                        console.log("ERROR ON get_all_users_detail");
                  })
      }

      const changePasswordButtonHandler=(userDetail)=>{
            
            navigate("/admin/changePassword", { state: userDetail });
      }

      const editUserDetailHandler=(selectedUserDetail)=>{
            setEditingUserDetail(selectedUserDetail);

            document.getElementById('openUserDetailModel1').click();
      }
      const refreshHandler = () => setWantToRefresh(!wantToRefresh)

      useEffect(()=>{
            get_all_users_detail();
      },[wantToRefresh])
      return (
            <div id='loanDetail' style={{marginTop:'2rem'}}>
                  <section id='loan-detail-wrrapper'>
                        <nav>
                              <p className='fw-bolder fs-1 moving-text---effect'>Users Detail</p>
                        </nav>
                        <hr />
                        <button id='openUserDetailModel1' data-bs-toggle="modal" data-bs-target="#editUserDetailModal" data-bs-whatever="@mdo" style={{display:'none'}}>OPEN</button>
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
                                                <th scope="col">Action/Return</th>
                                          </tr>
                                    </thead>
                                    <tbody>
                                          {usersDetail !== undefined &&(
                                                usersDetail.map(({firstName, lastName, email, userId, dateOfBirth, gender},index)=>{return(
                                                      
                                                      <tr key={`loand${index}`}>
                                                            <td>{index+1}</td>
                                                            {console.log(userId)}
                                                            <td>{firstName}</td>
                                                            <td>{lastName}</td>
                                                            <td>{email}</td>
                                                            <td>{dateConverter(dateOfBirth)}</td>
                                                            <td>{gender}</td>
                                                            <td className='d-flex gap-4 justify-content-center'>
                                                                  <img id='change-password-icon' src={ChangePasswordIcon} alt="change-password" 
                                                                        onClick={()=>changePasswordButtonHandler({ userId: userId, name: firstName })} 
                                                                  />
                                                                  <img id='change-password-icon' src={EditIcon} alt="edit-detail"
                                                                        onClick={()=>editUserDetailHandler({firstName:firstName, lastName:lastName, email:email, id:userId, dateOfBirth:dateOfBirth, gender:gender})}
                                                                  />
                                                                  
                                                            </td>
                                                      </tr>
                                                )})
                                          )}
                                    </tbody>
                              </table>

                              {(usersDetail !== undefined)&&(usersDetail.length<=0)&&(
                                    <img style={{width:'30rem', marginLeft:'40%'}} src={DataNotFoundImg} alt="div" />
                              )}

                              {usersDetail === undefined&&(
                                    <div class="spinner-grow" style={{width: '3rem', height: '3rem'}} role="status">
                                          <span class="visually-hidden">Loading...</span>
                                    </div>
                              )}

                              <UserDetailModel  selectedUserDetail={editingUserDetail} refreshHandler={refreshHandler}/>                              
                        </section>
                  </section>
                  
            </div>
      )
}

export default UserDetail