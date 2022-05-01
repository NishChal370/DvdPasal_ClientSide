import React, { useEffect, useState } from 'react'
import { Get_Dvd_Copy_For_Loan, Get_Loan_Type_List } from '../../API/UserService';
import { DvdImg } from '../../assets/images'
import './addLoan.css'


const initalInputDetail = {memberNumber:'', loanType:{loanTypeNumber:0 , loanTypeName:''} }
function AddLoan() {
      const [loanDvdCopyDetail, setLoanDvdCopyDetail] = useState();
      const [loanTypeList, setLoanTypeList] = useState();
      let [inputDetail, setInputDetail] = useState([]);
      // const [inputDetail, setInputDetail] = useState([{memberNumber:'', loanType:{loanTypeNumber:0 , loanTypeName:''} }]);

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

      const inputChangeHandler=({target})=>{
            const {name, value, selectedOptions} = target;

            if(name === 'memberNumber'){
                  inputDetail[name] = value;
            }
            else{
                  inputDetail['loanType']['loanTypeNumber'] = value;
                  console.log(selectedOptions);

            }

            setInputDetail({...inputDetail});
      }

      const createInputfieldDataStore =()=>{
            loanDvdCopyDetail.forEach(()=>{
                  inputDetail.push(initalInputDetail);
            })
            

            setInputDetail([...inputDetail]);
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

                                          <div className="mb-3 mt-2">
                                                <label for="memberNumber" className="form-label">Member ID: </label>
                                                {console.log(inputDetail[index])}
                                                {console.log(inputDetail)}
                                                <input type="number" className="form-control" name="memberNumber" placeholder="enter memeber id..." value={inputDetail[index].memberNumber} onChange={(e, index)=>inputChangeHandler(e, index)}/>
                                          </div>

                                          <label htmlFor="loanType">Loan Type: </label>
                                          <select className="form-select" aria-label="Default select example" value={inputDetail[index].loanType.loanTypeNumber} onChange={(e, index)=>inputChangeHandler(e, index)}>
                                                <option value={0}>Open this select menu</option>
                                                {loanTypeList!== undefined &&(
                                                      loanTypeList.map(({loanTypeNumber, loanTypeName}, index)=>{return(
                                                            <option key={`loanType${index}`} value={loanTypeNumber}>{loanTypeName}</option>
                                                      )})
                                                )}
                                          </select>

                                          <button className="addtoloan-button" role="button">Add To Loan</button>
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