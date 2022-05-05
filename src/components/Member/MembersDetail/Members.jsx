import React, { useEffect, useState } from 'react';
import './members.css';
import { FilterIcon, SearchIcon2 } from '../../../assets/images';
import { Get_last_31_Days_Loan_By_ID, Get_last_31_Days_Loan_By_LastName, Get_member_with_loans } from '../../../API/UserService';
import { dateConverter } from '../../Common/dateConverter';
import Swal from 'sweetalert2';


const Toast = Swal.mixin({
      toast: true,
      position: 'top-right',
      iconColor: 'white',
      customClass: {
        popup: 'colored-toast'
      },
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true
})

function Members() {
      const [showFilter, setShowFilter] = useState(false);
      const [memberData, setMemberData] = useState([]);
      const [showShearchData, setShowSearchData] = useState(false);
      const [searchInputData, setSearchInputData] = useState({memberDetail:'', byMemberId: false});

      const get_member_with_loan = () => {
            Get_member_with_loans()
                  .then(({ data }) => {

                        setMemberData(Array.from(data));
                        setShowSearchData(false);
                  })
                  .catch(({ response }) => {
                        console.log(response);
                        console.log("error in memebers list get");
                  })
      }

      const get_last_31_days_loan_By_lastName = () => {
            Get_last_31_Days_Loan_By_LastName({memberDetail: searchInputData.memberDetail})
                  .then(({data})=>{
                        
                        if(data.length <= 0){
                              Toast.fire({
                                    icon: 'error',
                                    title: 'Not Found !!!'
                                  })
                        }
                        else{
                              setMemberData([...data]);
                              setShowSearchData(true);
                        }
                        
                  })
                  .catch(({response})=>{
                        console.log(response.data);
                        console.log("ERROR IN get_last_31_days_loan_lastNames");

                        Toast.fire({
                              icon: 'error',
                              title: 'Not Found !!! '
                        })
                        
                  })
      }

      const get_last_31_days_loan_By_Id = () => {
            Get_last_31_Days_Loan_By_ID({memberDetail: searchInputData.memberDetail})
                  .then(({data})=>{
                        
                        if(data.length <= 0){
                              Toast.fire({
                                    icon: 'error',
                                    title: 'Not Found by id'
                                  })
                        }
                        else{
                              setMemberData([...data]);
                              setShowSearchData(true);
                        }
                        
                  })
                  .catch(({response})=>{
                        console.log(response.data);
                        console.log("ERROR IN get_last_31_days_loan_ID");

                        Toast.fire({
                              icon: 'error',
                              title: 'Not Found !!! '
                        })
                        
                  })
      } 

      const showFilterHandler=()=>{
            setShowFilter(!showFilter);
      }

      const searchInputHandler =({target})=>{
            const {type, value} = target;

            if(type === 'checkbox'){
                  searchInputData['byMemberId'] =  !searchInputData['byMemberId'];
                  setSearchInputData({...searchInputData});
            }
            else{
                  searchInputData['memberDetail'] = value;
                  setSearchInputData({...searchInputData});

                  if(target.value === ''){
                        get_member_with_loan()
                  }
            }
            
      }

      const searchButtonHandler=()=>{
            if(searchInputData.memberDetail.trim() === ''){
                  showErrorMessage();
            }
            else{
                  (searchInputData.byMemberId)
                        ? get_last_31_days_loan_By_Id()
                        : get_last_31_days_loan_By_lastName()   
            }
                     
      }

      const showErrorMessage=()=>{
            document.getElementById('searchDvdInput').focus();
            document.getElementById('searchDvdInput').classList.add('error');

            setInterval(function(){ 
                  document.getElementById('searchDvdInput').classList.remove('error');
            }, 2000);
            
      }

      useEffect(() => {
            get_member_with_loan();
      }, [])

      return (
            <div id='members-wrapper'>
                  <nav>
                        <p className='fw-bolder fs-1 moving-text---effect'>Our Members</p>
                        <aside  style={{display:'flex', flexDirection:'column',justifyContent:'flex-end'}}>

                              <div className='filter---button' onClick={showFilterHandler}>
                                    <img src={FilterIcon} alt="" />
                                    <h4>Filter</h4>
                              </div>
                              
                              <span className={`filter--inputs-${showFilter?'show':'hide'} d-flex gap-3`}>
                                    <div style={{display:'flex',marginTop: '1rem', gap:'0.2rem', backgroundColor:'white'}}>
                                          <input id='search-check-box-input' type="checkbox" style={{marginTop:'0.2rem'}} onChange={searchInputHandler}/>
                                          <label htmlFor="checkBox">Get by member Id</label>
                                    </div>
                                    <span>
                                          <input type="text" name="searchDvdInput" id="searchDvdInput" placeholder='Search loan in last 31 days...' value={searchInputData.memberDetail}  onChange={searchInputHandler}/>
                                          <img src={SearchIcon2} alt="search-icon" onClick={searchButtonHandler} />
                                    </span>
                                    
                                    
                              </span>
                        </aside>
                  </nav>

                  <hr />
                  <section id='loan-section'>
                        <div className="accordion">
                              {!showShearchData 
                                    ?( memberData.map((alphabetList,index) => (
                                          <div className="accordion" id={alphabetList.alphabet + "parent"} key={`accordion${index}`}>
                                                <div className="accordion-item">
                                                      <h2 className="accordion-header" id={alphabetList.alphabet + "-heading"}>
                                                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={'#' + alphabetList.alphabet} aria-expanded="true" aria-controls={alphabetList.alphabet}>
                                                            <strong style={{marginLeft:'45%'}}>Members starting with '{alphabetList.alphabet}'</strong>
                                                            </button>
                                                      </h2>
                                                      <div id={alphabetList.alphabet} className="accordion-collapse  collapse show" aria-labelledby="headingOne" data-bs-parent={alphabetList.alphabet + "parent"}>

                                                            <div className="accordion-body">
                                                                  <table className="table">
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
                                                                              {alphabetList.memberList.map((memberItem, index) => (
                                                                                    <tr key={`MemeberDVD2${index}`}>
                                                                                          <td>{memberItem.memberId}</td>
                                                                                          <td>{memberItem.firstName} {memberItem.lastName}</td>
                                                                                          <td>{memberItem.dateOfBirth}</td>
                                                                                          <td>{memberItem.totalLoans}</td>
                                                                                          <td>{memberItem.currentLoanCount}</td>
                                                                                          <td>{memberItem.membershipCategory}</td>
                                                                                          <td>{(memberItem.limitStatus === "Ok") ?
                                                                                                <span className="badge bg-success">{memberItem.limitStatus}</span>
                                                                                                :
                                                                                                <span className="badge bg-danger">{memberItem.limitStatus}</span>
                                                                                          }</td>
                                                                                    </tr>
                                                                              ))}
                                                                        </tbody>
                                                                  </table>
                                                            </div>
                                                      </div>
                                                </div>

                                          </div>))
                                    )
                                    :(memberData.map(({memberName, loans}, index)=>{return(
                                          <div className="accordion" id={memberName+ "parent"} key={`accordion2${index}`}>

                                                <div className="accordion-item">
                                                      <h2 className="accordion-header" id={memberName + "-heading"}>
                                                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={'#' + memberName} aria-expanded="true" aria-controls={memberName}>
                                                                  <strong style={{marginLeft:'45%'}}>Members Name: {memberName}</strong>
                                                            </button>
                                                      </h2>
                                                      <div id={memberName} className="accordion-collapse  collapse show" aria-labelledby="headingOne" data-bs-parent={memberName + "parent"}>

                                                            <div className="accordion-body">
                                                                  <table className="table">
                                                                        <thead>
                                                                              <tr>
                                                                                    <th scope="col">Loan Id</th>
                                                                                    <th scope="col">DVD Title</th>
                                                                                    <th scope="col">Copy Id</th>
                                                                                    <th scope="col">Date Out</th>
                                                                                    <th scope="col">Date Due</th>
                                                                                    <th scope="col">Returned Date</th>
                                                                              </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                              {loans.map( ({loanId, dvdTitle, copyId, dateOut, dateDue, returnedDate}, index) => (
                                                                                    <tr key={`MemeberDVD3${index}`}>
                                                                                          <td>{loanId}</td>
                                                                                          <td>{dvdTitle}</td>
                                                                                          <td>{copyId}</td>
                                                                                          <td>{dateConverter(dateOut)}</td>
                                                                                          <td>{dateConverter(dateDue)}</td>
                                                                                          <td>{(returnedDate !== 'Not Returned')
                                                                                                ? dateConverter(returnedDate)
                                                                                                : returnedDate}
                                                                                          </td>
                                                                                    </tr>
                                                                              ))}
                                                                              {loans.length<=0 &&(
                                                                                    <tr>
                                                                                          <td colSpan="6" style={{fontWeight:'bolder'}}>No data to show</td>
                                                                                    </tr>
                                                                                    
                                                                              )}
                                                                        </tbody>
                                                                  </table>
                                                            </div>
                                                      </div>
                                                </div>
                                          </div>
                                    
                                    )}))
                              }
                        </div>
                  </section>
                        
                       
                  
            </div>
      )
}

export default Members