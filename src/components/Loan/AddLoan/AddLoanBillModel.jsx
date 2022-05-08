import React from 'react'
import { dateConverter } from '../../Common/dateConverter'

function AddLoanBillModel({loanBill}) {
      return (
            <div className="modal fade" id="addLoanBillModel" tabindex="-1" aria-labelledby="addLoanBillModelLabel" aria-hidden="true" >
                  <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                              <div className="modal-header">
                                    <h5 className="modal-title  moving-text---effect fs-3" id="addLoanBillModelLabel">Loan Bill</h5>
                                    <button type="button" id ='btn-close' className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>

                              <div className="modal-body">
                                    {loanBill !== undefined && (
                                          <div className="modal-body text-start fs-5">
                                                <p><span className='fw-bold fs-5'>Loan Id:  </span><span className="fw-normal">{loanBill.loanId}</span></p>
                                                <p><span className='fw-bold fs-5'>DvD Title:  </span><span className="fw-normal">{loanBill.dvdTitle}</span></p>
                                                <p><span className='fw-bold fs-5'>Standard Price:  </span><span className="fw-normal">{loanBill.standardPrice}</span></p>
                                                <p><span className='fw-bold fs-5'>Member Name:  </span><span className="fw-normal">{loanBill.memberName}</span></p>
                                                <p><span className='fw-bold fs-5'>Date Out:  </span><span className="fw-normal">{dateConverter(loanBill.dateOut)}</span></p>
                                                <p><span className='fw-bold fs-5'>Date out:  </span><span className="fw-normal">{dateConverter(loanBill.dateDue)}</span></p>
                                                <p><span className='fw-bold fs-5'>Loan Type:  </span><span className="fw-normal">{loanBill.loanType}</span></p>
                                          </div>
                                    )}
                              </div>

                              <div className="modal-footer">
                                    <button type="button" className=" save-dvd-btn btn btn-danger" data-bs-dismiss="modal">Close</button>
                              </div>
                        </div>   
                  </div>
            </div>

            
      )
}

export default AddLoanBillModel