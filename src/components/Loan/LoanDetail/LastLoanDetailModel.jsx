import React from 'react'
import { dateConverter } from '../../Common/dateConverter';

function LastLoanDetailModel({loanDetail}) {


      const closeHandler=()=>{
            document.getElementById('lastLoandDetailModelShowBtn').click();
      }

      // const dateConverter = (dateStr) => {
      //       const monthsList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
      //       let date = new Date(dateStr);
      //       const year = date.getFullYear()
      //       const month = monthsList[date.getMonth()];
      //       const day = date.getDate();

      //       return day + " " + month + " " + year
      // }


      return (
            <div className="modal fade" id="lastloanModel" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <button id='lastLoandDetailModelShowBtn' data-bs-toggle="modal" data-bs-target="#lastloanModel" data-bs-whatever="@mdo"  style={{display:'none'}}>show</button>
                  <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                              <div className="modal-header">
                                    <h5 className="modal-title fw-bold fs-3" id="exampleModalLabel">Last Loan</h5>
                                    <button type="button" className="btn-close" id='lastloanModelBtn' data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              {loanDetail !== undefined && (
                                    <div className="modal-body text-start fs-5">
                                          <p><span className='fw-bold fs-5'>DVD Title:  </span><span className="fw-normal">{loanDetail.dvDTitle}</span></p>
                                          <p><span className='fw-bold fs-5'>Member Name:  </span><span className="fw-normal">{loanDetail.loanedBy}</span></p>
                                          <p><span className='fw-bold fs-5'>Loaned Date:  </span><span className="fw-normal">{dateConverter(loanDetail.dateOut)}</span></p>
                                          <p><span className='fw-bold fs-5'>Due Date:  </span><span className="fw-normal">{dateConverter(loanDetail.dateDue)}</span></p>
                                          <p><span className='fw-bold fs-5'>Retunred Date:  </span><span className="fw-normal">
                                                {(loanDetail.dateReturned !== "Not Returned") 
                                                      ?dateConverter(loanDetail.dateReturned) 
                                                      :<span className="badge bg-danger">{loanDetail.dateReturned}
                                                </span>}
                                          </span></p>
                                    </div>
                              )}
                              
                              <div className="modal-footer">
                                    <button type="submit" className="save-dvd-btn btn btn-primary" id='btnSave' onClick={closeHandler}>Close</button>
                              </div>
                        </div>
                  </div>
            </div>
      )
}

export default LastLoanDetailModel