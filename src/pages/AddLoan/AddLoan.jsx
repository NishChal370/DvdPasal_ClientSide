import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import './addLoan.css';
import { DvdImg } from '../../assets/images';
import { removeValidationMessage, validateData } from './validation';
import { Get_Dvd_Copy_For_Loan, Get_Loan_Type_List, Post_Loan } from '../../API/UserService';


function AddLoan() {
      const [loanTypeList, setLoanTypeList] = useState();
      const [inputDetail, setInputDetail] = useState([]);
      const [wantToRefresh, setWantToRefresh] = useState(false);
      const [loanDvdCopyDetail, setLoanDvdCopyDetail] = useState();
      

      const get_dvd_copy_for_loan=()=>{
            Get_Dvd_Copy_For_Loan()
                  .then(({data})=>{

                        setLoanDvdCopyDetail([...data]);
                  })
                  .catch(({response})=>{
                        console.log("Errror on get_dvd_copy_for_loan ");
                  })
      }


      const get_loan_type_list=()=>{
            Get_Loan_Type_List()
                  .then(({data})=>{

                        setLoanTypeList([...data])
                  })
                  .catch(({response})=>{
                        console.log('Errror on get_loan_type_list');
                  })
      }

      const post_loan = (loanData, index)=>{
            console.log(loanData);
            Post_Loan(loanData)
                  .then(({data})=>{
                        Swal.fire(
                              'Added Sucessfully!',
                              data,
                              'success'
                        ) 

                        resetHandler(index);
                  })
                  .catch(({response})=>{
                        Swal.fire(
                              'Invalid Request!! ',
                              response.data,
                              'error'
                        )
                  })
      }

      const resetHandler=(index)=>{
            inputDetail[index] = {memberNumber:'', loanType:{loanTypeNumber:0 , loanTypeName:''} };
            
            setInputDetail([...inputDetail]);

            let refresh = !wantToRefresh;
            setWantToRefresh({...refresh});
      }

      const inputChangeHandler=({target}, index)=>{
            const {name, value, selectedOptions, id} = target;

            if(name === 'memberNumber'){
                  inputDetail[index][name] = value;
            }
            else{
                  inputDetail[index]['loanType']['loanTypeNumber'] =  parseInt(value);
                  inputDetail[index]['loanType']['loanTypeName'] = (parseInt(value) !== 0) ?selectedOptions[0].text: '';
            }

            removeValidationMessage(id);

            setInputDetail([...inputDetail]);
      }


      const createInputfieldDataStore =()=>{
            loanDvdCopyDetail.forEach(()=>{
                  inputDetail.push({memberNumber:'', loanType:{loanTypeNumber:0 , loanTypeName:''} });
            })
            
            setInputDetail([...inputDetail]);
      }


      const addButtonHandler=(copyId, index)=>{
            if(validateData(inputDetail[index], index)){
                  console.log(inputDetail[index]);
                  const {memberNumber, loanType} = inputDetail[index];
                  const {loanTypeNumber} = loanType;
                  console.log(new Date().toISOString());

                  const loanData ={
                        copyNumber: parseInt(copyId),
                        memberNumber: memberNumber,
                        loanTypeId: loanTypeNumber,
                        dateOut: new Date().toISOString(),
                  }

                  post_loan(loanData, index);                  
            }
      }

      useEffect(()=>{
            get_dvd_copy_for_loan();
            get_loan_type_list();
      },[])


      // creating array according to number of data
      useEffect(()=>{
            if(loanDvdCopyDetail!== undefined){
                  (inputDetail.length <loanDvdCopyDetail.length)&&(
                        createInputfieldDataStore()
                  )
            }
      },[loanDvdCopyDetail])


      return (
      <div id='addLoan' style={{marginTop:'2rem'}}>
            <section id='add-loan-wrrapper'>
                  <nav>
                        <p className='fw-bolder fs-1 moving-text---effect'>Add Loan</p>
                  </nav>
                  <hr />

                  <section className='add-loan-body '>
                        {loanDvdCopyDetail !== undefined &&(
                              loanDvdCopyDetail.map(({ageRestricted, category, copyId, dvdImage, dvdTitle, price}, index)=>{return(

                                    <div className="card" key={`addLoanCard${index}`}style={{width: '30rem'}}>
                                          <img src={DvdImg} className="card-img-top" alt="..."/>

                                          <div className="card-body" key={`addLoan${index}`}>
                                                <h4 className="card-title">{dvdTitle}</h4>
                                                <p className="card-text">Price: Rs.{price}</p>
                                                <div className='d-flex gap-2'>
                                                      <span className={`badge rounded-pill  ${(ageRestricted) ?'bg-danger' :'bg-success'}`}>{(ageRestricted) ?'Adults' :'Family'}</span>
                                                      <span className={`badge rounded-pill bg-info text-dark`}>{category}</span>

                                                </div>

                                                {(inputDetail.length>0) &&(
                                                      <>
                                                      <div className="mb-3 mt-2">
                                                            <label for="memberNumber" className="form-label">Member ID: </label>
                                                            <input type="number" className="form-control" id={`memberNumber${index}`} name="memberNumber" placeholder="enter memeber id..." value={inputDetail[index].memberNumber} onChange={(e)=>inputChangeHandler(e,index)}/>
                                                      </div>

                                                      <label htmlFor="loanType">Loan Type: </label>
                                                      <select className="form-select" id={`loanType${index}`} aria-label="Default select example" name='loanTypeName' value={inputDetail[index].loanType.loanTypeNumber} onChange={(e)=>inputChangeHandler(e, index)}>
                                                            <option value={0}>Open this select menu</option>
                                                            {loanTypeList!== undefined &&(
                                                                  loanTypeList.map(({loanTypeNumber, loanTypeName}, index)=>{return(
                                                                        <option key={`loanType${index}`} value={loanTypeNumber}>{loanTypeName}</option>
                                                                  )})
                                                            )}
                                                      </select>
                                                      </>
                                                )}
                                                
                                                

                                                <button className="addtoloan-button" role="button" onClick={()=>addButtonHandler(copyId,index)}>Add To Loan</button>
                                          </div>

                                    </div>
                              )})
                        )}

                  </section>
            </section>
      </div>
  )
}

export default AddLoan