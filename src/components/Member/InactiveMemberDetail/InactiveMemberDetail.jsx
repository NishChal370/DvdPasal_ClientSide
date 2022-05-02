import React, { useEffect, useState } from 'react';
import './inactiveMemberDetail.css';
import { DataNotFoundImg } from '../../../assets/images';
import { Get_Inactive_Members_Detail_List } from '../../../API/UserService';




function InactiveMemberDetail() {
      const [inactiveMembers, setInactiveMembers] = useState();
      
      const get_inactive_memebers=()=>{
            Get_Inactive_Members_Detail_List()
                  .then(({data})=>{
                        setInactiveMembers([...data])
                  })
                  .catch(({response})=>{
                        console.log(response);
                        console.log("ERROR ON get_inactive_memebers");

                  })
      }

      const dateConverter = (dateStr) => {
            const monthsList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
            let date = new Date(dateStr);
            const year = date.getFullYear()
            const month = monthsList[date.getMonth()];
            const day = date.getDate();

            return day + " " + month + " " + year
      }

      useEffect(()=>{
            get_inactive_memebers();
      },[])

      return (
            <div id='inactiveMemberDetail' style={{marginTop:'2rem'}}>
                  <section id='inactive-member-detail-wrrapper'>
                        <nav>
                              <p className='fw-bolder fs-1 moving-text---effect'>Inactive Members</p>
                        </nav>
                        <hr />

                        <section>
                              <table class="table">
                                    <thead>
                                          <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Profile</th>
                                                <th scope="col">First Name</th>
                                                <th scope="col">Last Name</th>
                                                <th scope="col">Address</th>
                                                <th scope="col">Recent Dvd Title</th>
                                                <th scope="col">Days Since Loaned</th>
                                                <th scope="col">Date out</th>
                                          </tr>
                                    </thead>
                                    <tbody>
                                          {inactiveMembers !== undefined &&(
                                                inactiveMembers.map(({firstName, lastName, address, recentDvdTitle, daysSinceLoan, dateOut, memberImage}, index)=>{return(
                                                      <tr>
                                                            <td>{index}</td>
                                                            <td><img id= 'inactive-profile-img' src={memberImage} alt="profile-imng" /></td>
                                                            <td>{firstName}</td>
                                                            <td>{lastName}</td>
                                                            <td>{address}</td>
                                                            <td>{recentDvdTitle}</td>
                                                            <td>{daysSinceLoan}</td>
                                                            <td style={{padding:'0rem'}}><p style={{fontSize:'1rem', padding:'0rem'}}>{dateConverter(dateOut)}</p></td>
                                                      </tr>
                                                )})
                                          )}
                                          
                                    </tbody>
                              </table>
                              {(inactiveMembers !== undefined)&&(inactiveMembers.length<=0)&&(
                                          <img style={{width:'30rem', marginLeft:'40%'}} src={DataNotFoundImg} alt="div" />
                              )}
                        </section>
                  </section>
            </div>
      )
}

export default InactiveMemberDetail