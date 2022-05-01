import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import './registerMember.css';
import { checkValidation, removeValidationMessage } from './validation';
import { Get_Membership_Type_List, Post_New_Member } from '../../API/UserService';

const data = {
      "fristName": "",
      "lastName": "",
      "address": "",
      "membershipCategory": {
            "mcategoryNumber": 0,
            "description": "",
            "totalLoans": 0
      },
      "dateOfBirth": '',
      "profileImage": ""
}

function RegisterMember() {
      const [registerDetail, setRegisterDetail] = useState({...data});
      const [memebershipTypeList, setMemebershipTypeList] = useState([]);

      const get_membership_type_list=()=>{
            Get_Membership_Type_List()
                  .then(({data})=>{
                        console.log(data);
                        setMemebershipTypeList([...data])
                  })
                  .catch(({response})=>{
                        console.log(response.data);
                  })
      }


      const post_new_member=()=>{
            Post_New_Member(registerDetail)
                  .then(({data})=>{
                        Swal.fire(
                              'Added Sucessfully!',
                              data,
                              'success'
                        )

                        resetHandler();
                  })
                  .catch(({response})=>{
                        Swal.fire(
                              'Invalid data!! ',
                              response.data.title,
                              'error'
                        )
                  })
      }

      const selectInputHandler=({name, value, tagName, selectedOptions})=>{
            
            (tagName === 'SELECT')&&(
                  registerDetail['membershipCategory']['description'] = selectedOptions[0].text
            )
            registerDetail['membershipCategory'][name] = value;
      }

      const inputChangeHandler=({target})=>{
            const {name, value, id} = target;

            removeValidationMessage(id);

            (id.includes('category'))
                  ? selectInputHandler(target)
                  : registerDetail[name] = value;

            setRegisterDetail({...registerDetail});
      }

      const addImage = (e) => {
            var uploadedImages = e.currentTarget.files;
            var iBase64 = "";

            let reader = new FileReader();

            reader.readAsDataURL(uploadedImages[0]);

            reader.onload = function () {
                  iBase64 = reader.result.split(',').pop();
                  registerDetail.profileImage = iBase64;
            }

            reader.onerror = function (error) {
                  console.log("Error converting image: ", error);
            }

            console.log(registerDetail);
      }

      const submitHandler=(e)=>{
            e.preventDefault();

            checkValidation(registerDetail) && (
                  post_new_member()
            )
      }

      const resetHandler=()=>{
            let registerDetail= {
                  "fristName": "",
                  "lastName": "",
                  "address": "",
                  "membershipCategory": {
                        "mcategoryNumber": 0,
                        "description": "",
                        "totalLoans": 0
                  },
                  "dateOfBirth": '',
                  "profileImage": ""
            }

            setRegisterDetail({...registerDetail});
      }

      useEffect(()=>{
            get_membership_type_list();
      },[])

      return (
            <div id='registerStaff' style={{marginTop:'2rem'}}>
                  <section id='register-staff-wrrapper'>
                        <nav>
                              <p className='fw-bolder fs-1 moving-text---effect'>Register Members</p>
                        </nav>
                        <hr />

                        <div>

                              <form className="row g-3" onSubmit={submitHandler} onReset={resetHandler}>
                                    <div className="col-md-6">
                                          <label for="inputfristName" className="form-label">First Name</label>
                                          <span id='inputfristName-tooltip' className='valid' style={{color:'red', paddingleft:'0.4rem', display:'none', fontSize:'1rem'}}>  * show not be empty</span>
                                          <input type="text" className="form-control input--design" id="inputfristName" name='fristName' placeholder='enter first name...' value={registerDetail.fristName} onChange={inputChangeHandler} />
                                    </div>

                                    <div className="col-md-6">
                                          <label for="inputlastName" className="form-label">Last Name</label>
                                          <span id='inputlastName-tooltip'  style={{color:'red', paddingleft:'0.4rem', display:'none', fontSize:'1rem'}}>  * show not be empty</span>
                                          <input type="text" className="form-control input--design" id="inputlastName" name='lastName'  placeholder='enter last name...' value={registerDetail.lastName} onChange={inputChangeHandler}/>
                                    </div>

                                    <div className="col-md-6">
                                          <label for="inputaddress" className="form-label">Address</label>
                                          <span id='inputaddress-tooltip' style={{color:'red', paddingleft:'0.4rem', display:'none', fontSize:'1rem'}}>  * show not be empty</span>
                                          <input type="text" className="form-control input--design" id="inputaddress" name='address' placeholder='enter address...' value={registerDetail.address} onChange={inputChangeHandler}/>
                                    </div>

                                    <div className="col-md-6">
                                          <label for="inputdateOfBirth" className="form-label">Date of Birth</label>
                                          <span id='inputdateOfBirth-tooltip' style={{color:'red', paddingleft:'0.4rem', display:'none', fontSize:'1rem'}}>  * show not be empty</span>
                                          <input type="date" className="form-control input--design" id="inputdateOfBirth" name='dateOfBirth' value={registerDetail.dateOfBirth} onChange={inputChangeHandler}/>
                                    </div>

                                    <div className="col-md-6">
                                          <label for="inputprofileImage" className="form-label">Profile</label>
                                          <span id='inputprofileImage-tooltip' style={{color:'red', paddingleft:'0.4rem', display:'none', fontSize:'1rem'}}>  * show not be empty</span>
                                          <input type="file" className="form-control input--design" id="inputprofileImage" name='profileImage' placeholder='select image...' onChange={(e) => addImage(e)}/>
                                    </div>

                                    <div className="col-md-6">
                                          <label for="inputPassword4" className="form-label">Memebership type</label>
                                          <span id='inputmcategoryNumber-tooltip' style={{color:'red', paddingleft:'0.4rem', display:'none', fontSize:'1rem'}}>  * show not be empty</span>
                                          <select className="form-select input--design" aria-label=".form-select-sm example" id='inputmcategoryNumber' name='mcategoryNumber' value={registerDetail.membershipCategory.mcategoryNumber} onChange={inputChangeHandler}>
                                                <option value={''}>---</option>
                                                {memebershipTypeList.map(({mcategoryNumber, description},index)=>{return(
                                                      <option value={mcategoryNumber} key={`memebertype${index}`}>{description}</option>
                                                )})}
                                                
                                          </select>
                                    </div>

                                    <div className="col-md-6">
                                          <label for="inputtotalLoans" className="form-label">Total Loans</label>
                                          <span id='inputcategorytotalLoans-tooltip' style={{color:'red', paddingleft:'0.4rem', display:'none', fontSize:'1rem'}}>  * show not be empty</span>
                                          <input type="number" className="form-control input--design" id="inputcategorytotalLoans" name='totalLoans' placeholder='enter loan limit...' value={registerDetail.membershipCategory.totalLoans} onChange={inputChangeHandler}/>
                                    </div>
                                    
                                    <div className="col-md-6 mt-5 d-flex gap-5" style={{ height: '2.6rem' }}>
                                          <button type="submit" className="save-dvd-btn btn btn-primary">Submit</button>
                                          <button type="reset" className=" save-dvd-btn btn btn-danger">Reset</button>
                                    </div>
                              </form>
                        </div>
                  </section>
            </div>
      )
}

export default RegisterMember