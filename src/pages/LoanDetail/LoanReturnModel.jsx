import React from 'react'

function LoanReturnModel() {

      const closeHandler=()=>{
            document.getElementById('loanReturnModelBtn').click();
      }

      return (
            <>
            <div className="modal fade" id="loanReturnModel" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                              <div className="modal-header">
                                    <h5 className="modal-title fw-bold fs-3" id="exampleModalLabel">Return Bill</h5>
                                    <button type="button" className="btn-close" id='loanReturnModelBtn' data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div className="modal-body text-start fs-5">
                                    <p><span className='fw-bold fs-5'>DVD Title:  </span><span className="fw-normal">DVD Name 2</span></p>
                                    <p><span className='fw-bold fs-5'>Member Name:  </span><span className="fw-normal">member1FristName</span></p>
                                    <p><span className='fw-bold fs-5'>Loaned Date:  </span><span className="fw-normal">5/11/2022</span></p>
                                    <p><span className='fw-bold fs-5'>Due Date:  </span><span className="fw-normal">5/11/2022</span></p>

                                    <hr />
                                    <p><span className='fw-bold fs-5'>Standard Charge: </span><span className="fw-normal">0</span></p>
                                    <p><span className='fw-bold fs-5'>Penalty Amount: </span><span className="fw-normal">0</span></p>
                                    <hr />
                                    <p><span className='fw-bold fs-4'>Total Charge: </span><span className="fw-normal">0</span></p>
                              </div>
                              <div class="modal-footer">
                                    <button type="submit" className="save-dvd-btn btn btn-primary" id='btnSave' onClick={closeHandler}>Close</button>
                              </div>
                        </div>
                  </div>
            </div>
            </>
      )
}

export default LoanReturnModel



/**{
  "dvdTitle": "DVD Name 2",
  "memberName": "member1FristName member1LastName",
  "dateLoaned": "5/1/2022",
  "dateDue": "5/11/2022",
  "dateReturned": "5/1/2022",
  "penaltyAmount": 0,
  "standardCharge": 0,
  "totalCharge": 0
} */