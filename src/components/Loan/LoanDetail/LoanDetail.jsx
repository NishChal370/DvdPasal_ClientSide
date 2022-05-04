import React, { useEffect, useState } from 'react';
import './loanDetail.css';
import Swal from 'sweetalert2';
import LoanReturnModel from './LoanReturnModel';
import LastLoanDetailModel from './LastLoanDetailModel';
import { ReturnIcon, SearchIcon2 } from '../../../assets/images';
import { Get_Last_Loan_By_Id, Get_Loans,  Post_Loan_Return_By_Id } from '../../../API/UserService';
import { dateConverter } from '../../Common/dateConverter';



function LoanDetail() {

      const [copyId, setCopyId] = useState('');
      const [loanDetail, setLoanDetail] = useState();
      const [loansList, setLoansList] = useState();
      const [wantToRefresh, setWantToRefresh] = useState(false);
      const [returnLoanDetail, setReturnLoanDetail] = useState();

      const inputChangeHandler=({target})=>{
            let {value} = target
            setCopyId(value);
      }     

     const get_last_loan_by_id=()=>{
           Get_Last_Loan_By_Id(copyId)
                  .then(({data, status})=>{
                        if(status === 200){
                              setLoanDetail(data);
                              document.getElementById('lastLoandDetailModelShowBtn').click();
                              setCopyId('');
                        }
                        else if(status === 204){
                              Swal.fire(
                                    'Not Found !! ',
                                    'Searched Copy Id '+ copyId+' not found..',
                                    'error'
                              )
                        }
                  })
                  .catch(({response})=>{
                        console.log("ERROR ON  get_last_loan_by_id");
                  })
     }

      const post_loan_return_by_id=(loanId)=>{
            Post_Loan_Return_By_Id(loanId)
                  .then(({data})=>{

                        setReturnLoanDetail(data);
                        document.getElementById('loanReturnModelBtn').click();

                        let refresh = !wantToRefresh;
                        setWantToRefresh(refresh);
                  })
                  .catch(({response})=>{
                        Swal.fire(
                              'Invalid data!! ',
                              response.data,
                              'error'
                        )
                  })
      }

      const searchButtonHandler=()=>{
            if(copyId !== ''){
                  
                  get_last_loan_by_id();
            }
            else{
                  showErrorMessage();
            }
      }

      const get_loans=()=>{
            Get_Loans()
                  .then(({data})=>{
                        setLoansList(data);
                  })
                  .catch(({response})=>{
                        console.log("ERROR ON GET LOANS OF LOAN DETAIL")
                  })
      }

      const returnLoanHandler=(loanId)=>{
            post_loan_return_by_id(loanId);
      }

      const showErrorMessage=()=>{
            document.getElementById('copyId').focus();
            document.getElementById('copyId').classList.add('error');

            setInterval(function(){ 
                  document.getElementById('copyId').classList.remove('error');
            }, 2000); 
      }

      // const dateConverter = (dateStr) => {
      //       const monthsList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
      //       let date = new Date(dateStr);
      //       const year = date.getFullYear()
      //       const month = monthsList[date.getMonth()];
      //       const day = date.getDate();

      //       return day + " " + month + " " + year
      // }




      useEffect(()=>{
            get_loans();
      },[wantToRefresh])

      return (
            <div id='loanDetail' style={{marginTop:'2rem'}}>
                  <section id='loan-detail-wrrapper'>
                        <nav>
                              <p className='fw-bolder fs-1 moving-text---effect'>Loan Detail</p>
                              <aside>
                                    <input type="number" name="copyId" id="copyId" placeholder='Search last loan...' value={copyId} onChange={inputChangeHandler}/>
                                    <img src={SearchIcon2} alt=""  onClick={searchButtonHandler}/>
                              </aside>
                        </nav>
                        <hr />

                        <section>
                              <table class="table">
                                    <thead>
                                          <tr>
                                                <th scope="col">Title</th>
                                                <th scope="col">Date Loaned</th>
                                                <th scope="col">Date Due</th>
                                                <th scope="col">Date Returned</th>
                                                <th scope="col">Copy Id</th>
                                                <th scope="col">Member Name</th>
                                                <th scope="col">Action/Return</th>
                                          </tr>
                                    </thead>
                                    <tbody>
                                          {loansList !== undefined &&(
                                                loansList.map(({loanId, dvDName, dateOut, dateDue, dateReturn, copyId, memberName},index)=>{return(
                                                      <tr key={`loand${index}`}>
                                                            <td>{dvDName}</td>
                                                            <td>{dateConverter(dateOut)}</td>
                                                            <td>{dateConverter(dateDue)}</td>
                                                            <td><span className="fw-normal">
                                                                        {(dateReturn !== "Not Returned") 
                                                                              ?dateConverter(dateReturn) 
                                                                              :<span className="badge bg-danger">{dateReturn}</span>
                                                                        }
                                                                  </span>
                                                            </td>
                                                            <td>{copyId}</td>
                                                            <td>{memberName}</td>
                                                            <td>{(dateReturn !== "Not Returned") ?<span className="badge bg-danger">Retured</span> :(<span className='delete-icon-image' onClick={()=>returnLoanHandler(loanId)}><img src={ReturnIcon} alt="return-btn"/></span>)}</td>
                                                      </tr>
                                                )})
                                          )}
                                          

                                          <LoanReturnModel returnLoanDetail={returnLoanDetail}/>
                                          <LastLoanDetailModel loanDetail={loanDetail}/>
                                    </tbody>
                              </table>
                        </section>
                  </section>
            </div>
      )
}


export default LoanDetail