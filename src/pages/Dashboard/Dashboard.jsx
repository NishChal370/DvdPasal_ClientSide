import React from 'react'
import './dashboard.css'
import { SlidingCard } from '../../components/Dashboard'
import { Cartoon4, DvdImg, SearchIcon2 } from '../../assets/images'


function Dashboard({HandlerNavbarVisible}) {

      return (
      <div id='dashboard'>
            <section className='top-img' style={{backgroundImage:`url(${Cartoon4})`}}>
                  {/* <button onClick={HandlerNavbarVisible}>CLick</button> */}
                  {/* <img src={Cartoon4} alt="" /> */}
                  <div>
                        <span className='ps-4' style={{ display:'flex', justifyContent:'space-between'}}>
                              <p className='p-0 m-0 fs-3'>DVD Store</p>
                              <button id='login-button'>Login</button>
                        </span>
                  </div>
            </section>

            <SlidingCard/>

            <section id='available-dvds-wrapper'>
                  <nav>
                        <p className='fw-bolder fs-1'>DVDs in store</p>
                        <aside>
                              <input type="text" name="" id=""  placeholder='Search...'/>
                              <img src={SearchIcon2} alt="" />
                        </aside>
                  </nav>
                  
                  <hr />
                  
                  <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap:'3rem'}}>

                        {[1,2,3,4,5,6].map((data)=>{return(
                              <div className="card dvd-card">
                                    <div className="card-body p-0">
                                          <img  className="card-img-top" src={DvdImg} alt="div" />
                                          <article className='p-1'>
                                                <p className="fs-3 p-0">The Northman (2022)</p>
                                                <p className="fs-5 p-0">Available: 1</p>
                                          </article>
                                    </div>
                              </div>
                        )})}
                        
                       
                  </div>
                  
            </section>
      </div>
    
      )
}

export default Dashboard



/**<div className='card'>
                        <div className='top-image'>
                              <img src={RangersImg} alt="rangers" />
                              <aside>
                                    <span>
                                          <img src={Actor1} alt="rangers" />
                                          <img src={Actor2} alt="rangers" />
                                          <img src={Actor1} alt="rangers" />
                                    </span>
                              </aside>
                        </div>
                        
                        <article>
                              <h3>cadaver</h3>
                              <p>Horror marathon</p>
                        </article>
                  </div>
 */