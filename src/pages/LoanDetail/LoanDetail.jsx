import React, { useEffect, useState } from 'react'
import './loanDetail.css';
import { ReturnIcon } from '../../assets/images'

function LoanDetail() {
      
      return (
            <div id='loanDetail' style={{marginTop:'2rem'}}>
                  <section id='loan-detail-wrrapper'>
                        <nav>
                              <p className='fw-bolder fs-1 moving-text---effect'>Loan Detail</p>
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
                                          <tr>
                                                <th scope="row">1</th>
                                                {/* <td></td> */}
                                                <td></td>
                                                <td>Mark</td>
                                                <td><span className={`badge rounded-pill bg-danger`}>Otto</span></td>
                                                <td>@mdo</td>
                                                <td></td>
                                                <td><span className='delete-icon-image'><img src={ReturnIcon} alt="return-btn" /></span></td>
                                          </tr>
                                          
                                    </tbody>
                              </table>
                        </section>
                  </section>
            </div>
      )
}

export default LoanDetail