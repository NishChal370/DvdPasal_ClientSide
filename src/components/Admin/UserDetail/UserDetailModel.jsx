import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { validate } from './validation';
import { Post_Change_User_Info_By_Admin } from '../../../API/UserService';


function UserDetailModel({selectedUserDetail, refreshHandler}) {
      const [editingUserDetail, setEditingUserDetail] = useState(selectedUserDetail);

      const inputChangeHandler = ({target})=>{
            const {name, value} = target;
            editingUserDetail[name] = value;

            setEditingUserDetail({...editingUserDetail});
      }

      const post_change_users_info_by_admin = () =>{
            editingUserDetail['password'] ='';

            Post_Change_User_Info_By_Admin(editingUserDetail)
                  .then(({data})=>{
                        Swal.fire(
                              'User updates Sucecssfully !!',
                              data,
                              'success'
                        );

                        refreshHandler();
                        resetHandler();

                        document.getElementById('closeUserDetailModel').click();
                        
                  })
                  .catch(({response})=>{
                        Swal.fire(
                              'Invalid data!! ',
                              response.data,
                              'error'
                        )
                  })
      }

      const resetHandler = ()=>{

            setEditingUserDetail({firstName:'', lastName: '', gender:'male', dateOfBirth: '', email:'',  id:''})  
      }
     

      const submitHandler =()=>{

            (validate(editingUserDetail)) &&(
                  post_change_users_info_by_admin()

            )
      }

      useEffect(()=>{

            setEditingUserDetail({...selectedUserDetail})
      },[selectedUserDetail])

      return (
            <div class="modal fade" id="editUserDetailModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <button id='openUserDetailModel' data-bs-toggle="modal" data-bs-target="#editUserDetailModal" data-bs-whatever="@mdo" style={{display:'none'}}>OPEN</button>
                  <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                              <div class="modal-header">
                                    <h5 class="modal-title fs-2 moving-text---effect" id="exampleModalLabel">Edit Detail</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div class="modal-body">
                                    <form className='row g-3'>
                                          <div class="col-md-6">
                                                <label htmlFor="recipient-name" class="col-form-label">First Name</label>
                                                <span id='inputfirstName-tooltip'  style={{color:'red', paddingleft:'0.4rem', display:'none', fontSize:'1rem'}}>  * show not be empty</span>
                                                <input type="text" class="form-control" id="inputfirstName" name='firstName' value={editingUserDetail.firstName} onChange={inputChangeHandler}/>
                                          </div>
                                          <div class="col-md-6">
                                                <label htmlFor="recipient-name" class="col-form-label">Last Name</label>
                                                <span id='inputlastName-tooltip'  style={{color:'red', paddingleft:'0.4rem', display:'none', fontSize:'1rem'}}>  * show not be empty</span>

                                                <input type="text" class="form-control" id="inputlastName" name='lastName' value={editingUserDetail.lastName} onChange={inputChangeHandler}/>
                                          </div>
                                          <div class="col-md-6">
                                                <label htmlFor="message-text" class="col-form-label">Email</label>
                                                <span id='inputemail-tooltip'  style={{color:'red', paddingleft:'0.4rem', display:'none', fontSize:'1rem'}}>  * show not be empty</span>

                                                <input type="text" class="form-control" id="inputemail" name='email' value={editingUserDetail.email} onChange={inputChangeHandler}/>
                                          </div>
                                          <div class="col-md-6">
                                                <label htmlFor="message-text" class="col-form-label">Gender</label>
                                                <span id='inputgender-tooltip'  style={{color:'red', paddingleft:'0.4rem', display:'none', fontSize:'1rem'}}>  * show not be empty</span>
                                                <br/>
                                                <div class="form-check form-check-inline fs-5 mt-2">
                                                      <input class="form-check-input" type="radio" name="gender" id="radiomale" value='male' checked={(editingUserDetail.gender === 'male')} onChange={inputChangeHandler}/>
                                                      <label class="form-check-label" htmlFor="inlineRadio1">Male</label>
                                                </div>
                                                <div class="form-check form-check-inline fs-5">
                                                      <input class="form-check-input" type="radio" name="gender" id="radiofemale" value='female' checked={(editingUserDetail.gender === 'female')} onChange={inputChangeHandler}/>
                                                      <label class="form-check-label" htmlFor="inlineRadio2">Female</label>
                                                </div>
                                          </div>
                                          <div class="col-md-6">
                                                <label htmlFor="message-text" class="col-form-label">Date of Birth</label>
                                                <span id='inputdateOfBirth-tooltip'  style={{color:'red', paddingleft:'0.4rem', display:'none', fontSize:'1rem'}}>  * show not be empty</span>
                                                <input type="date" class="form-control" id="inputdateOfBirth" name='dateOfBirth' 
                                                      value={(editingUserDetail.dateOfBirth.trim() !== '')?new Date(editingUserDetail.dateOfBirth).toISOString().split('T')[0] :''} 
                                                      onChange={inputChangeHandler}
                                                />
                                          </div>
                                    </form>
                              </div>
                              <div class="modal-footer">
                                    <button type="submit" className="save-dvd-btn btn btn-primary" onClick={submitHandler}>Submit</button>
                                    <button type="reset" id='closeUserDetailModel' className=" save-dvd-btn btn btn-danger" data-bs-dismiss="modal" aria-label="Close">Close</button>
                              </div>
                        </div>
                  </div>
            </div>
      )
}

export default UserDetailModel