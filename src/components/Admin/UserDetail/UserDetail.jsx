import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Get_All_Users_Detail } from '../../../API/UserService'
import { ChangePasswordIcon, DataNotFoundImg, EditIcon } from '../../../assets/images';
import { dateConverter } from '../../Common/dateConverter';
import './userDetail.css'

function UserDetail() {
      const navigate = useNavigate();
      
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
            // navigate('admin/changePassword')
            navigate("/admin/changePassword", { state: userDetail });
      }

      useEffect(()=>{
            get_all_users_detail();
      },[])
      return (
            <div id='loanDetail' style={{marginTop:'2rem'}}>
                  <section id='loan-detail-wrrapper'>
                        <nav>
                              <p className='fw-bolder fs-1 moving-text---effect'>Users Detail</p>
                        </nav>
                        <hr />

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
                                                            <td>{firstName}</td>
                                                            <td>{lastName}</td>
                                                            <td>{email}</td>
                                                            <td>{dateConverter(dateOfBirth)}</td>
                                                            <td>{gender}</td>
                                                            <td className='d-flex gap-4 justify-content-center'>
                                                                  <img id='change-password-icon' src={ChangePasswordIcon} alt="change-password" onClick={()=>changePasswordButtonHandler({ userId: userId, name: firstName })} />
                                                                  {/* <img id='change-password-icon' src={EditIcon} alt="change-password" /> */}
                                                                  
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

                        </section>
                  </section>
            </div>
      )
}

export default UserDetail


// {
//       "firstName": "UserFirstF",
//       "lastName": "UserFirstL",
//       "email": "user@gmail.com",
//       "userId": "6b4be6b0-a450-40e4-8b4a-8aecc49980db",
//       "dateOfBirth": "2002-01-11T00:00:00",
//       "gender": "male"
//     },