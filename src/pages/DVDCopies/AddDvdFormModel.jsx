import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { Get_Dvd_Name_List, Post_New_Dvd_Copy } from '../../API/UserService';
import { removeValidationMessage, validateModel } from './validation';

function AddDvdFormModel({refreshPage}) {//exampleModal
      const [newDvdDetail, setNewDvdDetail] = useState({dvdId:'', datePurchased: '', dvdCount: 1});
      
      const [dvdNameList, setDvdNameList] = useState();

      const get_dvd_name_list=()=>{
            
            Get_Dvd_Name_List()
                  .then(({data})=>{
                        setDvdNameList(data);
                  })
                  .catch(({response})=>{
                        console.log("Errro on get dvd title in add dvd form model");
                  })
      }

      const post_new_dvd_copy=()=>{
            
            Post_New_Dvd_Copy(newDvdDetail)
                  .then(({data})=>{
                        Swal.fire(
                              'Added Sucessfully!',
                              data,
                              'success'
                        )    
                        resetHandler();
                        
                        refreshPage();
                  })
                  .catch(({response})=>{

                        Swal.fire(
                              'Invalid data!! ',
                              response.data.title,
                              'error'
                        )

                  })
      }


      const resetHandler=()=>{
            setNewDvdDetail({dvdId:'', datePurchased: '', dvdCount: 1})
            
            removeValidationMessage('dvdId');
            removeValidationMessage('datePurchased');
            removeValidationMessage('dvdCount');
      }

      const inputChangeHandler=({target})=>{
            const {name, value} = target;

            removeValidationMessage(name);

            newDvdDetail[name] = value;

            setNewDvdDetail({...newDvdDetail});
      }

      const submitHandler=()=>{
            
            validateModel(newDvdDetail) &&(
                  post_new_dvd_copy()
            )
      }

      useEffect(()=>{
            get_dvd_name_list();
      },[])
      return (
            <div  class="modal fade" id="dvdCopiesModel" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                        <div class="modal-content">
                              <div class="modal-header">
                                    <h2 class="modal-title fs-2 moving-text---effect" id="exampleModalLabel">Create copies</h2>
                                    <button type="button" class="btn-close" id='model-close-button' data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div class="modal-body">
                                    <form>
                                          <div class="mb-3">
                                                <label for="dvdId" class="col-form-label">DvD Name:</label>
                                                <span id='dvdId-tooltip' className='valid' style={{color:'red', paddingleft:'0.4rem', display:'none', fontSize:'1rem'}}>  * show not be empty</span>
                                                <select class="form-select" aria-label="Default select example" id='dvdId' name='dvdId' value={newDvdDetail.dvdId} onChange={inputChangeHandler} required>
                                                      <option value=''>Open this select dvd name</option>
                                                      {dvdNameList !== undefined &&(
                                                            dvdNameList.map(({dvdId, dvDName}, index)=>{return(
                                                                  <option key={index} value={dvdId}>{dvDName}</option>
                                                            )})
                                                      )}
                                                </select>
                                          </div>
                                          <div class="mb-3">
                                                <label for="datePurchased" class="col-form-label">Purchase Date:</label>
                                                <span id='datePurchased-tooltip' className='valid' style={{color:'red', paddingleft:'0.4rem', display:'none', fontSize:'1rem'}}>  * show not be empty</span>
                                                <input type="date" class="form-control" id="datePurchased" name='datePurchased' value={newDvdDetail.datePurchased} onChange={inputChangeHandler} required/>
                                          </div>
                                          <div class="mb-3">
                                                <label for="dvdCount" class="col-form-label">Total number of copies:</label>
                                                <span id='dvdCount-tooltip' className='valid' style={{color:'red', paddingleft:'0.4rem', display:'none', fontSize:'1rem'}}>  * show not be empty</span>
                                                <input type="number" class="form-control" id="dvdCount"  name='dvdCount' value={newDvdDetail.dvdCount} min='1' onChange={inputChangeHandler} required/>
                                          </div>
                                    </form>
                              </div>
                              <div class="modal-footer">
                                    <button type="submit" className="save-dvd-btn btn btn-primary" id='btnSave' onClick={submitHandler}>Submit</button>
                                    <button type="reset" className=" save-dvd-btn btn btn-danger" onClick={resetHandler}>Reset</button>
                              </div>
                        </div>
                  </div>
            </div>
      )
}

export default AddDvdFormModel