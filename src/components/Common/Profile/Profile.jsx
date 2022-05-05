import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { Get_Current_User_Profile, Post_Current_User_Profile } from '../../../API/UserService'
import { AvtarImg } from '../../../assets/images'
import './profile.css'
import { validateProfileDetail } from './validation';

export default function Profile() {
      const [userDetail, setUserDetail] = useState();

      const inputChangeHandler = ({target})=>{
            const {name, value} = target;

            userDetail[name] = value;
            setUserDetail({...userDetail});
      }

      
      const post_profile_detail =()=> {
            let {firstName, lastName, email, gender, dateOfBirth} = userDetail;
            Post_Current_User_Profile({firstName: firstName, lastName: lastName, email: email, gender: gender, dateOfBirth: new Date(dateOfBirth)})
                  .then(({data})=>{
                        Swal.fire(
                              'Profile updated Sucessfully!',
                              data,
                              'success'
                        )


                  })
                  .catch(({response})=>{
                        console.log(response);
                        Swal.fire(
                              'Invalid data!! ',
                              response,
                              'error'
                        )
                  })
      }

      const submitButtonHandler = (e)=>{
            e.preventDefault();

            (validateProfileDetail({userDetail: userDetail}))&&(
                  post_profile_detail()
            )
      }

      const get_Profile_detail =()=> {
            Get_Current_User_Profile()
                  .then(({data})=>{

                        setUserDetail({...data});
                  })
                  .catch(()=>{

                        alert("ERROR ON get_Profile_detail")
                  })
      }

      const resetButtonHandler =()=>{
            get_Profile_detail();
      }

      useEffect(()=>{
            get_Profile_detail();
      },[])
      
      return (
            <div id='my-profile' style={{marginTop:'2rem'}}>
                  <section id='my-profile-wrrapper'>
                        <nav>
                              <p className='fw-bolder fs-1 moving-text---effect'>My Profile</p>
                        </nav>
                        <hr />

                        <section className='d-flex' style={{gap:'4rem', margin:'0rem 8rem'}}>
                              <div class="card" style={{width: '30rem', height:'fit-content'}}>
                                    <img src={AvtarImg} class="card-img-top m-0 p-0" alt="..."/>
                                    <div class="card-body text-center pt-0">
                                          <p class="card-text p-0 m-0 extra--font">Welcome !!</p>
                                          <p class="card-text p-0 m-0 extra--font">Its' your own profile..</p>
                                    </div>
                              </div>

                              <div>
                                    {userDetail !== undefined &&(
                                          <form className="d-flex flex-column gap-4">
                                                <div className="col-md-12">
                                                      <label for="inputfirstName" className="form-label">First Name</label>
                                                      <span id='inputfirstName-tooltip' className='valid' style={{color:'red', paddingleft:'0.4rem', display:'none', fontSize:'1rem'}}>  * show not be empty</span>
                                                      <input type="text" className="form-control input--design" id="inputfirstName" name='firstName' placeholder='Enter first name...' value={userDetail.firstName} onChange={inputChangeHandler} />
                                                </div>

                                                <div className="col-md-12">
                                                      <label for="inputlastName" className="form-label">Last Name</label>
                                                      <span id='inputlastName-tooltip'  style={{color:'red', paddingleft:'0.4rem', display:'none', fontSize:'1rem'}}>  * show not be empty</span>
                                                      <input type="text" className="form-control input--design" id="inputlastName" name='lastName'  placeholder='Enter last name...' value={userDetail.lastName} onChange={inputChangeHandler}/>
                                                </div>

                                                <div className="col-md-12">
                                                      <label for="inputemail" className="form-label">Email</label>
                                                      <span id='inputemail-tooltip'  style={{color:'red', paddingleft:'0.4rem', display:'none', fontSize:'1rem'}}>  * show not be empty</span>
                                                      <input type="email" className="form-control input--design" id="inputemail" name='email'  placeholder='Enter email address...' value={userDetail.email} onChange={inputChangeHandler}/>
                                                </div>

                                                <div className="col-md-12">
                                                      <label for="inputemail" className="form-label">Gender</label>
                                                      <span id='inputgender-tooltip'  style={{color:'red', paddingleft:'0.4rem', display:'none', fontSize:'1rem'}}>  * show not be empty</span>
                                                      <br/>
                                                      <div class="form-check form-check-inline fs-5 mt-2">
                                                            <input class="form-check-input" type="radio" name="gender" id="radiomale" value='male' checked={(userDetail.gender.toLowerCase() === 'male')} onChange={inputChangeHandler}/>
                                                            <label class="form-check-label" for="inlineRadio1">Male</label>
                                                      </div>
                                                      <div class="form-check form-check-inline fs-5">
                                                            <input class="form-check-input" type="radio" name="gender" id="radiofemale" value='female' checked={userDetail.gender.toLowerCase() === 'female'} onChange={inputChangeHandler} />
                                                            <label class="form-check-label" for="inlineRadio2">Female</label>
                                                      </div>
                                                </div>

                                                <div className="col-md-12">
                                                      <label for="inputdateOfBirth" className="form-label">Date of Birth</label>
                                                      <span id='inputdateOfBirth-tooltip'  style={{color:'red', paddingleft:'0.4rem', display:'none', fontSize:'1rem'}}>  * show not be empty</span>
                                                      <input type="date" className="form-control input--design" id="inputdateOfBirth" name='dateOfBirth' 
                                                            value={(userDetail.dateOfBirth.trim() !== '')?new Date(userDetail.dateOfBirth).toISOString().split('T')[0] :''}
                                                            onChange={inputChangeHandler}
                                                      />
                                                </div>
                                                <div className="col-md-12 mt-5 d-flex gap-5 justify-content-end" style={{ height: '2.6rem' }}>
                                                      <button type="submit" className="save-dvd-btn btn btn-primary" onClick={submitButtonHandler}>Submit</button>
                                                      <button type="reset" className=" save-dvd-btn btn btn-danger" onClick={resetButtonHandler}>Reset</button>
                                                </div>
                                          </form>    
                                    )}


                              </div>
                        </section>
                  </section>
            </div>

      )
}


