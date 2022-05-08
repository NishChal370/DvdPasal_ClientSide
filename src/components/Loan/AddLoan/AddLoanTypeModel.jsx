import React, { useState } from 'react'
import Swal from 'sweetalert2';
import { Post_Loan_Type } from '../../../API/UserService'
import { removeLoanTypeValidationMessage, validateLoanType } from './validation'

const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 800,
      timerProgressBar: false,
    });

function AddLoanTypeModel({refreshHandler}) {
      const [typeData, setTypeData] = useState({typeName: '', duration: 0});

      const post_loan_type = ()=>{
            Post_Loan_Type(typeData)
                  .then(({data})=>{

                        Toast.fire({
                              icon: 'success',
                              title: 'Loan type added !!!'
                        });

                        refreshHandler();
                        resetHandler();

                        document.getElementById('btn-close').click();
                  })
                  .catch(({response})=>{
                        Swal.fire(
                              'Invalid data!! ',
                              response.data,
                              'error'
                        )

                  })
      }

      const submitButtonHandler = ()=>{
            validateLoanType(typeData) && post_loan_type();
      }

      const inputChangeHandler = ({target}) =>{
            const {name, value} = target;
            
            typeData[name] = value;
            setTypeData({...typeData});

            removeLoanTypeValidationMessage(name);
      }

      const resetHandler = () =>{
            setTypeData({typeName: '', duration: 0})
      }

      return (
            <div className="modal fade" id="addLoanTypeModel" tabindex="-1" aria-labelledby="addLoanTypeModelLabel" aria-hidden="true" >
                  <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                              <div className="modal-header">
                                    <h5 className="modal-title  moving-text---effect fs-3" id="addLoanTypeModelLabel">Add Loan Type</h5>
                                    <button type="button" id ='btn-close' className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div className="modal-body">
                                    <form>
                                          <div className="mb-3">
                                                <label htmlFor="typeName" className="col-form-label">Loan Name:</label>
                                                <span id='typeName-tooltip' className='valid' style={{color:'red', paddingleft:'0.4rem', display:'none', fontSize:'1rem'}}>  * show not be empty</span>
                                                <input type="text" className="form-control" name='typeName' id="typeName" value={typeData.typeName} onChange={inputChangeHandler}/>
                                          </div>
                                          <div className="mb-3">
                                                <label for="duration" className="col-form-label">Duration: 
                                                      <span style={{color:'#807d7d'}}>&nbsp;(in days)</span>
                                                </label>
                                                <span id='duration-tooltip' className='valid' style={{color:'red', paddingleft:'0.4rem', display:'none', fontSize:'1rem'}}>  * show not be empty</span>
                                                <input type="text" className="form-control" name='duration' id="duration" value={typeData.duration}  onChange={inputChangeHandler}/>
                                                
                                          </div>
                                    </form>
                              </div>

                              <div className="modal-footer">
                                    <button type="submit" className="save-dvd-btn btn btn-primary" id='btnSave' onClick={submitButtonHandler}>Submit</button>
                                    <button type="button" className=" save-dvd-btn btn btn-danger" data-bs-dismiss="modal" onClick={resetHandler}>Close</button>
                              </div>
                        </div>
                  </div>
            </div>
      )
}

export default AddLoanTypeModel