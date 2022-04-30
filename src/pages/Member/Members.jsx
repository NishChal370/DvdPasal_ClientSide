import React from 'react'
import { Actor1, Actor2, AvtarImg, SearchIcon2 } from '../../assets/images'
import './members.css'
import { FaUserEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { CgMoreO } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';

function Members() {
      const navtigate = useNavigate();

      return (
            <div id='members-wrapper'>
                  <nav>
                        <p className='fw-bolder fs-1 moving-text---effect'>Our Members</p>
                        <aside>          
                              <input type="text" name="" id=""  placeholder='Search...'/>
                              <img src={SearchIcon2} alt="" />

                              <div>
                                    <input type="checkbox" />
                                    <label htmlFor="checkBox">Get by memeber Id</label>
                              </div>   
                              
                        </aside>
                  </nav>
                              
                  <hr />

                  <section>
                        <table class="table">
                              <thead>
                                    <tr>
                                          <th scope="col">Member Id</th>
                                          <th scope="col">Profile</th>
                                          <th scope="col">Member Name</th>
                                          <th scope="col">Total Loans</th>
                                          <th scope="col">Cateogary</th>
                                          <th scope="col">Status</th>
                                          <th scope="col">Action</th>
                                    </tr>
                              </thead>
                              <tbody>
                                    <tr>
                                          <th scope="row">1</th>
                                          {/* <td></td> */}
                                          <td><img src={Actor2} alt=""  style={{width:'2rem', padding:'0rem', margin:'0rem'}}/></td>
                                          <td>Mark</td>
                                          <td>Otto</td>
                                          <td>@mdo</td>
                                          <td> <span className='d-flex justify-content-center'> <p className='status--ok'> Ok </p></span></td>
                                          <td><span><FaUserEdit/></span> <span><MdDelete/></span> <span onClick={()=>navtigate('detail')}><CgMoreO/></span></td>
                                    </tr>
                                    <tr>
                                          <th scope="row">2</th>
                                          {/* <td><img src="" alt="" /></td> */}
                                          <td><img src={Actor1} alt=""  style={{width:'2rem', padding:'0rem', margin:'0rem'}}/></td>

                                          <td>Jacob</td>
                                          <td>Thornton</td>
                                          <td>@fat</td>
                                          <td><span className='d-flex justify-content-center'> <p className='status--danger'> Not Ok </p></span></td>
                                          <td><span><FaUserEdit/></span> <span><MdDelete/></span> <span><CgMoreO/></span></td>

                                    </tr>
                                    <tr>
                                          <th scope="row">3</th>
                                          <td><img src={Actor2} alt=""  style={{width:'2rem', padding:'0rem', margin:'0rem'}}/></td>
                                          <td>@twitter</td>
                                          <td>@twitter</td>
                                          <td>@twitter</td>
                                          <td><span className='d-flex justify-content-center'> <p className='status--ok'> Ok </p></span></td>
                                          <td><span><FaUserEdit/></span> <span><MdDelete/></span> <span><CgMoreO/></span></td>

                                    </tr>
                                    <tr>
                                          <th scope="row">3</th>
                                          <td><img src={Actor2} alt=""  style={{width:'2rem', padding:'0rem', margin:'0rem'}}/></td>
                                          <td>@twitter</td>
                                          <td>@twitter</td>
                                          <td>@twitter</td>
                                          <td><span className='d-flex justify-content-center'> <p className='status--danger'> Not Ok </p></span></td>
                                          <td><span><FaUserEdit/></span> <span><MdDelete/></span> <span><CgMoreO/></span></td>

                                    </tr>
                                    <tr>
                                          <th scope="row">3</th>
                                          <td><img src={Actor2} alt=""  style={{width:'2rem', padding:'0rem', margin:'0rem'}}/></td>
                                          <td>@twitter</td>
                                          <td>@twitter</td>
                                          <td>@twitter</td>
                                          <td><span className='d-flex justify-content-center'> <p className='status--danger'> Not Ok </p></span></td>
                                          <td><span><FaUserEdit/></span> <span><MdDelete/></span> <span><CgMoreO/></span></td>

                                    </tr>
                                    <tr>
                                          <th scope="row">3</th>
                                          <td><img src={Actor2} alt=""  style={{width:'2rem', padding:'0rem', margin:'0rem'}}/></td>
                                          <td>@twitter</td>
                                          <td>@twitter</td>
                                          <td>@twitter</td>
                                          <td><span className='d-flex justify-content-center'> <p className='status--ok'> Ok </p></span></td>
                                          <td><span><FaUserEdit/></span> <span><MdDelete/></span> <span><CgMoreO/></span></td>

                                    </tr>
                              </tbody>
                        </table>
                  </section>
            </div>
      )
}

export default Members