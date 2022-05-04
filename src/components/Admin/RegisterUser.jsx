import React, { useState } from 'react'
import Swal from 'sweetalert2';
import { Post_Register_New_User } from '../../API/UserService';
import { removeValidationMessage, validateRegisterUser } from './validation';

function RegisterUser() {
      const [newUserDetail, setNewUserDetail] = useState({userName: "", email: "", password: "", firstName: "", dateOfBirth: "", gender: "male", lastName: "",})

      const post_register_new_user =()=>{
            Post_Register_New_User({newUserDetail: newUserDetail})
                  .then(({data})=>{
                        Swal.fire(
                              'User Registered Sucessfully!',
                              data,
                              'success'
                        )

                        resetHandler();
                  })
                  .catch(({response})=>{
                        console.log(response.data);
                        Swal.fire(
                              'Invalid data!! ',
                              response.data,
                              'error'
                        )
                  })
      }
      
      
      const inputChangeHandler =({target})=>{
            const {name, value} = target;

            newUserDetail[name] = value;
            setNewUserDetail({...newUserDetail});

            removeValidationMessage({inputName: name});
      }


      const submitHandler = (e)=>{
            e.preventDefault();
            
            ( validateRegisterUser({newUserDetail: newUserDetail}) ) && (
                  post_register_new_user()
            )
      }

      const resetHandler =()=>{
            setNewUserDetail({userName: "", email: "", password: "", firstName: "", dateOfBirth: "", gender: "male", lastName: "",});
      }

      return (
            <div id='registerStaff' style={{marginTop:'2rem'}}>
                  <section id='register-staff-wrrapper'>
                        <nav>
                              <p className='fw-bolder fs-1 moving-text---effect'>Register User</p>
                        </nav>
                        <hr />
                        {console.log(newUserDetail)}
                        <div>

                              <form className="row g-3" onSubmit={submitHandler} onReset={resetHandler}>
                                    <div className="col-md-6">
                                          <label for="inputuserName" className="form-label">User Name</label>
                                          <span id='inputuserName-tooltip' className='valid' style={{color:'red', paddingleft:'0.4rem', display:'none', fontSize:'1rem'}}>  * show not be empty</span>
                                          <input type="text" className="form-control input--design" id="inputuserName" name='userName' placeholder='Enter user name...' value={newUserDetail.userName} onChange={inputChangeHandler}/>
                                    </div>
                                    <div className="col-md-6"></div>

                                    <div className="col-md-6">
                                          <label for="inputfirstName" className="form-label">First Name</label>
                                          <span id='inputfirstName-tooltip'  style={{color:'red', paddingleft:'0.4rem', display:'none', fontSize:'1rem'}}>  * show not be empty</span>
                                          <input type="text" className="form-control input--design" id="inputfirstName" name='firstName'  placeholder='Enter First name...' value={newUserDetail.firstName} onChange={inputChangeHandler}/>
                                    </div>

                                    <div className="col-md-6">
                                          <label for="inputlastName" className="form-label">Last Name</label>
                                          <span id='inputlastName-tooltip'  style={{color:'red', paddingleft:'0.4rem', display:'none', fontSize:'1rem'}}>  * show not be empty</span>
                                          <input type="text" className="form-control input--design" id="inputlastName" name='lastName'  placeholder='Enter last name...' value={newUserDetail.lastName} onChange={inputChangeHandler}/>
                                    </div>

                                    <div className="col-md-6">
                                          <label for="inputemail" className="form-label">Email</label>
                                          <span id='inputemail-tooltip' className='valid' style={{color:'red', paddingleft:'0.4rem', display:'none', fontSize:'1rem'}}>  * show not be empty</span>
                                          <input type="text" className="form-control input--design" id="inputemail" name='email' placeholder='Enter email...' value={newUserDetail.email} onChange={inputChangeHandler}/>
                                    </div>

                                    <div className="col-md-6">
                                          <label for="inputpassword" className="form-label">Password</label>
                                          <span id='inputpassword-tooltip'  style={{color:'red', paddingleft:'0.4rem', display:'none', fontSize:'1rem'}}>  * show not be empty</span>
                                          <input type="text" className="form-control input--design" id="inputpassword" name='password'  placeholder='enter password...' value={newUserDetail.password} onChange={inputChangeHandler}/>
                                    </div>


                                    <div className="col-md-6">
                                          <label for="inputdateOfBirth" className="form-label">Date of Birth</label>
                                          <span id='inputdateOfBirth-tooltip' className='valid' style={{color:'red', paddingleft:'0.4rem', display:'none', fontSize:'1rem'}}>  * show not be empty</span>
                                          <input type="date" className="form-control input--design" id="inputdateOfBirth" name='dateOfBirth' placeholder='enter first name...' value={newUserDetail.dateOfBirth} onChange={inputChangeHandler}/>
                                    </div>

                                    <div className="col-md-6">
                                          <label for="gender" className="form-label">Gender</label>
                                          <span id='gender-tooltip'  style={{color:'red', paddingleft:'0.4rem', display:'none', fontSize:'1rem'}}>  * show not be empty</span>
                                          <br/>
                                          <div class="form-check form-check-inline fs-5 mt-2">
                                                <input class="form-check-input" type="radio" name="gender" id="radiomale" value='male' checked={(newUserDetail.gender === 'male')} onChange={inputChangeHandler}/>
                                                <label class="form-check-label" for="inlineRadio1">Male</label>
                                          </div>
                                          <div class="form-check form-check-inline fs-5">
                                                <input class="form-check-input" type="radio" name="gender" id="radiofemale" value='female' checked={(newUserDetail.gender === 'female')} onChange={inputChangeHandler} />
                                                <label class="form-check-label" for="inlineRadio2">Female</label>
                                          </div>

                                    </div>

                                    <div className="col-md-6">
                                          <div className="d-flex gap-5 justify-content-end" style={{ height: '2.6rem' }}>
                                                <button type="submit" className="save-dvd-btn btn btn-primary">Submit</button>
                                                <button type="reset" className=" save-dvd-btn btn btn-danger">Reset</button>
                                          </div>
                                    </div>
                              </form>
                        </div>
                  </section>
            </div>
      )
}

export default RegisterUser