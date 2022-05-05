import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import './registerMember.css';
import { AddUserImg, CrossImg } from '../../../assets/images';
import { checkValidation, removeValidationMessage } from './validation';
import { Get_Membership_Type_List, Post_New_Member } from '../../../API/UserService';

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
      const [isNewCateogary, setIsNewCateogary] = useState(false);
      const [memebershipTypeList, setMemebershipTypeList] = useState([]);
      
      const get_membership_type_list=()=>{
            Get_Membership_Type_List()
                  .then(({data})=>{

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
                              'Added Successfully!',
                              data,
                              'success'
                        )

                        resetHandler();
                  })
                  .catch(({response})=>{
                        Swal.fire(
                              'Invalid data!! ',
                              response.data,
                              'error'
                        )
                  })
      }

      const selectInputHandler=({name, value, tagName, selectedOptions})=>{
            
            if(! isNewCateogary){
                  (tagName === 'SELECT')&&(
                        registerDetail['membershipCategory']['description'] = selectedOptions[0].text
                  )

                  registerDetail['membershipCategory'][name] = value;
                  registerDetail['membershipCategory']['totalLoans'] = 1;
            }
            else{
                  // if user want to add new cateogary
                  if(name === 'totalLoans'){
                       
                        registerDetail['membershipCategory']['totalLoans'] = value;
                  }
                  else{
                        
                        registerDetail['membershipCategory']['description'] = value;
                        // make cateogary number to zero when adding new cateogary
                        registerDetail['membershipCategory']['mcategoryNumber'] = 0;
                  }
                  
            }

            

            
      }

      const inputChangeHandler=({target})=>{
            const {name, value, id} = target;

            removeValidationMessage(id);

            (id.includes('category'))
                  ? selectInputHandler(target)
                  : registerDetail[name] = value;

            setRegisterDetail({...registerDetail});

            console.log(registerDetail);
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
      }

      const submitHandler=(e)=>{
            e.preventDefault();

            checkValidation(registerDetail, isNewCateogary) && (
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
                  "profileImage": "",
            }

            // Clear the image input as well.
            var imageInput = document.getElementById("inputprofileImage");
            imageInput.value = "";

            setRegisterDetail({...registerDetail});
            
            setIsNewCateogary(false); // make allow create new acteigary to false.
      }

      const handlerAllowAddNewCateogary=()=>{
            setIsNewCateogary(!isNewCateogary);
           
            // reset cateogary detail when user want to change add new cateogary  to add existing cateogary or vice-verse
            registerDetail['membershipCategory'] ={
                  mcategoryNumber: 0,
                  description: "",
                  totalLoans: 0
            }

            setRegisterDetail(registerDetail);
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
                                          <input type="text" className="form-control input--design" id="inputfristName" name='fristName' placeholder='Enter first name...' value={registerDetail.fristName} onChange={inputChangeHandler} />
                                    </div>

                                    <div className="col-md-6">
                                          <label for="inputlastName" className="form-label">Last Name</label>
                                          <span id='inputlastName-tooltip'  style={{color:'red', paddingleft:'0.4rem', display:'none', fontSize:'1rem'}}>  * show not be empty</span>
                                          <input type="text" className="form-control input--design" id="inputlastName" name='lastName'  placeholder='Enter last name...' value={registerDetail.lastName} onChange={inputChangeHandler}/>
                                    </div>

                                    <div className="col-md-6">
                                          <label for="inputaddress" className="form-label">Address</label>
                                          <span id='inputaddress-tooltip' style={{color:'red', paddingleft:'0.4rem', display:'none', fontSize:'1rem'}}>  * show not be empty</span>
                                          <input type="text" className="form-control input--design" id="inputaddress" name='address' placeholder='Enter address...' value={registerDetail.address} onChange={inputChangeHandler}/>
                                    </div>

                                    <div className="col-md-6">
                                          <label for="inputdateOfBirth" className="form-label">Date of Birth</label>
                                          <span id='inputdateOfBirth-tooltip' style={{color:'red', paddingleft:'0.4rem', display:'none', fontSize:'1rem'}}>  * show not be empty</span>
                                          <input type="date" className="form-control input--design" id="inputdateOfBirth" name='dateOfBirth' value={registerDetail.dateOfBirth} onChange={inputChangeHandler}/>
                                    </div>

                                    <div className="col-md-6">
                                          <label for="inputprofileImage" className="form-label">Profile</label>
                                          <span id='inputprofileImage-tooltip' style={{color:'red', paddingleft:'0.4rem', display:'none', fontSize:'1rem'}}>  * show not be empty</span>
                                          <input type="file" className="form-control input--design" id="inputprofileImage" name='profileImage' placeholder='Select image...' onChange={(e) => addImage(e)}/>
                                    </div>


                                    <div className="col-md-6">
                                          <label for="inputPassword4" className="form-label">Memebership type</label>
                                          <span id='inputmcategoryNumber-tooltip' style={{color:'red', paddingleft:'0.4rem', display:'none', fontSize:'1rem'}}>  * show not be empty</span>
                                          <div className='d-flex gap-3'>
                                                {!isNewCateogary
                                                      ?(
                                                            <>
                                                            {/* if want to add existing cateogary*/}
                                                            <select className="form-select input--design" aria-label=".form-select-sm example" id='inputmcategoryNumber' name='mcategoryNumber' value={registerDetail.membershipCategory.mcategoryNumber} onChange={inputChangeHandler}>
                                                                  <option value={''}>---</option>
                                                                  {memebershipTypeList.map(({mcategoryNumber, description},index)=>{return(
                                                                        <option value={mcategoryNumber} key={`memebertype${index}`}>{description}</option>
                                                                  )})}
                                                            </select>
                                                            <img className='circle-img--button ' src={AddUserImg} alt=""  onClick={handlerAllowAddNewCateogary}/>
                                                            </>
                                                      )
                                                      :(
                                                            <>
                                                            {/* if want to add new catogary */}
                                                            <input className="form-control input--design" name='inputdescription' id="inputcategorydescription" placeholder='Insert cateogary name....' value={registerDetail.membershipCategory.description} onChange={inputChangeHandler}/>
                                                            <input type="number" className="form-control input--design" id="inputcategorytotalLoans" name='totalLoans' placeholder='Enter loan limit...' value={registerDetail.membershipCategory.totalLoans == 0 ? NaN : registerDetail.membershipCategory.totalLoans} onChange={inputChangeHandler}/>
                                                            <img className='circle-img--button' src={CrossImg} alt="" onClick={handlerAllowAddNewCateogary}/>
                                                            </>
                                                      )} 
                                                            
                                                
                                          </div>
                                          
                                    </div>

                                    <div className="col-md-6"></div>
                                    <div className="col-md-6 mt-5 d-flex gap-5 justify-content-end" style={{ height: '2.6rem' }}>
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