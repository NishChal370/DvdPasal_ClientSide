import React, { useEffect, useState } from 'react'
import { Actor1, Actor2, AvtarImg, FilterIcon, SearchIcon2 } from '../../assets/images'
import './members.css'
import { FaUserEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { CgMoreO } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import { Get_member_with_loans } from '../../API/UserService';

function Members() {
      const navtigate = useNavigate();
      const [showFilter, setShowFilter] = useState(false);
      const [memberData, setMemberData] = useState([]);

      const get_member_with_loan = () => {
            Get_member_with_loans()
                  .then(({ data }) => {

                        setMemberData(Array.from(data));
                        console.log(data);
                  })
                  .catch(({ response }) => {
                        console.log(response);
                        console.log("error in memebers list get");
                  })
      }

      const showFilterHandler=()=>{
            setShowFilter(!showFilter);
      }

      useEffect(() => {
            get_member_with_loan();
      }, [])

      return (
            <div id='members-wrapper'>
                  {/* <nav>
                        <p className='fw-bolder fs-1 moving-text---effect'>Our Members</p>
                        <aside>
                              <input type="text" name="" id="" placeholder='Search...' />
                              <img src={SearchIcon2} alt="" />

                              <div>
                                    <input type="checkbox" />
                                    <label htmlFor="checkBox">Get by member Id</label>
                              </div>

                        </aside>
                  </nav> */}
                  <nav>
                        <p className='fw-bolder fs-1 moving-text---effect'>Our Members</p>
                        <aside  style={{display:'flex', flexDirection:'column',justifyContent:'flex-end'}}>
                              {/* <h3>Filter</h3> */}
                              <div className='filter---button' onClick={showFilterHandler}>
                                    <img src={FilterIcon} alt="" />
                                    <h4>Filter</h4>
                              </div>
                              
                              <span className={`filter--inputs-${showFilter?'show':'hide'} d-flex gap-3`}>
                                    <div style={{display:'flex',marginTop: '1rem', gap:'0.2rem', backgroundColor:'white'}}>
                                          <input type="checkbox" style={{marginTop:'0.2rem'}}/>
                                          <label htmlFor="checkBox">Get by member Id</label>
                                    </div>
                                    <span>
                                          <input type="text" name="" id="" placeholder='Search...' />
                                          <img src={SearchIcon2} alt="" />
                                    </span>
                                    
                                    
                              </span>
                        </aside>
                  </nav>

                  <hr />

                  <section id='loan-section'>
                        <div class="accordion">
                              {memberData.map(alphabetList => (

                                    <div class="accordion" id={alphabetList.alphabet + "parent"}>
                                          <div class="accordion-item">
                                                <h2 class="accordion-header" id={alphabetList.alphabet + "-heading"}>
                                                      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={'#' + alphabetList.alphabet} aria-expanded="true" aria-controls={alphabetList.alphabet}>
                                                        <strong style={{marginLeft:'45%'}}>Members starting with '{alphabetList.alphabet}'</strong>
                                                      </button>
                                                </h2>
                                                <div id={alphabetList.alphabet} class="accordion-collapse  collapse show" aria-labelledby="headingOne" data-bs-parent={alphabetList.alphabet + "parent"}>

                                                      <div class="accordion-body">
                                                            <table class="table">
                                                                  <thead>
                                                                        <tr>
                                                                              <th scope="col">Member Id</th>
                                                                              <th scope="col">Member Name</th>
                                                                              <th scope="col">Date Of Birth</th>
                                                                              <th scope="col">Total Loans</th>
                                                                              <th scope="col">Current Loans</th>
                                                                              <th scope="col">Category</th>
                                                                              <th scope="col">Status</th>
                                                                        </tr>
                                                                  </thead>
                                                                  <tbody>
                                                                        {alphabetList.memberList.map(memberItem => (
                                                                              <tr>
                                                                                    <td>{memberItem.memberId}</td>
                                                                                    <td>{memberItem.firstName} {memberItem.lastName}</td>
                                                                                    <td>{memberItem.dateOfBirth}</td>
                                                                                    <td>{memberItem.totalLoans}</td>
                                                                                    <td>{memberItem.currentLoanCount}</td>
                                                                                    <td>{memberItem.membershipCategory}</td>
                                                                                    <td>{(memberItem.limitStatus === "Ok") ?
                                                                                          <span class="badge bg-success">{memberItem.limitStatus}</span>
                                                                                          :
                                                                                          <span class="badge bg-danger">{memberItem.limitStatus}</span>
                                                                                    }</td>
                                                                              </tr>
                                                                        ))}
                                                                  </tbody>
                                                            </table>
                                                      </div>
                                                </div>
                                          </div>

                                    </div>

                              ))}
                        </div>
                  </section>
            </div>
      )
}

export default Members